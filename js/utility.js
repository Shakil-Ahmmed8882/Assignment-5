// get Element by id
function getById(id) {
  return document.getElementById(id);
}

// convert the string price into number
function priceTextIntoNumber(target) {
  const priceArray = target.children[1].children[4].innerText.split(" ");
  const priceString = priceArray[0];
  const priceNumber = parseFloat(priceString);

  return priceNumber;
}

// get the card title
function getTitle(target) {
  return target.children[1].children[3].innerText;
}

// create element
function createElement(tagName, attributes = {}, text) {
  const element = document.createElement(tagName);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  // Adding a class for styling
  element.innerHTML = `<p class='inline-block text-green-300'>${countElement}</p>.  ${text}`;

  return element;
}

// add class
function addClass(element, c) {
  element.className += " " + c;
}
