const cellContainer = document.querySelector(".cell-container");
const rowContainer = document.querySelector(".row-container");
const form = document.querySelector("#form");

const cellDisplay = document.querySelector("#cell-display");
const fontSizeChanger = document.querySelector("#font-size-changer");

const totalColumns = 26;
const totalRows = 50;

let cellsStyleMap = new Map();
let activeElement = null;

const defaultStyle = {
  bold: false,
  italic: false,
  underline: false,
  fontSize: 16,
  fontFamily: "Arial, sans-serif",
  textAlign: "left",
  bgColor: "#ffffff",
  color: "#000000",
};

// Loop to create and append input elements in a grid
for (let row = 0; row < totalRows; row++) {
  for (let col = 0; col < totalColumns; col++) {
    // Create a new input element
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.contentEditable = true;
    cell.setAttribute(
      "data-id",
      `${row + 1}${String.fromCharCode(96 + col + 1)}`
    );

    // Append the new input to the container
    cellContainer.appendChild(cell);
  }
}

for (let i = 0; i < totalRows; i++) {
  const rowBtn = document.createElement("p");
  rowBtn.innerText = i + 1;
  rowContainer.appendChild(rowBtn);
}

cellContainer.addEventListener("click", (e) => {
  activeElement = e.target;
  let selectedID = activeElement.getAttribute("data-id");
  cellDisplay.innerText = selectedID;
  // console.log(activeElement);

  //For the Form , if the active cell already has styleobj get it and put its options in the form
  // or get default styles and put it
  if (cellsStyleMap.get(selectedID)) {
    setFormOptions(cellsStyleMap.get(selectedID));
  } else {
    setFormOptions(defaultStyle);
  }

  //creating style object of that cell  for the first time
  if (cellsStyleMap.get(selectedID) === undefined) {
    cellsStyleMap.set(selectedID, defaultStyle);
  }
  // console.log(cellsStyleMap.get(selectedID));
  // console.log(cellsStyleMap);
});

form.addEventListener("change", (e) => {
  console.log(e);
  if (!activeElement) {
    alert("please select a cell to make changes");
    form.reset();
    return;
  }

  let activeId = activeElement.getAttribute("data-id");

  let appliedCellStyleObj = {
    fontSize: form.fontSize.value,
    fontFamily: form.fontFamily.value,
    color: form.color.value,
    textAlign: form.textAlign.value,
    bgColor: form.bgColor.value,
    bold: form.bold.checked,
    italic: form.italic.checked,
    underline: form.underline.checked,
  };

  cellsStyleMap.set(activeId, appliedCellStyleObj);
  console.log(cellsStyleMap.get(activeId));

  paintCellStyle(activeElement, cellsStyleMap.get(activeId));
});

function paintCellStyle(cell, styleObj) {
  cell.style.fontStyle = styleObj.italic ? "italic" : "";
  cell.style.textDecoration = styleObj.underline ? "underline" : "";
  cell.style.fontWeight = styleObj.bold ? "bold" : "";

  cell.style.fontSize = `${styleObj.fontSize}px`;
  cell.style.fontFamily = styleObj.fontFamily;
  cell.style.backgroundColor = styleObj.bgColor;
  cell.style.color = styleObj.color;
  cell.style.textAlign = styleObj.textAlign;
}

function setFormOptions(activeCellOptions) {
  form.fontFamily.value = activeCellOptions.fontFamily;
  form.fontSize.value = activeCellOptions.fontSize;
  form.textAlign.value = activeCellOptions.textAlign;
  form.color.value = activeCellOptions.color;
  form.bgColor.value = activeCellOptions.bgColor;
  form.bold.checked = activeCellOptions.bold;
  form.italic.checked = activeCellOptions.italic;
  form.underline.checked = activeCellOptions.underline;
}
