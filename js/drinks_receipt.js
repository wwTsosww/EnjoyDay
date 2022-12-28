//receipt
let receiptIcon = document.querySelector("#receipt-icon");
let receipt = document.querySelector(".receipt");
let closeReceipt = document.querySelector("#close-receipt");
//open
receiptIcon.onclick = () => {
  receipt.classList.add("active");
};
//close
closeReceipt.onclick = () => {
  receipt.classList.remove("active");
};

//receipt working javascript
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// making function
function ready() {
  // remove menu from receipt
  var removeReceiptButtons = document.getElementsByClassName("receipt-remove");
  console.log(removeReceiptButtons);
  for (var i = 0; i < removeReceiptButtons.length; i++) {
    var button = removeReceiptButtons[i];
    button.addEventListener("click", removeReceiptMenu);
  }
  // quantity changes
  var quantityInputs = document.getElementsByClassName("receipt-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // add to receipt
  var addReceipt = document.getElementsByClassName("add-receipt");
  for (var i = 0; i < addReceipt.length; i++) {
    var button = addReceipt[i];
    button.addEventListener("click", addReceiptClicked);
  }
  // check out button
  document
    .getElementsByClassName("btn-check")[0]
    .addEventListener("click", checkButtonClicked);
}

// check out button
function checkButtonClicked() {
  alert("Thank You. Your order is already checked out.");
  var receiptContent = document.getElementsByClassName("receipt-content")[0];
  while (receiptContent.hasChildNodes()) {
    receiptContent.removeChild(receiptContent.firstChild);
  }
  updateTotal();
}

// remove menu from receipt
function removeReceiptMenu(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}
// quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// add to receipt
function addReceiptClicked(event) {
  var button = event.target;
  var topMenu = button.parentElement;
  var title = topMenu.getElementsByClassName("menu-title")[0].innerText;
  var price = topMenu.getElementsByClassName("price")[0].innerText;
  var menuImg = topMenu.getElementsByClassName("menu-img")[0].src;
  addMenuToReceipt(title, price, menuImg);
  updateTotal();
}

function addMenuToReceipt(title, price, menuImg) {
  var receiptMenuBox = document.createElement("div");
  receiptMenuBox.classList.add("receipt-box");
  var receiptMenu = document.getElementsByClassName("receipt-content")[0];
  var receiptMenuNames = receiptMenu.getElementsByClassName("menu-title");
  for (var i = 0; i < receiptMenuNames.length; i++) {
    if (receiptMenuNames[i].innerText == title) {
      alert("You have already add this menu to receipt.");
      return;
    }
  }
  var receiptBoxContent = `
                    <img src="${menuImg}" alt="" class="receipt-img">
                        <div class="detail-box">
                            <div class="menu-title">${title}</div>
                            <div class="receipt-price">${price}</div>
                            <input type="number" value="1" class="receipt-quantity">
                    </div>
                    <!-- remove receipt -->
                    <i class='bx bxs-trash-alt receipt-remove'></i>`;
  receiptMenuBox.innerHTML = receiptBoxContent;
  receiptMenu.append(receiptMenuBox);
  receiptMenuBox
    .getElementsByClassName("receipt-remove")[0]
    .addEventListener("click", removeReceiptMenu);
  receiptMenuBox
    .getElementsByClassName("receipt-quantity")[0]
    .addEventListener("change", quantityChanged);
}

// update total
function updateTotal() {
  var receiptContent = document.getElementsByClassName("receipt-content")[0];
  var receiptBoxes = receiptContent.getElementsByClassName("receipt-box");
  var total = 0;
  for (var i = 0; i < receiptBoxes.length; i++) {
    var receiptBox = receiptBoxes[i];
    var priceElement = receiptBox.getElementsByClassName("receipt-price")[0];
    var quantityElement = receiptBox.getElementsByClassName("receipt-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("THB", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
    document.getElementsByClassName("total-price")[0].innerText = "THB " + total;
}