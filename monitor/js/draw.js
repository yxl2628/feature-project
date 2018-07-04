var time=0;
var routeNum = 0;
$(function(){
    var canvas=document.getElementById('canvas');
    var cxt=canvas.getContext('2d');
    setInterval(function(){
        draw(cxt,250,200,220,30,7);
    },200);
})
function route(context,x,y,a,b){
    var step = (a > b) ? 1 / a : 1 / b;
    context.strokeStyle="#2ec28d";
    context.beginPath();
    context.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    context.stroke();
}
function draw(cxt,x,y,a,b,r){
    cxt.clearRect(0,0,1000,500); //清除画布(清除之前的内容 重新画)
    route(cxt,x,y,a,b);
    var step = (a > b) ? 1 / a : 1 / b;
    cxt.fillStyle="#2ec28d";
    cxt.beginPath();
    cxt.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        cxt.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    cxt.closePath();
    cxt.stroke();

    cxt.beginPath();
    cxt.arc(x+a*Math.cos(time),y+b*Math.sin(time),r,0,2*Math.PI,true);
    cxt.closePath();
    cxt.fill();
    time+=1;
}

