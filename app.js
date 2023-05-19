const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const eraserBtn = document.getElementById("eraser-btn");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
); // Array.from()은 원래 배열이 아닌 컬렉션을 배열로 바꿔주는 메소드인 듯
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"; // 끝모양 둥글둥글
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return; // 불필요한 ctx.moveTo()의 실행을 막기 위해서
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
  ctx.beginPath(); // 중요!!! 그리기 취소는 모든 행동의 끝이니 여기에 삽입
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function changeColor(currentColor) {
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
}

function onColorChange(event) {
  changeColor(event.target.value);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color; // html의 data-*를 활용하여 color를 가져온 것
  changeColor(colorValue);
  color.value = colorValue; // 선택한 색깔을 알려주기 위함
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  console.dir(event.target.files[0]);
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null; // 굳이?
  }; // image.addEventListener("load", function() {})
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); // ctx의 현재 상태, 색상 스타일 등 모든 것을 저장
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore(); // save()와 restore() 사이에 다른 것들은 저장 x
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a"); // <a> 태그 만들고
  a.href = url; // href 속성에 url 집어넣고
  a.download = "myDrawing.png"; // download 속성을 통해 내려받기 가능하게 함
  a.click(); // <a> 태그 클릭하게 함으로써 다운로드 실행
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
