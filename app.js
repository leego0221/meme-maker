const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
  "#7efff5",
];
let x = 0;
let y = 0;

function changePoint(event) {
  x = event.offsetX;
  y = event.offsetY;
}

function drawLine(event) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

canvas.addEventListener("click", changePoint);
canvas.addEventListener("mousemove", drawLine);
