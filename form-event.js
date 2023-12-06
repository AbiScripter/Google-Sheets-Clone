function onFormChange(cellsStyleMap) {
  let activeId = activeElement.getAttribute("data-id");

  //any change in form creates a new object with all form values
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

  //placing changed values from the form in active cellstyleobject in StyleMap
  cellsStyleMap.set(activeId, appliedCellStyleObj);

  //any change in form have to apply in form options
  //styling the form based on current options
  toggleFormBackground();

  applyCellStyle(activeElement, cellsStyleMap.get(activeId));

  function applyCellStyle(cell, styleObj) {
    cell.style.fontSize = `${styleObj.fontSize}px`;
    cell.style.fontFamily = styleObj.fontFamily;
    cell.style.backgroundColor = styleObj.bgColor;
    cell.style.color = styleObj.color;
    cell.style.textAlign = styleObj.textAlign;

    //all these above options results to a specific value[10px,arial,red...etc]
    //but these 3 options below results either true or false
    //so we can't set these value like other options [fontStyle = true || false  => not valid]
    //so if its true set to its value else set to ""

    cell.style.fontStyle = styleObj.italic ? "italic" : "";
    cell.style.textDecoration = styleObj.underline ? "underline" : "";
    cell.style.fontWeight = styleObj.bold ? "bold" : "";
  }
}

//this function called when user clicks on the cell
//this function called when any change in form happened
function toggleFormBackground() {
  console.log("yeahh");
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
        // form[key].nextElementSibling.style.backgroundColor = "red";
        form[key].nextElementSibling.classList.add("form-option-active");
      } else {
        // form[key].nextElementSibling.style.backgroundColor = "";
        form[key].nextElementSibling.classList.remove("form-option-active");
      }
    }

    if (value == "left" || value == "center" || value == "right") {
      //for radio buttons
      //form[key] results a radioNodelist
      //to convert radio node list to array we use Array.from()
      Array.from(form[key]).forEach((el) => {
        if (el.checked) {
          el.nextElementSibling.classList.add("form-option-active");
        } else {
          el.nextElementSibling.classList.remove("form-option-active");
        }
      });
    }

    //!nextElementSibling is used because the checkboxes are hid
  }
}
