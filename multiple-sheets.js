function createSheet() {
  //creating sheet button
  let sheetBtn = document.createElement("button");
  sheetBtn.innerText = `Sheet ${++count}`;
  sheetBtn.className = "sheet-btn";
  sheetBtn.setAttribute("data-id", count);
  sheetBtn.classList.add("sheet-btn-active");
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

deleteSheetBtn.addEventListener("click", () => {
  let activeSheetBtn = document.querySelector(".sheet-btn-active");
  let allTables = document.querySelectorAll(".table-container");

  if (allTables.length == 1) {
    alert("this is the only sheet , can't delete");
    return;
  }

  allTables.forEach((el) => {
    if (
      activeSheetBtn.getAttribute("data-id") ==
      Number(el.getAttribute("data-id"))
    ) {
      el.remove();
      activeSheetBtn.remove();

      let firstRemainingBtn = document.querySelector(".sheet-btn");

      displayCurrSheet(Number(firstRemainingBtn.getAttribute("data-id")));
    }
  });
});

//!displaying Current Sheet
function displayCurrSheet(currIndex) {
  let allSheetBtns = document.querySelectorAll(".sheet-btn");
  let allTables = document.querySelectorAll(".table-container");

  allSheetBtns.forEach((el) => {
    if (currIndex == Number(el.getAttribute("data-id"))) {
      el.classList.add("sheet-btn-active");
    } else {
      el.classList.remove("sheet-btn-active");
    }
  });

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
  if (e.target.className == "sheet-btn") {
    displayCurrSheet(Number(e.target.getAttribute("data-id")));
  }
});
