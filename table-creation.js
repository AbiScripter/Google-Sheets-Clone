const totalColumns = 26;
const totalRows = 50;

//!creating Alphabet columns

function createAlphabetRow(alphabetColContainer) {
  for (let i = 0; i <= totalColumns; i++) {
    const colBtn = document.createElement("p");
    if (i == 0) {
      colBtn.innerText = ``;
    } else {
      colBtn.innerText = `${String.fromCharCode(96 + i)}`.toUpperCase();
    }

    alphabetColContainer.appendChild(colBtn);
  }
}

//!creating Number columns

function createNumberRow(numberRowContainer) {
  for (let i = 0; i < totalRows; i++) {
    const rowBtn = document.createElement("p");
    rowBtn.innerText = i + 1;
    numberRowContainer.appendChild(rowBtn);
  }
}

//!creating Cells

function createCellRow(cellContainer) {
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
}
