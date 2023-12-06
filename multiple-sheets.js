//initial render
createSheet();

function createSheet() {
  //creating sheet button
  let sheetBtn = document.createElement("button");
  sheetBtn.innerText = `Sheet ${++count}`;
  sheetBtn.className = "sheet-btn";
  sheetBtn.setAttribute("data-id", count);

  //the created button should be always active
  sheetBtn.classList.add("sheet-btn-active");

  sheetToggleContainer.appendChild(sheetBtn);

  //passing current count[index] to create a sheet
  sheet(count);
}

//!displaying Current Sheet
function displayCurrSheet(currIndex) {
  let allSheetBtns = document.querySelectorAll(".sheet-btn");
  let allTables = document.querySelectorAll(".table-container");

  //display active button
  allSheetBtns.forEach((el) => {
    if (currIndex == Number(el.getAttribute("data-id"))) {
      el.classList.add("sheet-btn-active");
    } else {
      el.classList.remove("sheet-btn-active");
    }
  });

  //display active table
  allTables.forEach((el) => {
    if (currIndex !== Number(el.getAttribute("data-id"))) {
      el.classList.add("hide");
    } else {
      el.classList.remove("hide");
    }
  });
}

//EventListeners

createSheetBtn.addEventListener("click", (e) => {
  createSheet();

  //!resetting the active element[very important!!!!!]
  activeElement = null;

  //display current sheet
  displayCurrSheet(count);
});

deleteSheetBtn.addEventListener("click", () => {
  let activeSheetBtn = document.querySelector(".sheet-btn-active");
  let allTables = document.querySelectorAll(".table-container");

  //if its the last table dont let the user delete
  if (allTables.length == 1) {
    alert("last sheet cannot be deleted");
    return;
  }

  allTables.forEach((table) => {
    if (
      activeSheetBtn.getAttribute("data-id") ==
      Number(table.getAttribute("data-id"))
    ) {
      //removing table and activeSheetButton from DOM
      table.remove();
      activeSheetBtn.remove();

      //after deleting get the first sheet button and make it active
      let firstRemainingBtn = document.querySelector(".sheet-btn");

      //pass the id of button to display corresponding sheet
      displayCurrSheet(Number(firstRemainingBtn.getAttribute("data-id")));
    }
  });
});

//!toggle between sheets function
sheetToggleContainer.addEventListener("click", (e) => {
  if (e.target.className == "sheet-btn") {
    displayCurrSheet(Number(e.target.getAttribute("data-id")));
  }
});
