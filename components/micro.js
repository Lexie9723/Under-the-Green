let loadMicro = 0;
const maxMicro = 1;
function initAnimMicro() {
  d3.select("#micro_legend")
    .transition()
    .duration(1000)
    .attr("width", "translate(-100, 0)")
  d3.select("#micro_legend")
    .transition()
    .delay(1000)
    .attr("transform", "translate(0, 0)");
}

function initMicro() {
  loadMicro++;
  if (loadMicro < maxMicro) return;

  console.log("load Micro");
  const timeline_bar = d3.select("#timeline_bar_2");
  const timeline_button = d3.select("#timeline_button_2");
  timeline_button.select("text").text('0');
  let yr = 0;
  // const range = 30 - 5;
  const range = 30;

  timeline_button.call(
    d3.drag().on("drag", function (e) {
      if (e.y < 360 + 370 && e.y > 370) {
        timeline_bar.attr("height", e.y - 370);
        timeline_button.attr("transform", `translate(0 ${e.y - 370})`);

        let newYr = Math.ceil(((e.y - 375) * range) / 360);
        if (newYr !== yr) {
          setYear(newYr);
          // timeline_button.select("text").text(`${yr + 5}`);
          timeline_button.select("text").text(`${yr}`);
        }
      }
    })
  );

  /* 颗粒运动 start */
  let bubbles = [
    $.ajax({ url: "resource/element_home/Bubble.svg", async: false })
      .responseText,
    $.ajax({ url: "resource/element_home/BubbleCO2.svg", async: false })
      .responseText,
  ];
  let soc = $.ajax({
    url: "resource/element_home/SOC.svg",
    async: false,
  }).responseText;
  let nut = $.ajax({
    url: "resource/element_home/Nutrients.svg",
    async: false,
  }).responseText;
  let dirtGroup = d3.select("#micro_soc");
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
      .on('end', () => {
        nutParticle.transition()
          .duration(Math.random() * 6000 + 6000)
          .attr("opacity", 0)
          .attr("transform", `translate(940, 1080)`)
          .on('end', () => {
            nutParticle.remove()
            for (let i = 0; i < 4; i++) {
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
                .on('end', () => {
                  socParticle.transition()
                    .delay(Math.random() * 2000)
                    .duration(2000)
                    .attr("opacity", 0)
                    .attr("transform", `translate(${x}, 1080)`)
                    .on('end', () => {
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
                        .on('end', () => {
                          co2.transition()
                            .duration(10000)
                            .attr("transform", `translate(${x}, 0)`)
                            .on('end', () => {
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

  /* 颗粒运动end */

  // 树木生长
  function treesAnimation(isDown) {
    console.log("yr", yr)
    if (yr === 0) {
      d3.select("#micro_middlerowtrees")
        .transition()
        .duration(500)
        .attr("opacity", 0);
    }
    if (yr === 1) {
      d3.select("#micro_middlerowtrees")
        .transition()
        .duration(500)
        .attr("opacity", 1);
    }
    if (yr <= 8) {
      if (yr === 0) {
        d3.select("#micro_text1")
          .transition()
          .attr("opacity", 0);

      } else if (yr === 1) {
        d3.select("#micro_text" + yr)
          .transition()
          .delay(500)
          .attr("opacity", 1);
      } else if (yr === 8) {
        d3.select("#micro_text" + Number(yr - 1))
          .transition()
          .attr("opacity", 0);
        d3.select("#micro_text" + yr)
          .transition()
          .delay(500)
          .attr("opacity", 1);
      } else {
        if (isDown) {
          d3.select("#micro_text" + Number(yr - 1))
            .transition()
            .attr("opacity", 0);
          d3.select("#micro_text" + yr)
            .transition()
            .delay(500)
            .attr("opacity", 1);
        } else {
          d3.select("#micro_text" + yr)
            .transition()
            .delay(500)
            .attr("opacity", 1);
          d3.select("#micro_text" + Number(yr + 1))
            .transition()
            .attr("opacity", 0);
        }
      }
    }

    if (yr <= 9) {
      d3.select("#micro_frontrowbranch" + yr)
        .transition()
        .duration(500)
        .attr("opacity", isDown ? 1 : 0);
    }
    if (yr <= 10) {
      d3.select("#micro_middlerowbranch" + yr)
        .transition()
        .duration(500)
        .attr("opacity", isDown ? 1 : 0);
    }
    if (yr <= 6) {
      d3.select("#micro_frontrowleaf" + yr)
        .transition()
        .delay(1000)
        .duration(500)
        .attr("transform", "translate(0, 0)")
        .attr("opacity", isDown ? 1 : 0);
    }
    if (yr > 10 && yr <= 16) {
      d3.select("#micro_middlerowleaf" + Number(yr - 10))
        .transition()
        .delay(1000)
        .duration(1000)
        .attr("transform", "translate(0, 0)")
        .attr("opacity", isDown ? 1 : 0);
    }
    if (isDown) {
      if (yr === 11) {
        d3.select("#micro_frontrowleaf1")
          .transition()
          .duration(1000)
          .attr("transform", "translate(0, 400)")
        d3.select("#micro_frontrowleaf1")
          .transition()
          .delay(1000)
          .attr("opacity", 0);
      }
    }
    if (yr === 12) {
      d3.select("#micro_frontrowleaf6")
        .transition()
        .duration(1000)
        .attr("transform", "translate(0, 400)")
      d3.select("#micro_frontrowleaf6")
        .transition()
        .delay(1000)
        .attr("opacity", 0);
    }
    if (yr === 14) {
      d3.select("#micro_frontrowleaf2")
        .transition()
        .duration(1000)
        .attr("transform", "translate(0, 400)")
      d3.select("#micro_frontrowleaf2")
        .transition()
        .delay(1000)
        .attr("opacity", 0);
    }
  }
  // 颗粒运动
  function setYear(year, isDown) {
    if (year !== yr && year >= 0 && year <= range) {
      yr = year;
      treesAnimation(isDown);
    }
  }
  registerScroll("#micro", (event, isDown) => {
    if (isDown && yr < range) {
      setYear(yr + 1, isDown);
      // timeline_button.select("text").text(`${yr + 5}`);
      timeline_button.select("text").text(`${yr}`);
      let offY = (yr * 360) / range;
      timeline_bar.transition().duration(500).attr("height", offY);
      timeline_button
        .transition()
        .duration(500)
        .attr("transform", `translate(0 ${offY})`);
    } else if (!isDown) {
      if (yr > 0) {
        setYear(yr - 1, isDown);
        // timeline_button.select("text").text(`${yr + 5}`);
        timeline_button.select("text").text(`${yr}`);
        let offY = (yr * 360) / range;
        timeline_bar.transition().duration(500).attr("height", offY);
        timeline_button
          .transition()
          .duration(500)
          .attr("transform", `translate(0 ${offY})`);
      } else {
        hideNavigationBar();
        scrollTo(8, 1000, false);
      }
    } else {
      scrollTo(10, 1000, false);
    }
  });
}
