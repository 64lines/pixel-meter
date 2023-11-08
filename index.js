const LINE_COLOR = "magenta";

const canvas = document.getElementById("imageCanvas");
const imageInput = document.getElementById("imageInput");
const distanceDOM = document.getElementById("distance");
const referenceDOM = document.getElementById("reference");
const lockReferenceDOM = document.getElementById("lockReference");

const img = new Image();

let startX = 0;
let startY = 0;
let clicked = false;
let isDrawing = false;
let lockReference = false;

const context = canvas.getContext("2d");

lockReferenceDOM.addEventListener("click", function () {
  // Toggle lockReference
  lockReference = !lockReference;

  if (!referenceDOM.value) {
    alert(`The reference value cannot be 0.`);
    return;
  }

  if (lockReference) {
    alert(`The distance has been locked!`);
    lockReferenceDOM.innerHTML = "Unlock Reference";
    referenceDOM.disabled = true;
    return;
  } 

  alert(`The distance has been unlocked!`);
  lockReferenceDOM.innerHTML = "Lock Reference";
  referenceDOM.disabled = false;
});

document.getElementById("restart").addEventListener("click", (e) => {
  context.drawImage(img, 0, 0, img.width, img.height);
});

canvas.addEventListener("mouseup", (e) => {
  if (isDrawing) {
    const endX = e.offsetX;
    const endY = e.offsetY;

    context.strokeStyle = LINE_COLOR; // Set the line color
    context.lineWidth = 3; // Set the line width

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();

    isDrawing = false;
  }
});

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const endX = event.offsetX;
    const endY = event.offsetY;

    const calculatedX = endX - startX;
    const calculatedY = endY - startY;
    const distance = Math.sqrt(
      Math.pow(calculatedX, 2) + Math.pow(calculatedY, 2)
    );

    const referenceValue = referenceDOM.value;

    const text = getLineText({ lockReference, referenceValue, distance });
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height);

    if (!lockReference) {
      distanceDOM.value = distance.toFixed(2);
    }

    context.font = "20px Arial";
    context.fillStyle = LINE_COLOR;
    context.fillText(text, endX, endY);
    drawLine(startX, startY, endX, endY);
  }
});

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (!lockReference) {
    referenceDOM.disabled = false;
  }
});

imageInput.addEventListener("change", (e) => {
  const reader = new FileReader();

  reader.onload = function (event) {
    img.onload = function () {
      lockReference = false;
      referenceDOM.value = "";
      lockReferenceDOM.innerHTML = "Lock Reference";

      canvas.width = img.width;
      canvas.height = img.height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      

      // Draw the loaded image on the canvas
      context.drawImage(img, 0, 0, img.width, img.height);
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(e.target.files[0]);
});

