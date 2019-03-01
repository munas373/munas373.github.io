$(document).ready(function(){
    var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
        console.log(currentMousePos.x +' '+currentMousePos.y );
    });
});