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
			this.reset(
				1 + Math.random(),
				1 + Math.random() * 0.4 - 0.2
			);
		} else if (plantStage > 0 && this.x > 900 && this.x < 1050 && this.y > 780 && this.y < 980) {
			this.reset(
				1 + Math.random(),
				1 + Math.random() * 0.4 - 0.2
			);
		} else if (plantStage > 0 && this.x > 700 && this.x < 1250 && this.y > 680 && this.y < 980) {
			this.destX = (900 + 1050) / 2;
			this.destY = (1050 + 980) / 2;
			dx = this.destX - this.x;
			dy = this.destY - this.y;
			let directionAngle = Math.PI / 2 - Math.atan2(dx, dy);
			this.speed = speed;
			this.vector = {
				x: Math.cos(directionAngle),
				y: Math.sin(directionAngle),
			};
		}
		this.x += speed * this.vector.x;
		this.y += speed * this.vector.y;
		return false;
	};

	Particle.prototype.reset = function (speed, scale) {
		this.scale = scale;
		this.x = Math.random() * 1920;
		this.y = 1080;
		this.destX = this.x + Math.random() * 500 - 250;
		if (Math.random() < 0.5) {
			this.destY = 0;
		} else {
			this.destY = 812 - Math.random() * 400 + 200;
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
			let p = new Particle();
			p.reset(
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

	updateParticles(20);

	/////////////


	let soc = $.ajax({
		url: "resource/element_home/SOC.svg",
		async: false,
	}).responseText;
	let nut = $.ajax({
		url: "resource/element_home/Nutrients.svg",
		async: false,
	}).responseText;
	let dirtGroup = d3.select("#home2_soc");
	let nutAnima = function () {
		let nutParticle = dirtGroup.append("g")
			.attr("opacity", 0)
			.attr("transform", `translate(${Math.random() * 1920}, ${1100 + Math.random() * 200})`)
			.each(function () {
				$(this).append(nut);
			});

		nutParticle.transition()
			.delay(Math.random() * 4000)
			.duration(Math.random() * 500 + 100)
			.attr("opacity", 1)
			.on('end', ()=>{
				nutParticle.transition()
					.duration(Math.random() * 6000 + 6000)
					.attr("opacity", 0)
					.attr("transform", `translate(940, 1080)`)
					.on('end', ()=>{
						nutParticle.remove()
						for (let i = 0; i < 7; i++) {
							let x = Math.random() * 1920;
							let y = 1100 + Math.random() * 200;
							let socParticle = dirtGroup.append("g")
								.attr("opacity", 0)
								.attr("transform", `translate(${x}, ${y})`)
								.each(function () {
									$(this).append(soc);
								});

							socParticle.transition()
								.duration(200)
								.attr("opacity", 1)
								.on('end', ()=>{
									socParticle.transition()
										.delay(Math.random() * 2000)
										.duration(2000)
										.attr("opacity", 0)
										.attr("transform", `translate(${x}, 1080)`)
										.on('end', ()=>{
											socParticle.remove();
											let co2 = dirtGroup.append("g")
												.attr("opacity", 0)
												.attr("transform", `translate(${x}, 1080)`)
												.each(function () {
													if (Math.random() > 0.5) {
														$(this).append(bubbles[0]);
													} else {
														$(this).append(bubbles[1]);
													}
												});
											co2.transition()
												.duration(100)
												.attr("opacity", 1)
												.on('end', ()=>{
													co2.transition()
														.duration(10000)
														.attr("transform", `translate(${x}, 0)`)
														.on('end', ()=>{
															co2.remove();
														})
												})
										})
								})
						}
						nutAnima();
					})
			})
	};

	for (let i = 0; i < 3; i++) {
		nutAnima();
	}

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
		.attr("transform", (d) => `translate(${Math.random() * 400 - 200 + 1500}, 200)`)
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
			.attr("transform", (d, i) => `translate(${500 + (i+1) * 500 * (Math.random()-0.5)}, ${1000 + 180* Math.random()})`)
			.attr("opacity", 0);
		leafGroup
			.attr("transform",(d) => `translate(${Math.random() * 400 - 200 + 1500}, 200)`)
			.attr("opacity", 1)
			.transition()
			.duration(3000)
			.attr("opacity", 0)
			.attr("transform", (d) => `translate(${940 + Math.random() * 1000 - 500}, 1180)`)
			.on("end", function () {
				leafSocGroup
					.transition()
					.duration(1000)
					.attr("opacity", 1)
					.on("end", () => {
						leafAnima();
					});
			});
	};

	leafAnima()

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

	let bugAnima = function (bugParticle) {
		let x = Math.random() * 1920;
		let y = 1100 + Math.random() * 200;
		let socParticle = dirtGroup.append("g")
			.attr("opacity", 0)
			.attr("transform", `translate(${x}, ${y})`)
			.each(function () {
				$(this).append(soc);
			});

		socParticle.transition()
			.delay(Math.random() * 2000 + 1000)
			.duration(300)
			.attr("opacity", 1)
			.on('end', ()=>{
				bugParticle.transition()
					.duration(Math.random() * 4000 + 4000)
					.attr("transform", `translate(${x + 40}, ${y + 40})`)
					.on('end', ()=>{
						socParticle.remove();
						bugAnima(bugParticle);
					});
			});
	};

	for (let bug of bugs) {
		let x = Math.random() * 1920;
		let y = 1100 + Math.random() * 200;
		let bugParticle = d3.select("#home2_bugs")
			.append("g").each(function () {
				$(this).append(bug);
			})
			.attr("transform", `translate(${x}, ${y})`);
		bugAnima(bugParticle)
	}

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
								d3.select(`#Description`+plantStage).transition().duration(1000).attr("opacity", 0);
								d3.select(`#Description`+(plantStage+1)).transition().duration(1000).attr("opacity", 1);
							});
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
								d3.select(`#Description`+(plantStage+2)).transition().duration(1000).attr("opacity", 0);
								d3.select(`#Description`+(plantStage+1)).transition().duration(1000).attr("opacity", 1);
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
