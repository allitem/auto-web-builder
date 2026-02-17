export function makeDraggable(el){
  el.onmousedown = function(e){
    let shiftX = e.clientX - el.getBoundingClientRect().left;
    let shiftY = e.clientY - el.getBoundingClientRect().top;

    el.style.position = 'absolute';
    el.style.zIndex = 1000;
    document.body.append(el);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY){
      el.style.left = pageX - shiftX + 'px';
      el.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event){
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    el.onmouseup = function(){
      document.removeEventListener('mousemove', onMouseMove);
      el.onmouseup = null;
    };
  };
}
