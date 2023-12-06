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

  let cellsStyleMap = new Map();

  //cellContainer => whole 50x26 cells
  // cellContainer.addEventListener("click", (e) => {
  //   activeElement = e.target;

  //   let selectedID = activeElement.getAttribute("data-id");
  //   cellDisplay.innerText = selectedID;

  //   //creating style object of that cell for the first time
  //   if (cellsStyleMap.get(selectedID) === undefined) {
  //     cellsStyleMap.set(selectedID, defaultStyle);
  //   }

  //   //set the current values of the cell in the form options
  //   setFormOptions(cellsStyleMap.get(selectedID));

  //   //the current values of the cell is set in form,
  //   //now to adding background colors to form options for the selected cell
  //   toggleFormBackground();
  // });

  //function called when user clicks on the cell
  //function called when any change in form happened
  function toggleFormBackground() {
    //getting active cell style object
    let cellstyleobject = cellsStyleMap.get(
      activeElement.getAttribute("data-id")
    );

    for (const [key, value] of Object.entries(cellstyleobject)) {
      //for bold , italic and undeline
      //these three options have a class bg-change in html

      //using ?[optional chaining] => to handle undefined value from (form[key].classList = undefined)
      if (form[key].classList?.contains("bg-change")) {
        if (value == true) {
          form[key].nextElementSibling.style.backgroundColor = "red";
        } else {
          form[key].nextElementSibling.style.backgroundColor = "";
        }
      }

      if (value == "left" || value == "center" || value == "right") {
        //for radio buttons
        //form[key] results a radioNodelist
        //to convert radio node list to array we use Array.from()
        Array.from(form[key]).forEach((el) => {
          if (el.checked) {
            el.nextElementSibling.style.backgroundColor = "red";
          } else {
            el.nextElementSibling.style.backgroundColor = "";
          }
        });
      }

      //!nextElementSibling is used because the checkboxes are hid
    }
  }

  form.addEventListener("change", () => {
    onFormChange(cellsStyleMap);

    //any change in form have to apply in  options
    toggleFormBackground();
  });

  // cellContainer => whole 50x26 cells
  cellContainer.addEventListener("click", (e) => {
    onCellClick(e, cellsStyleMap);

    //the current values of the cell is set in form,
    //now to adding background colors to form options for the selected cell
    toggleFormBackground();
  });
}
