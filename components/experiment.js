let loadTime = 0;
const maxLoad = 10;
function initExperiment() {
  loadTime++;
  if (loadTime < maxLoad) return;
  const timeline_bar = d3.select("#timeline_bar");
  const timeline_button = d3.select("#timeline_button");
  let yr = 0;
  const range = 13 - 5;

  let balls = [];
  let lines = [];
  let twinkle = $.ajax({
    url: "resource/experiment/Twinkle.svg",
    async: false,
  }).responseText;
  let particles = [];
  let animaGroup = d3.select("#experiment_anima").selectAll();

  /////////////
  function Particle() { }

  Particle.prototype.update = function () {
    if (this.x > 1920 || this.y > 1080) return true;
    let dx = this.destX - this.x;
    let dy = this.destY - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let speed = this.speed;
    if (dist < 50) {
      speed = (dist / 300) * this.speed;
      let sx = this.destX + Math.random() * 200 - 100;
      let sy = 550 + Math.random() * 40 - 20 - yr * 20 + 80 + yr * 20;
      this.reset(
        sx,
        sy,
        this.destX,
        550 + Math.random() * 40 - 20 - yr * 20,
        1 + 2 * Math.random(),
        Math.random() * 0.03 + 0.09
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
    let dx = destX - this.x;
    let dy = destY - this.y;
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
            (p) =>
              `translate(${p.x}, ${p.y})translate(-58, -58)scale(${p.scale})`
          );
      }
      window.requestAnimationFrame(animloop);
    }
  };
  animloop();

  function updateParticles(year) {
    size2year = [[22,25,29],[27,25,34],[15,22,33],[11,15,31],[13,21,30],[12,17,27],[9,16,27],[7,14,27],[8,15,26]]
    particles = [];
    let sizes = size2year[year]
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < sizes[i]; j++) {
        // const ball = j % 3;
        let sx, sy, dx, dy;
        dy = 550 + Math.random() * 40 - 20 - yr * 20;
        if (i == 0) {
          dx = 500 + Math.random() * 40 - 20;
        } else if (i == 1) {
          dx = 900 + Math.random() * 40 - 20;
        } else if (i == 2) {
          dx = 1400 + Math.random() * 40 - 20;
        }
        sx = dx + Math.random() * 200 - 100;
        sy = dy + 80 + yr * 20;
        let p = new Particle();
        p.reset(
          sx,
          sy,
          dx,
          dy,
          1 + 2 * Math.random(),
          Math.random() * 0.03 + 0.09
        );
        particles.push(p);
      }
    }
    d3.select("#experiment_anima").selectAll("g").remove()
    animaGroup = d3
      .select("#experiment_anima")
      .selectAll("g")
      .data(particles)
      .join("g")
      .attr(
        "transform",
        (p) => `translate(${p.x}, ${p.y})translate(-58, -58)scale(${p.scale})`
      );

    animaGroup.each(function () {
      $(this).append(twinkle);
    });
  }

  updateParticles(0);

  for (let i = 0; i <= range; i++) {
    $.ajax({
      url: `resource/experiment/ball/${i + 5}yr.svg`,
      dataType: "text",
      success: (d) => {
        balls[i] = d;
      },
    });
    $.ajax({
      url: `resource/experiment/line/08-Values-${i + 5}yr.svg`,
      dataType: "text",
      success: (d) => {
        lines[i] = d;
      },
    });
  }

  function updateBall() {
    $("#experiment_ball").html(balls[yr]);
    $("#experiment_line").html(lines[yr]);
    for (let i = 0; i < 3; i++) {
      let ball = `.Ball${i + 1}-`;
      //Li
      d3.select(ball + "Li")
        .attr("pointer-events", "visible")
        .on("mouseover", function (e) {
          showPin(
            450 + 500 * i,
            400,
            "card_litter",
            { span: `Litter   ${expData[i][yr]["drop"]} t/ha` },
            null
          );
        })
        .on("mouseleave", () => {
          hidePin("card_litter");
        });
      //Fi
      d3.select(ball + "Fi")
        .attr("pointer-events", "visible")
        .on("mouseover", function (e) {
          showPin(
            450 + 500 * i,
            500,
            "card_organ_f",
            { span: `gans   ${expData[i][yr]["organ_sum"]} t/ha` },
            null
          );
        })
        .on("mouseleave", () => {
          hidePin("card_organ_f");
        });
      if (i > 0) {
        //Fl
        d3.select(ball + "Fl")
          .attr("pointer-events", "visible")
          .on("mouseover", function (e) {
            showPin(
              450 + 500 * i,
              500,
              "card_organ_m",
              { span: `gans   ${expData[i][yr]["organ2_sum"]} t/ha` },
              null
            );
          })
          .on("mouseleave", () => {
            hidePin("card_organ_m");
          });
      }
      //So
      d3.select(ball + "So")
        .attr("pointer-events", "visible")
        .on("mouseover", function (e) {
          showPin(
            550 + 500 * i,
            500,
            "card_nutrients",
            { span: `Nutrients   ${expData[i][yr]["nourishment"]} t/ha` },
            null
          );
        })
        .on("mouseleave", () => {
          hidePin("card_nutrients");
        });
      //So
      d3.select(ball + "So-20")
        .attr("pointer-events", "visible")
        .on("mouseover", function (e) {
          showPin(
            450 + 500 * i,
            600,
            "card_som",
            { span: `   ${expData[i][yr]["dirt0"]} t/ha` },
            null
          );
        })
        .on("mouseleave", () => {
          hidePin("card_som");
        });
      d3.select(ball + "So-40")
        .attr("pointer-events", "visible")
        .on("mouseover", function (e) {
          showPin(
            450 + 500 * i,
            650,
            "card_som",
            { span: `   ${expData[i][yr]["dirt1"]} t/ha` },
            null
          );
        })
        .on("mouseleave", () => {
          hidePin("card_som");
        });
      d3.select(ball + "So-60")
        .attr("pointer-events", "visible")
        .on("mouseover", function (e) {
          showPin(
            450 + 500 * i,
            700,
            "card_som",
            { span: `   ${expData[i][yr]["dirt2"]} t/ha` },
            null
          );
        })
        .on("mouseleave", () => {
          hidePin("card_som");
        });
    }
  }

  function setYear(year) {
    if (year !== yr && year >= 0 && year <= range) {
      yr = year;
      updateBall();
    }
    if (yr == 0) {
      d3.select("#experiment_description1")
        .transition()
        .duration(500)
        .attr("opacity", 1);
      d3.select("#experiment_description2")
        .transition()
        .duration(500)
        .attr("opacity", 0);
      d3.select("#experiment_description3")
        .transition()
        .duration(500)
        .attr("opacity", 0);
    } else if (yr >= 4) {
      d3.select("#experiment_description1")
        .transition()
        .duration(500)
        .attr("opacity", 0);
      d3.select("#experiment_description2")
        .transition()
        .duration(500)
        .attr("opacity", 0);
      d3.select("#experiment_description3")
        .transition()
        .duration(500)
        .attr("opacity", 1);
      d3.select("#mixed").attr("fill", "#02f8ff");
    } else {
      d3.select("#experiment_description1")
        .transition()
        .duration(500)
        .attr("opacity", 0);
      d3.select("#experiment_description2")
        .transition()
        .duration(500)
        .attr("opacity", 1);
      d3.select("#experiment_description3")
        .transition()
        .duration(500)
        .attr("opacity", 0);
      d3.select("#mixed").attr("fill", "#ffffff");
    }
    if (
      yr >= 1 &&
      d3.select("#experiment_general_trends").attr("opacity") === `0`
    ) {
      d3.select("#experiment_general_trends")
        .transition()
        .duration(500)
        .attr("opacity", 1)
        .attr("transform", `translate(0 0)`);
    }
  }

  timeline_button.call(
    d3.drag().on("drag", function (e) {
      if (e.y < 360 + 370 && e.y > 370) {
        timeline_bar.attr("height", e.y - 370);
        timeline_button.attr("transform", `translate(0 ${e.y - 370})`);

        let newYr = Math.ceil(((e.y - 375) * range) / 360);
        if (newYr !== yr) {
          setYear(newYr);
          timeline_button.select("text").text(`${yr + 5}`);
        }
      }
    })
  );

  registerScroll("#experiment", (event, isDown) => {
    updateParticles(yr)
    if (isDown) {
      if (yr < range) {
        setYear(yr + 1);
        timeline_button.select("text").text(`${yr + 5}`);
        let offY = (yr * 360) / range;
        timeline_bar.transition().duration(500).attr("height", offY);
        timeline_button
          .transition()
          .duration(500)
          .attr("transform", `translate(0 ${offY})`);
      } else {
        scrollTo(11, 1000, false);
        $("#icon-mouse-scroll").fadeOut(500);
      }
    } else if (!isDown) {
      if (yr > 0) {
        setYear(yr - 1);
        timeline_button.select("text").text(`${yr + 5}`);
        let offY = (yr * 360) / range;
        timeline_bar.transition().duration(500).attr("height", offY);
        timeline_button
          .transition()
          .duration(500)
          .attr("transform", `translate(0 ${offY})`);
      } else {
        hideNavigationBar();
        scrollTo(9, 1000, false);
      }
    } else {
    }
  });
  updateBall();
}
