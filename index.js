const parent = document.querySelector(".parent");
const form = document.querySelector("#form");
const cellDisplay = document.querySelector("#cell-display");
const fontSizeChanger = document.querySelector("#font-size-changer");
let footer = document.querySelector(".footer");

let activeElement = null;
let count = 0;

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

let createSheetBtn = document.createElement("button");
createSheetBtn.innerText = `Create Sheet`;
createSheetBtn.className = "create-sheet-btn";

let sheetToggleContainer = document.createElement("div");
sheetToggleContainer.appendChild(createSheetBtn);
footer.appendChild(sheetToggleContainer);

function sheet(count) {
  //!create tableContainer for each sheet and append it with parent-container
  const tableContainer = document.createElement("div");
  tableContainer.className = `table-container`;
  //creating data-id  for sheet toggling purpose
  tableContainer.setAttribute("data-id", count);

  const alphabetColContainer = document.createElement("div");
  alphabetColContainer.className = "alphabet-col-container";

  const sampleDiv = document.createElement("div");
  sampleDiv.className = "sample-div";

  const numberRowContainer = document.createElement("div");
  numberRowContainer.className = "number-row-container";

  const cellContainer = document.createElement("div");
  cellContainer.className = "cell-container";

  createAlphabetRow(alphabetColContainer);
  createNumberRow(numberRowContainer);
  createCellRow(cellContainer);

  //appending
  sampleDiv.append(numberRowContainer, cellContainer);
  tableContainer.append(alphabetColContainer, sampleDiv);
  parent.appendChild(tableContainer);

  ////////////////////////////////////////////////

  let cellsStyleMap = new Map();

  //!event listeners
  //cellContainer => whole 50x26 cells
  cellContainer.addEventListener("click", (e) => {
    console.log(cellsStyleMap);
    activeElement = e.target;

    let selectedID = activeElement.getAttribute("data-id");
    cellDisplay.innerText = selectedID;

    //creating style object of that cell for the first time

    if (cellsStyleMap.get(selectedID) === undefined) {
      cellsStyleMap.set(selectedID, defaultStyle);
    }

    //set the current values of the cell in the form values
    setFormOptions(cellsStyleMap.get(selectedID));
  });

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

  form.addEventListener("change", () => {
    onFormChange(cellsStyleMap);
  });
}
