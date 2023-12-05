function onFormChange(cellsStyleMap) {
  if (!activeElement) {
    alert("please select a cell to make changes");
    form.reset();
    return;
  }

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

  //setting changed values from the form in selected cellstyleobject in cellsStyleMap

  cellsStyleMap.set(activeId, appliedCellStyleObj);

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
