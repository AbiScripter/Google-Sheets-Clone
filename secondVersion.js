let footer = document.querySelector(".footer");
let activeElement = null;

function sheet(count) {
  const parent = document.querySelector(".parent");

  const tableContainer = document.createElement("div");
  tableContainer.className = `table-container`;
  tableContainer.classList.add(`table-${count}`);

  const alphabetColContainer = document.createElement("div");
  alphabetColContainer.className = "alphabet-col-container";

  const sampleDiv = document.createElement("div");
  sampleDiv.className = "sample-div";
  const cellContainer = document.createElement("div");
  cellContainer.className = "cell-container";

  const numberRowContainer = document.createElement("div");
  numberRowContainer.className = "number-row-container";

  sampleDiv.append(numberRowContainer, cellContainer);

  tableContainer.append(alphabetColContainer, sampleDiv);

  parent.appendChild(tableContainer);

  const form = document.querySelector("#form");

  const cellDisplay = document.querySelector("#cell-display");
  const fontSizeChanger = document.querySelector("#font-size-changer");

  const totalColumns = 26;
  const totalRows = 50;

  let cellsStyleMap = new Map();

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

  //!creating Alphabet columns
  for (let i = 0; i <= totalColumns; i++) {
    const colBtn = document.createElement("p");
    if (i == 0) {
      colBtn.innerText = ``;
    } else {
      colBtn.innerText = `${String.fromCharCode(96 + i)}`.toUpperCase();
    }

    alphabetColContainer.appendChild(colBtn);
  }

  //!creating Number columns

  for (let i = 0; i < totalRows; i++) {
    const rowBtn = document.createElement("p");
    rowBtn.innerText = i + 1;
    numberRowContainer.appendChild(rowBtn);
  }

  //!creating Cells

  for (let row = 0; row < 50; row++) {
    const rowElement = document.createElement("div");
    rowElement.className = "row";
    for (let col = 0; col < 26; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      // cell.innerText = col + 1;
      cell.contentEditable = true;
      cell.setAttribute(
        "data-id",
        `${String.fromCharCode(96 + col + 1)}${row + 1}`.toUpperCase()
      );

      rowElement.appendChild(cell);
      // Append the new input to the container
    }

    cellContainer.appendChild(rowElement);
  }

  //!event listeners
  cellContainer.addEventListener("click", (e) => {
    console.log(cellsStyleMap);
    activeElement = e.target;

    let selectedID = activeElement.getAttribute("data-id");
    cellDisplay.innerText = selectedID;

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
  });

  form.addEventListener("change", (e) => {
    console.log(activeElement);
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
    // console.log(cellsStyleMap.get(activeId));

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
}

let sheetToggleContainer = document.createElement("div");

let createSheetBtn = document.createElement("button");
createSheetBtn.innerText = `Create Sheet`;
createSheetBtn.className = "create-sheet-btn";
sheetToggleContainer.appendChild(createSheetBtn);
footer.appendChild(sheetToggleContainer);

let count = 0;
function createSheet() {
  //creating sheet
  let sheetBtn = document.createElement("button");
  sheetBtn.innerText = `Sheet ${++count}`;
  sheetBtn.className = "sheet-btn";
  sheetToggleContainer.appendChild(sheetBtn);

  sheet(count);
}

//initial render
createSheet();

createSheetBtn.addEventListener("click", () => {
  let allActive = document.querySelectorAll(".active");

  console.log(allActive);
  createSheet();

  //!resetting the active element
  activeElement = null;
});

// sheetToggleContainer.addEventListener("click", (e) => {
//   if (e.target.tagName == "BUTTON") {
//   }
// });
