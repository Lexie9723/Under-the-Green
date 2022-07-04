let loadHome2 = 0;
const maxHome2 = 9;
function initHome2() {
	loadHome2++;
	if (loadHome2 < maxHome2) return;
	let plantStage = 0;
	console.log("load Home2");

	let bubbles = [
		$.ajax({ url: "resource/element_home/Bubble.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/BubbleCO2.svg", async: false })
			.responseText,
	];
	let particles = [];
	let animaGroup = d3.select("#home2_anima").selectAll();

	/////////////
	function Particle() { }

	Particle.prototype.update = function () {
		let dx = this.destX - this.x;
		let dy = this.destY - this.y;
		let dist = Math.sqrt(dx * dx + dy * dy);
		let speed = this.speed;
		if (dist < 50) {
			speed = (dist / 300) * this.speed;
			let sx = Math.random() * 1920;
			let sy = 1080;
			this.reset(
				sx,
				sy,
				sx + Math.random() * 300 - 150,
				sy - Math.random() * 680,
				1 + 2 * Math.random(),
				1 + Math.random() * 0.4 - 0.2
			);
		}
		this.x += speed * this.vector.x;
		this.y += speed * this.vector.y;
		return false;
	};

	Particle.prototype.reset = function (x, y, destX, destY, speed, scale) {
		this.scale = scale;
		this.x = x;
		this.y = y;
		this.destX = destX;
		this.destY = destY;
		if (Math.random() < 0.6) {
			this.destX = 940;
			this.destY = 1000;
		}
		let dx = this.destX - this.x;
		let dy = this.destY - this.y;
		let directionAngle = Math.PI / 2 - Math.atan2(dx, dy);
		this.speed = speed;
		this.vector = {
			x: Math.cos(directionAngle),
			y: Math.sin(directionAngle),
		};
	};
	////////////////
	let animloop = function () {
		if (animaGroup !== null) {
			if (particles.length > 0) {
				animaGroup
					.each((p) => p.update())
					.attr(
						"transform",
						(p) => `translate(${p.x}, ${p.y})translate(-58, -58)`
					);
			}
			window.requestAnimationFrame(animloop);
		}
	};
	animloop();

	function updateParticles(size) {
		particles = [];
		for (let i = 0; i < size; i++) {
			let sx, sy, dx, dy;
			sx = Math.random() * 1920;
			sy = 1080;
			dx = sx + Math.random() * 300 - 150;
			dy = sy - Math.random() * 680;
			let p = new Particle();
			p.reset(
				sx,
				sy,
				dx,
				dy,
				1 + 2 * Math.random(),
				1 + Math.random() * 0.4 - 0.2
			);
			particles.push(p);
		}
		animaGroup = d3
			.select("#home2_anima")
			.selectAll("g")
			.data(particles)
			.join("g")
			.attr("transform", (p) => `scale(${p.scale})translate(${p.x}, ${p.y})`);

		animaGroup.each(function () {
			if (Math.random() > 0.5) {
				$(this).append(bubbles[0]);
			} else {
				$(this).append(bubbles[1]);
			}
		});
	}

	updateParticles(12);

	let soc = $.ajax({
		url: "resource/element_home/SOC.svg",
		async: false,
	}).responseText;
	let nut = $.ajax({
		url: "resource/element_home/Nutrients.svg",
		async: false,
	}).responseText;
	let dirtGroup = d3.select("#home2_soc");
	let nutGroup = dirtGroup
		.selectAll(".nut")
		.data([
			[500, 1100],
			[800, 1200],
			[1100, 1200],
			[1400, 1100],
		])
		.join("g")
		.each(function () {
			$(this).append(nut);
		})
		.attr("class", "nut")
		.attr("opacity", 1)
		.attr("transform", (d) => `translate(${d[0]}, ${d[1]})`);
	let nutAnima = function () {
		nutGroup
			.attr("opacity", 1)
			.attr("transform", (d) => `translate(${d[0]}, ${d[1]})`)
			.transition()
			.duration(3000)
			.attr("opacity", 0)
			.attr("transform", `translate(940, 1080)`);
		// .on('end', ()=>{
		//     nutAnima();
		// })
	};

	let socGroup = dirtGroup
		.selectAll(".soc")
		.data([
			[500, 1100],
			[800, 1200],
			[1100, 1200],
			[1400, 1100],
		])
		.join("g")
		.each(function () {
			$(this).append(soc);
		})
		.attr("class", "soc")
		.attr("opacity", 0)
		.attr("transform", `translate(940, 1080)`);
	let socAnima = function () {
		socGroup
			.attr("opacity", 0)
			.attr("transform", `translate(940, 1080)`)
			.transition()
			.duration(3000)
			.attr("opacity", 1)
			.attr("transform", (d) => `translate(${d[0]}, ${d[1]})`);
		// .on('end', ()=>{
		//     socAnima();
		// })
	};

	// leaf
	let leaves = [
		$.ajax({ url: "resource/element_home/Leaf1.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/Leaf2.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/Leaf3.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/Leaf4.svg", async: false })
			.responseText,
	];
	let leafGroup = d3
		.select("#home2_leaves")
		.selectAll(".leaf")
		.data(leaves)
		.join("g")
		.each(function (d) {
			$(this).append(d);
		})
		.attr(
			"transform",
			(d) => `translate(${Math.random() * 400 - 200 + 1500}, 200)`
		)
		.attr("opacity", 1)
		.attr("class", "leaf");
	let leafSocGroup = d3
		.select("#home2_leaves")
		.selectAll(".leafSoc")
		.data(leaves)
		.join("g")
		.each(function () {
			$(this).append(soc);
		})
		.attr("transform", (d, i) => `translate(${500 + i * 300}, 1180)`)
		.attr("opacity", 0)
		.attr("class", "leafSoc");
	let bugGroup = () => { };
	let leafAnima = function () {
		leafSocGroup
			.attr("transform", (d, i) => `translate(${500 + i * 300}, 1180)`)
			.attr("opacity", 0);
		leafGroup
			.attr(
				"transform",
				(d) => `translate(${Math.random() * 400 - 200 + 1500}, 200)`
			)
			.attr("opacity", 1)
			.transition()
			.duration(3000)
			.attr("opacity", 0)
			.attr(
				"transform",
				(d) => `translate(${940 + Math.random() * 1000 - 500}, 1180)`
			)
			.on("end", function () {
				leafSocGroup
					.transition()
					.duration(1000)
					.attr("opacity", 1)
					.on("end", () => {
						bugAnima();
					});
			});
	};

	// bugs
	let bugs = [
		$.ajax({ url: "resource/element_home/microorganisms1.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/microorganisms2.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/microorganisms3.svg", async: false })
			.responseText,
		$.ajax({ url: "resource/element_home/microorganisms4.svg", async: false })
			.responseText,
	];
	bugGroup = d3
		.select("#home2_leaves")
		.selectAll(".bug")
		.data(bugs)
		.join("g")
		.each(function (d) {
			$(this).append(d);
		})
		.attr(
			"transform",
			(d, i) =>
				`translate(${500 + i * 300 + Math.random() * 100 - 50}, ${1180 + Math.random() * 100 - 50
				})`
		)
		.attr("opacity", 0)
		.attr("class", "bug");

	let bugAnima = function () {
		bugGroup
			.attr(
				"transform",
				(d, i) =>
					`translate(${500 + i * 300 + Math.random() * 100 - 50}, ${1180 + Math.random() * 100 - 50
					})`
			)
			.attr("opacity", 0)
			.transition()
			.duration(1000)
			.attr("opacity", 1)
			.on("end", function () {
				bugGroup
					.transition()
					.duration(3000)
					.attr("transform", (d, i) => `translate(${540 + i * 300}, 1220)`)
					.on("end", () => {
						leafSocGroup.transition().duration(1500).attr("opacity", 0);
					});
			});
	};

	registerScroll(
		"#svg_home2",
		(event, isDown) => {
			// #02f8ff
			if (isDown) {
				if (plantStage < 3) {
					let plant = d3.select(`#home2_plant_${plantStage + 1}`);
					if (plant.attr("opacity") === "0") {
						plant
							.transition()
							.duration(500)
							.attr("opacity", 1)
							.on("end", () => {
								plantStage++;
							});
					}
					if (plantStage === 0) {
						nutAnima();
						socAnima();
						setTimeout(() => leafAnima(), 2000);
					}
				} else {
					scrollTo(2, 1, false);
					initPlayHomeVideo(); //开启跷跷板动画
					setTimeout(() => showNavigationBar(), 1000);
				}
			} else {
				if (plantStage > 0) {
					let plant = d3.select(`#home2_plant_${plantStage}`);
					if (plant.attr("opacity") === "1") {
						plant
							.transition()
							.duration(500)
							.attr("opacity", 0)
							.on("end", () => {
								plantStage--;
							});
					}
				} else {
					scrollTo(0, 1000, false);
				}
			}
		},
		20
	);
}

let isLightShown = false;
function showLight() {
	if (isLightShown) return;
	isLightShown = true;
	d3.select("#home2_light")
		.transition()
		.duration(1500)
		.attr("transform", "scale(1, 1)");
}
