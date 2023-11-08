function calculateReferenceValue({ calculated, referenceValue, locked }) {
  return locked ? ((calculated * referenceValue) / locked) : 0;
}

function getLineText({ lockReference, referenceValue, distance }) {
  const calculatedValue = calculateReferenceValue({
    calculated: distance,
    referenceValue,
    locked: document.getElementById("distance").value,
  });

  const metricMessage =
    calculatedValue < 1
      ? `distance: ${(calculatedValue * 100).toFixed(2)} cm`
      : `distance: ${calculatedValue.toFixed(2)} m`;
  return !lockReference ? `distance: ${distance.toFixed(2)} px` : metricMessage;
}

function drawLine(x1, y1, x2, y2) {
  context.strokeStyle = LINE_COLOR; // Set the line color
  context.lineWidth = 3; // Set the line width

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

