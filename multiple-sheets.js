function createSheet() {
  //creating sheet button
  let sheetBtn = document.createElement("button");
  sheetBtn.innerText = `Sheet ${++count}`;
  sheetBtn.className = "sheet-btn";
  sheetBtn.setAttribute("data-id", count);
  sheetBtn.classList.add("test");
  sheetToggleContainer.appendChild(sheetBtn);

  //passing current count[index]
  sheet(count);
}

//initial render
createSheet();

function testing() {}

createSheetBtn.addEventListener("click", (e) => {
  createSheet();

  //!resetting the active element[very important!!!!!]
  activeElement = null;

  //display current sheet
  displayCurrSheet(count);
});

//!displaying Current Sheet
function displayCurrSheet(currIndex) {
  let allSheetBtns = document.querySelectorAll(".sheet-btn");
  let allTables = document.querySelectorAll(".table-container");

  allSheetBtns.forEach((el) => {
    if (currIndex == Number(el.getAttribute("data-id"))) {
      el.classList.add("test");
    } else {
      el.classList.remove("test");
    }
  });

  allTables.forEach((el) => {
    console.log(el);
    if (currIndex !== Number(el.getAttribute("data-id"))) {
      el.classList.add("hide");
    } else {
      el.classList.remove("hide");
    }
  });
}

//!toggle between sheets function
sheetToggleContainer.addEventListener("click", (e) => {
  if (
    e.target.tagName == "BUTTON" &&
    e.target.className !== "create-sheet-btn"
  ) {
    displayCurrSheet(Number(e.target.getAttribute("data-id")));
  }
});
