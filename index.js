var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//ширина и высота канваса
var w = document.getElementById('canvas').width;
var h = document.getElementById('canvas').height;

var N = 1, x0 = 0, y0 = 0,
    alfa = 1, betta = 1, ro = 1,
    delta = 1, fi = 1, tay = 1, 
    A = 0, B = 10, C = 0, D = 10,
    perX = 1, perY = 1;
var colors = ["black", "silver","Olive","DarkSlateGrey","Coral","Crimson","PaleGreen","LightSalmon","LightSeaGreen","Teal","DimGray","SaddleBrown","Goldenrod","SteelBlue","DeepSkyBlue","DarkBlue","MidnightBlue","Fuchsia","DarkMagenta","Indigo","Chocolate", "rosybrown","DarkRed","DeepPink","MediumVioletRed","OrangeRed","Chartreuse","Lime","Chartreuse","MediumSpringGreen", "brown", "red", "tomato", "orangered", "saddlebrown", "chocolate", "darkorange", "goldenrod", "gold", "olivedrab", "lawngreen", "darkseagreen", "seagreen", "mediumspringgreen", "turquoise", "teal", "steelblue", "midnightblue", "mediumpurple", "indigo", "violet", "fuchsia", "deeppink", "crimson"];    
var wforward = [];
var wback = [];
var x = [];
var y = [];
var xx = [];
var yy = [];

canvas.addEventListener("mousedown", getPosition, false);

//Основная функция
function getPosition(event) {

  N = +document.getElementById("N").value;
  alfa = +document.getElementById("alfa").value;
  betta = +document.getElementById("betta").value;
  delta = +document.getElementById("delta").value;
  ro = +document.getElementById("ro").value;
  fi = +document.getElementById("fi").value;
  tay = +document.getElementById("tay").value;
  A = +document.getElementById("A").value;
  B = +document.getElementById("B").value;
  C = +document.getElementById("C").value;
  D = +document.getElementById("D").value;

  //масштаб по осям
  perX = w / (B - A); 
  perY = h / (D - C); 

  var rect = canvas.getBoundingClientRect();
  x0 = (event.clientX - rect.left) / perX;
  y0 = D - (event.clientY - rect.top) / perY;
  
  x = [x0];
  y = [y0];
  xx = [x0];
  yy= [y0];

  for (var i = 0; i <= N; i++){
    x[i+1] = xnext(x[i], y[i]);
    y[i+1] = ynext(x[i], y[i]);
    xx[i+1] = xprev(xx[i], yy[i]);
    yy[i+1] = yprev(xx[i], yy[i]);
  }

  drawforward();
  drawback();
}

function drawforward(){
  var rand = Math.floor(Math.random() * colors.length);
  ctx.strokeStyle = colors[rand];
  ctx.beginPath();
  ctx.moveTo(x0*perX, D*perY - y0*perY);

  for(var i = 1; i<=N; i++){
    ctx.lineTo(x[i]*perX, D*perY - y[i]*perY );
  }
  ctx.stroke(); 
}

function drawback(){
  var rand = Math.floor(Math.random() * colors.length);
  ctx.strokeStyle = colors[rand];
  ctx.beginPath();
  ctx.moveTo(x0*perX, D*perY - y0*perY );

  for(var i = 1; i<=N; i++){
    ctx.lineTo(xx[i]*perX, D*perY - yy[i]*perY);
  }
  ctx.stroke();
}

function f1(x, y){
  return alfa*x*x + betta*y*y + ro;
}

function f2(x, y){
  return delta*x + fi;
}

function xnext(x, y){
  return x + tay*f1(x, y);
}

function ynext(x, y){
  return y + tay*f2(x, y);
}

function xprev(x, y){
  return x - tay*f1(x, y);
}

function yprev(x, y){
  return y - tay*f2(x, y);
}
