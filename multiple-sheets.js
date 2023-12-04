function createSheet() {
  //creating sheet button
  let sheetBtn = document.createElement("button");
  sheetBtn.innerText = `Sheet ${++count}`;
  sheetBtn.className = "sheet-btn";
  sheetBtn.setAttribute("data-id", count);
  sheetToggleContainer.appendChild(sheetBtn);

  //passing current count[index]
  sheet(count);
}

//initial render
createSheet();

createSheetBtn.addEventListener("click", () => {
  createSheet();

  //!resetting the active element[very important!!!!!]
  activeElement = null;

  //display current sheet
  displayCurrSheet(count);
});

//!displaying Current Sheet
function displayCurrSheet(currIndex) {
  let allTables = document.querySelectorAll(".table-container");

  allTables.forEach((el) => {
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
