function onCellClick(e, cellsStyleMap) {
  console.log(e);
  activeElement = e.target;

  let selectedID = activeElement.getAttribute("data-id");
  cellDisplay.innerText = selectedID;

  //creating style object of that cell for the first time
  if (cellsStyleMap.get(selectedID) === undefined) {
    cellsStyleMap.set(selectedID, defaultStyle);
  }

  //set the current values of the cell in the form options
  setFormOptions(cellsStyleMap.get(selectedID));
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
