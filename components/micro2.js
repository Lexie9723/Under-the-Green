let loadMicro2 = 0;
const maxMicro2 = 1;

function initMicro2() {
  loadMicro2++;
  if (loadMicro2 < maxMicro2) return;


  registerScroll("#svg_micro2", (event, isDown) => {
    $("#icon-mouse-scroll").fadeOut(500);
    if (isDown) {
      scrollTo(8, 1000, false);
      setTimeout(() => showLight(), 500);
      initAnimMicro3();
    } else {
      scrollTo(6, 1000, false);
    }
  });
}
