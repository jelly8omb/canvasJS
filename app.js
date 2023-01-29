const colorOption = Array.from(document.getElementsByClassName("colorOption"));
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const modeBtn = document.getElementById("modeBtn");
const fileInput = document.getElementById("file");
const destroyBtn = document.getElementById("destroyBtn");
const eraserBtn = document.getElementById("eraserBtn");
const lineWidth = document.getElementById("lineWidth");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX,  event.offsetY);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX,  event.offsetY);
}
function startPainting(){
    isPainting = true;
}
function endPainting(){
    isPainting = false;
}
function onlineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick(){
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "🎨 Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "🎨 Draw"
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}
function onEraseClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill"
}
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDoubleClick(event){
    if(text !== ""){
        ctx.save();
        const text = textInput.value;
        ctx.lineWidth = 1;
        ctx.font = "bold 50px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}
function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}



canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("click", onCanvasClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("mousedown", onEraseClick);
canvas.addEventListener("mouseup", endPainting);
// document.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);

lineWidth.addEventListener("change", onlineWidthChange);
color.addEventListener("change", onColorChange);

colorOption.forEach(color => color.addEventListener("click", onColorClick))
modeBtn.addEventListener("click", onModeClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);




// const colors = [
//     "#e74c3c",
//     "#8e44ad",
//     "#d35400",
//     "#16a085",
//     "#f1c40f",
//     "#f39c12",
//     "#3498db",
//     "#2980b9",
//     "#34495e",
// ]

// function onClick(event){
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     const color = colors[Math.floor(Math.random() * colors.length)]
//     ctx.strokeStyle = color;
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
// }

// canvas.addEventListener("mousemove", onClick);

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// ctx.fillRect(210 - 40, 200 - 40, 15, 100); (x, y, width, height)
// ctx.fillRect(350 - 40, 200 - 40, 15, 100); (x, y, width, height)
// ctx.fillRect(260 - 40, 200 - 40, 60, 200); (x, y, width, height)

// ctx.arc(250, 100, 50, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260+10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.arc(220+10, 80, 8, Math.PI, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(250, 100, 8, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "red";
// ctx.arc(250, 125, 15, 0, 1 * Math.PI);
// ctx.fill();

////////////////////////////////////////////////////////////////////////////////////////////////////////

// ctx.fillRect(200, 200, 50, 200); //첫번쨰 벽
// ctx.fillRect(400, 200, 50, 200); //두번쨰 벽
// // ctx.lineWidth = 2; //문의 굵기
// ctx.fillRect(300, 300, 50, 100); //문
// ctx.fillRect(200, 200, 200, 20); //지붕
// ctx.moveTo(200, 200);
// ctx.lineTo(325, 100);
// ctx.lineTo(450, 200);
// ctx.fill();