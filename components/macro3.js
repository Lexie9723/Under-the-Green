let loadMacro3 = 0;
const maxMacro3 = 1;

function initMacro3() {
  loadMacro3++;
  if (loadMacro3 < maxMacro3) return;
  const initMacro = () => {
    const nonTargetYears = [];
    const targetYears = [];
    const handlerData = {
      target: {
        2001: {
          highlight: [],
          normal: []
        },
        2004: {
          highlight: [],
          normal: []
        },
        2008: {
          highlight: [],
          normal: []
        },
        2014: {
          highlight: [],
          normal: []
        },
      },
      nonTarget: [],
    };
    const duration = 0.7;
    const opacity = 0.2;

    // 初始化目标年份 2001、2004、2008、2014 数组
    for (let year = 1996; year <= 2020; year += 1) {
      if ([2001, 2004, 2008, 2014].includes(year)) {
        targetYears.push(year);
      } else {
        nonTargetYears.push(year);
      }
    }

    // 获取所有分组数据并筛选出 2001、2004、2008、2014 相关分组
    $("#macroContainer g").each(function () {
      const id = $(this).attr("id");
      if (id) {
        const targetYear = targetYears.find((ele) => id.includes(ele));
        const nonTargetYear = targetYear ?
          null :
          nonTargetYears.find((ele) => id.includes(ele));
        if (targetYear) {
          // handlerData.target[targetYear].push(this);
          if (id.includes(`For${targetYear}`)) {
            handlerData.target[targetYear].highlight.push(this);
          } else {
            handlerData.target[targetYear].normal.push(this);
          }
        }
        if (nonTargetYear) {
          handlerData.nonTarget.push(this);
        }
      }
    });

    // 设置其它分组透明度为 opacity
    const greyOther = (currentYear, triggerType) => {
      const {
        target,
        nonTarget
      } = handlerData;

      Object.keys(target).forEach((year) => {
        target[year].normal.forEach((ele) => {
          const id = $(ele).attr("id");
          let opacityValue = year !== currentYear ? opacity : 1
          // 大叶子小叶子
          if (year === currentYear) {
            if (triggerType === 'Soil') {
              if (id === `_${currentYear}-Plant-Stocks` || id === `_${currentYear}-Plant-Density`) opacityValue = opacity
            } else {
              if (id === `_${currentYear}-Soil-Stocks` || id === `_${currentYear}-Soil-Density`) opacityValue = opacity

            }
          }
          // 粉红花瓣的特殊处理，分组合理的话此步骤可省略
          // if (id.includes('Plant-Stocks')) opacityValue = 0.5
          gsap.to(ele, {
            duration,
            opacity: opacityValue
          });
        });
      });

      nonTarget.forEach((ele) => {
        const id = $(ele).attr("id");
        let opacityValue = opacity
        // 粉红花瓣的特殊处理，分组合理的话此步骤可省略
        // if (id.includes('Plant-Stocks')) opacityValue = 0.5
        gsap.to(ele, {
          duration,
          opacity: opacityValue
        });
      });

      // 隐藏默认描述
      gsap.to("#Description1", {
        duration,
        opacity: 0,
      })

      // 特殊元素的处理
      gsap.to("#GaussianBlurring", {
        duration,
        opacity: 0.9
      });

      // 高亮当前年份相关数据
      const currentHighlight = target[currentYear].highlight.find(ele => $(ele).attr("id").includes(triggerType))
      if (currentHighlight) gsap.to(currentHighlight, {
        duration,
        opacity: 1,
        visibility: 'visible'
      })
    };

    // 设置全部分组透明度为1
    const showAll = () => {

      const {
        target,
        nonTarget
      } = handlerData;

      Object.keys(target).forEach((year) => {
        const {
          highlight,
          normal
        } = target[year]

        highlight.forEach((ele) => {
          gsap.to(ele, {
            duration,
            opacity: 0,
            visibility: 'hidden'
          });
        });

        normal.forEach((ele) => {
          gsap.to(ele, {
            duration,
            opacity: 1
          });
        });


      });

      nonTarget.forEach((ele) => {
        gsap.to(ele, {
          duration,
          opacity: 1
        });
      });

      // 特殊元素的处理
      gsap.to("#GaussianBlurring", {
        duration,
        opacity: 1
      });

      // 显示默认描述
      gsap.to("#Description1", {
        duration,
        opacity: 1,
      })
    };


    // 处理 2001 年
    $("#_2001-Soil-Stocks").mouseover(() => {
      greyOther("2001", 'Soil');
    });
    $("#_2001-Soil-Density").mouseover(() => {
      greyOther("2001", 'Soil');
    });
    $("#_2001-Soil-Bubbles").mouseover(() => {
      greyOther("2001", 'Soil');
    });
    $("#_2001-Plant-Stocks").mouseover(() => {
      greyOther("2001", 'Plant');
    });
    $("#_2001-Plant-Density").mouseover(() => {
      greyOther("2001", 'Plant');
    });
    $("#_2001-Plant-Bubbles").mouseover(() => {
      greyOther("2001", 'Plant');
    });
    $('#For2001-Soil').mousemove(() => {
      showAll();
    });
    $('#For2001-Plant').mousemove(() => {
      showAll();
    });

    // 处理 2004 年
    $("#_2004-Soil-Stocks").mouseover(() => {
      greyOther("2004", 'Soil');
    });
    $("#_2004-Soil-Density").mouseover(() => {
      greyOther("2004", 'Soil');
    });
    $("#_2004-Soil-Bubbles").mouseover(() => {
      greyOther("2004", 'Soil');
    });
    $("#_2004-Plant-Stocks").mouseover(() => {
      greyOther("2004", 'Plant');
    });
    $("#_2004-Plant-Density").mouseover(() => {
      greyOther("2004", 'Plant');
    });
    $("#_2004-Plant-Bubbles").mouseover(() => {
      greyOther("2004", 'Plant');
    });
    $('#For2004-Soil').mousemove(() => {
      showAll();
    });
    $('#For2004-Plant').mousemove(() => {
      showAll();
    });

    // 处理 2008 年
    $("#_2008-Soil-Stocks").mouseover(() => {
      greyOther("2008", 'Soil');
    });
    $("#_2008-Soil-Density").mouseover(() => {
      greyOther("2008", 'Soil');
    });
    $("#_2008-Soil-Bubbles").mouseover(() => {
      greyOther("2008", 'Soil');
    });
    $("#_2008-Plant-Stocks").mouseover(() => {
      greyOther("2008", 'Plant');
    });
    $("#_2008-Plant-Density").mouseover(() => {
      greyOther("2008", 'Plant');
    });
    $("#_2008-Plant-Bubbles").mouseover(() => {
      greyOther("2008", 'Plant');
    });
    $('#For2008-Soil').mousemove(() => {
      showAll();
    });
    $('#For2008-Plant').mousemove(() => {
      showAll();
    });

    // 处理 2014 年
    $("#_2014-Soil-Stocks").mouseover(() => {
      greyOther("2014", 'Soil');
    });
    $("#_2014-Soil-Density").mouseover(() => {
      greyOther("2014", 'Soil');
    });
    $("#_2014-Soil-Bubbles").mouseover(() => {
      greyOther("2014", 'Soil');
    });
    $("#_2014-Plant-Stocks").mouseover(() => {
      greyOther("2014", 'Plant');
    });
    $("#_2014-Plant-Density").mouseover(() => {
      greyOther("2014", 'Plant');
    });
    $("#_2014-Plant-Bubbles").mouseover(() => {
      greyOther("2014", 'Plant');
    });
    $('#For2014-Soil').mousemove(() => {
      showAll();
    });
    $('#For2014-Plant').mousemove(() => {
      showAll();
    });
  };

  initMacro()

  registerScroll("#svg_macro3", (event, isDown) => {
    if (isDown) {
      scrollTo(6, 1000, false);
      initAnimMicro1();
    } else {
      scrollTo(4, 1000, false);
      d3.select("#macro2_audio")
        .transition()
        .duration(1000)
        .style("display", "inline-block");
      $("#icon-mouse-scroll").fadeIn(1200);
    }
  });
}
