const chosenProducts = getById("chosenProducts");
const totalPriceElement = getById("totalPrice");
const discountPercentage = 20;

// _____________
let total = 0;
let countElement = 0;
let totalArray = [];

// Display selected products and calculate the price of them
function calculate(target) {
  countElement++;
  const price = priceTextIntoNumber(target);
  const title = getTitle(target);

  // total cost
  total += price;
  const newElement = createElement(
    "h4",
    { class: "font-semibold text-gray-500", id: "text" },
    title
  );

  // disable or enable (make purchase button)
  const purchaseButton = getById("makePurchase");

  if (total > 0) {
    purchaseButton.classList.remove("bg-gray-300");
    addClass(purchaseButton, "bg-primary-color");
    purchaseButton.removeAttribute("disabled");
  }
  totalArray.push(total);
  // ==================================
  if (total >= 200) {
    const couponCodeInput = getById("couponCodeInput");
    const couponButton = couponCodeInput.nextElementSibling;
    // const inputValue = couponCodeInput.value;
    couponButton.removeAttribute("disabled");

    // Making user understand disable or enable based on logic
    couponButton.classList.remove("bg-gray-300");
    addClass(couponButton, "bg-primary-color");
  }
  chosenProducts.appendChild(newElement);
  const badge = getById("badge");
  badge.innerText = countElement;
  addClass(badge, "bg-primary-color text-white");

  if (countElement === 6) {
    addClass(chosenProducts, "h-[160px] overflow-auto");
  }

  totalPriceElement.className += "text-black font-bold";
  totalPriceElement.innerText = total.toFixed(2);
}

function showCart() {
  const cartList = getById("cartList");
  // cartList.classList.remove("hidden");
  cartList.classList.remove("w-[0%]");

  // Trigger a reflow before applying the transition
  void cartList.offsetWidth;

  // Add the class to make the cart visible
  cartList.classList.toggle("hidden");
  cartList.classList.toggle("cartVisibility");
}

// ============== apply button ================
const ApplyButton = getById("Apply-btn");

ApplyButton.onclick = function () {
  const couponCodeInput = getById("couponCodeInput");

  const inputValue = couponCodeInput.value;
  couponCodeInput.value = "";
  const isValid = inputValue === "SELL200";
  console.log(isValid);

  if (isValid) {
    discount(total, discountPercentage);
  } else {
    alert("You've pressed wrong code");
  }
};

// Discount section

function discount(totalPrice, discountPercentage) {
  // Final Price = Original Price - (Original Price * Discount Percentage / 100)
  const discountElemnet = getById("discountElemnet");
  const total = getById("total");
  addClass(total, " text-black font-bold");
  addClass(discountElemnet, " text-black font-bold");
  totalPriceElement.className +=
    " line-through decoration-red-500 decoration-4";
  const discountedPrice = (totalPrice * discountPercentage) / 100;

  discountElemnet.innerText = discountedPrice;
  total.innerText = totalPrice - discountedPrice;

  totalPrice = 0;
  discountedPrice = 0;
}

// reset the value
const removeEle = getById("reset");
removeEle.onclick = reset;

function reset() {
  // Clear the total price and discount elements
  total = 0;
  const totalPrice = getById("totalPrice");
  totalPrice.removeAttribute("class");
  addClass(totalPrice, "ml-2");
  totalPrice.innerText = "000.00";

  const discountElemnet = getById("discountElemnet");
  discountElemnet.removeAttribute("class");
  addClass(discountElemnet, "ml-2");
  discountElemnet.innerText = "000.00";

  const totalElement = getById("total");
  totalElement.removeAttribute("class");
  addClass(totalElement, "ml-2");
  totalElement.innerText = "000.00";

  // Remove chosen products and their details
  while (chosenProducts.firstChild) {
    chosenProducts.removeChild(chosenProducts.firstChild);
    countElement = 0;
    chosenProducts.classList.remove("h-[160px]");
  }

  // Disable the button when reset
  const applyBtn = getById("Apply-btn");
  applyBtn.classList.remove("bg-primary-color");
  addClass(applyBtn, "bg-gray-300");
  applyBtn.setAttribute("disabled", "true");

  const makePurchase = getById("makePurchase");
  makePurchase.classList.remove("bg-primary-color");
  addClass(makePurchase, "bg-gray-300");
  makePurchase.setAttribute("disabled", "true");
}
