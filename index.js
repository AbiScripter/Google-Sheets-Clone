const parent = document.querySelector(".parent");
const form = document.querySelector("#form");
const cellDisplay = document.querySelector("#cell-display");
const fontSizeChanger = document.querySelector("#font-size-changer");

let footer = document.querySelector(".footer");
const sheetToggleContainer = document.querySelector(".sheet-toggle-container");
const createSheetBtn = document.querySelector(".create-sheet-btn");
const deleteSheetBtn = document.querySelector(".delete-sheet-btn");

let activeElement = null;
let count = 0;
let cellsStyleMap;

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

function sheet(count) {
  //!create tableContainer for each sheet and append it with parent-container
  const tableContainer = document.createElement("div");
  tableContainer.className = `table-container`;

  //creating data-id  for sheet toggling purpose
  tableContainer.setAttribute("data-id", count);

  const alphabetColContainer = document.createElement("div");
  alphabetColContainer.className = "alphabet-col-container";

  //dummy div created just for styling purpose
  const dummyDiv = document.createElement("div");
  dummyDiv.className = "dummy-div";

  const numberRowContainer = document.createElement("div");
  numberRowContainer.className = "number-row-container";

  const cellContainer = document.createElement("div");
  cellContainer.className = "cell-container";

  //table-creation.js
  createAlphabetRow(alphabetColContainer);
  createNumberRow(numberRowContainer);
  createCellRow(cellContainer);

  //appending
  dummyDiv.append(numberRowContainer, cellContainer);
  tableContainer.append(alphabetColContainer, dummyDiv);
  parent.appendChild(tableContainer);

  ////////////////////////////////////////////////

  cellsStyleMap = new Map();

  form.addEventListener("change", () => {
    if (!activeElement) {
      alert("please select a cell to make changes");
      return;
    }

    onFormChange(cellsStyleMap);
  });

  // cellContainer => whole 50x26 cells
  cellContainer.addEventListener("click", (e) => {
    onCellClick(e, cellsStyleMap);
  });
}
