//variables

url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
cardText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, id vel. Quod animi quibusdam numquam amet molestiae qui consequuntur similique perspiciatis, est provident assumenda aspernatur illum officiis voluptas ipsa voluptatum.";
let data;
var order = new Map();
let orderTotal = 0;

//fetch

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    data = res;
    createCards(0);
    let cancelOrder = document.getElementById("cancelOrder");
    cancelOrder.onclick = function () {
      order = new Map();
      orderTotal = 0;
      let items = document.getElementById("shopItems");
      items.innerText = "0 items";
      renderChekout();
    };
  });

//functions

function createCards(index) {
  const div = document.getElementById("cards");
  div.innerHTML = "";
  const div2 = document.getElementById("checkout");
  div2.innerHTML = "";
  let titleDiv = document.createElement("div");
  titleDiv.className = "text-center";
  let tittle = document.createElement("h1");
  tittle.innerText = data[index]["name"];
  titleDiv.appendChild(tittle);
  let hr = document.createElement("hr");
  div.appendChild(titleDiv);
  div.appendChild(hr);
  let grid = document.createElement("div");
  grid.className = "card-group";
  let i = 0;
  while (i < data[index]["products"].length) {
    let container = document.createElement("div");
    container.className = "col-3";
    container.style = "padding: 6px;";

    let card = document.createElement("div");
    card.className = "card";
    card.style = "margin-bottom:20px;";

    let img = document.createElement("img");
    img.src = data[index]["products"][i]["image"];
    img.className = "card-img-top cardimg";
    img.style = "height: 12rem;";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerText = data[index]["products"][i]["name"];
    title.className = "card-title";

    let price = document.createElement("h5");
    price.innerText = "$" + data[index]["products"][i]["price"];
    price.className = "card-text font-weight-bold";

    let text = document.createElement("p");
    text.innerText = cardText;
    text.className = "card-text";

    let footer = document.createElement("footer");

    let btn = document.createElement("p");
    btn.innerText = "Add to car";
    btn.className = "btn btn-secondary cardbtn";

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(price);
    footer.appendChild(btn);
    cardBody.appendChild(footer);
    card.appendChild(img);
    card.appendChild(cardBody);
    container.appendChild(card);
    grid.appendChild(container);

    i++;
  }

  div.appendChild(grid);

  $(".cardbtn").each(function () {
    var btn = this;
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let items = document.getElementById("shopItems");
      let text = items.innerText;
      let num = parseInt(text.split(" "[0]));
      num += 1;
      items.innerText = num + " items";
      cardBody = btn.parentElement.parentElement;
      item = cardBody.childNodes[0].innerText;
      price = parseFloat(cardBody.childNodes[2].innerText.split("$")[1]);
      orderTotal += price;
      if (order.get(item) == null) {
        order.set(item, [1, price]);
      } else {
        temp = order.get(item);
        temp[0] += 1;
        order.set(item, temp);
      }
    });
  });
}

function renderChekout() {
  const div = document.getElementById("checkout");
  div.innerHTML = "";
  const div2 = document.getElementById("cards");
  div2.innerHTML = "";
  let titleDiv = document.createElement("div");
  titleDiv.className = "text-center";
  let tittle = document.createElement("h1");
  tittle.innerText = "Order detail";
  titleDiv.appendChild(tittle);
  let hr = document.createElement("hr");
  div.appendChild(titleDiv);
  div.appendChild(hr);
  let table = document.createElement("table");
  table.className = "table table-striped";
  let tableHead = document.createElement("thead");
  let tableHeadRow = document.createElement("tr");
  let headers = [
    "item",
    "Qty",
    "Description",
    "Unit Price",
    "Amount",
    "Modify",
  ];
  for (header of headers) {
    let tableHeader = document.createElement("th");
    tableHeader.scope = "col";
    tableHeader.innerText = header;
    tableHeadRow.appendChild(tableHeader);
  }
  tableHead.appendChild(tableHeadRow);
  table.appendChild(tableHead);
  let tableBody = document.createElement("tbody");
  let i = 1;
  for (let key of order.keys()) {
    let tableRow = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let rowItem =
        j == 0 ? document.createElement("th") : document.createElement("td");
      switch (j) {
        case 0:
          rowItem.innerText = i;
          rowItem.scope = "row";
          break;
        case 1:
          rowItem.innerText = order.get(key)[0];
          break;
        case 2:
          rowItem.innerText = key;
          break;
        case 3:
          rowItem.innerText = order.get(key)[1];
          break;
        case 4:
          rowItem.innerText = (order.get(key)[0] * order.get(key)[1]).toFixed(
            2
          );
          break;
        default:
          break;
      }

      tableRow.appendChild(rowItem);
    }
    i++;
    let btnsItem = document.createElement("td");
    let btnsGrid = document.createElement("div");
    btnsGrid.className = "d-grid gap-2";
    let plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-secondary";
    plusBtn.style = "margin: 2px";
    plusBtn.type = "button";
    plusBtn.innerText = "+";

    let lessBtn = document.createElement("button");
    lessBtn.className = "btn btn-secondary";
    lessBtn.style = "margin: 2px";
    lessBtn.type = "button";
    lessBtn.innerText = "-";

    btnsGrid.appendChild(plusBtn);
    btnsGrid.appendChild(lessBtn);
    btnsItem.appendChild(btnsGrid);
    tableRow.appendChild(btnsItem);
    tableBody.appendChild(tableRow);
    //events
    plusBtn.onclick = function () {
      let orderItem = order.get(tableRow.childNodes[2].innerText);
      orderItem[0] += 1;
      order.set(tableRow.childNodes[2].innerText, orderItem);
      tableRow.childNodes[1].innerText = orderItem[0];
      tableRow.childNodes[4].innerText = (orderItem[0] * orderItem[1]).toFixed(
        2
      );
      let items = document.getElementById("shopItems");
      let text = items.innerText;
      let num = parseInt(text.split(" "[0]));
      num += 1;
      items.innerText = num + " items";
      orderTotal += orderItem[1];
      let subtotalText = document.getElementById("subtotalText");
      subtotalText.innerText = "Total: $" + orderTotal.toFixed(2);
    };
    lessBtn.onclick = function () {
      let orderItem = order.get(tableRow.childNodes[2].innerText);
      orderItem[0] -= 1;
      if (orderItem[0] < 1) {
        order.delete(tableRow.childNodes[2].innerText);
        renderChekout(); //INCEPTION
      } else {
        order.set(tableRow.childNodes[2].innerText, orderItem);
        tableRow.childNodes[1].innerText = orderItem[0];
        tableRow.childNodes[4].innerText = (
          orderItem[0] * orderItem[1]
        ).toFixed(2);
      }
      let items = document.getElementById("shopItems");
      let text = items.innerText;
      let num = parseInt(text.split(" "[0]));
      num -= 1;
      items.innerText = num + " items";
      orderTotal -= orderItem[1];
      let subtotalText = document.getElementById("subtotalText");
      subtotalText.innerText = "Total: $" + orderTotal.toFixed(2);
    };
  }
  table.appendChild(tableBody);
  div.appendChild(table);
  let subtotalAndChekout = document.createElement("div");
  subtotalAndChekout.className = "row";
  let subtotalAndChekoutCol = document.createElement("div");
  subtotalAndChekoutCol.className = "col";
  let subtotal = document.createElement("span");
  subtotal.className = "float-left";
  let subtotalText = document.createElement("p");
  subtotalText.className = "font-weight-bold";
  subtotalText.id = "subtotalText";
  subtotalText.innerText = "Total: $" + orderTotal.toFixed(2);
  subtotal.appendChild(subtotalText);
  let checkConfirm = document.createElement("span");
  checkConfirm.className = "float-right";

  let btnsGrid = document.createElement("div");
  btnsGrid.className = "d-grid gap-2";
  let cancelBtn = document.createElement("button");
  cancelBtn.className = "btn btn-danger";
  cancelBtn.id = "cancelBtn";
  cancelBtn.style = "margin: 2px";
  cancelBtn.type = "button";
  cancelBtn.dataset.toggle = "modal";
  cancelBtn.dataset.target = "#cancelModal";
  cancelBtn.innerText = "Cancel";

  let confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-success";
  confirmBtn.id = "SICAPITANESTAMOSLISTOS";
  confirmBtn.style = "margin: 2px";
  confirmBtn.type = "button";
  confirmBtn.innerText = "Confirm order";
  confirmBtn.onclick = function () {
    var orderFinal = [];
    i = 1;
    for (let key of order.keys()) {
      var orderItem = new Object();
      orderItem.item = i;
      orderItem.quantity = order.get(key)[0];
      orderItem.description = key;
      orderItem.unitPrice = order.get(key)[1];
      i++;
      orderFinal.push(orderItem);
    }
    console.log(orderFinal);
  };

  btnsGrid.appendChild(cancelBtn);
  btnsGrid.appendChild(confirmBtn);
  checkConfirm.appendChild(btnsGrid);
  subtotalAndChekoutCol.appendChild(subtotal);
  subtotalAndChekoutCol.appendChild(checkConfirm);
  subtotalAndChekout.appendChild(subtotalAndChekoutCol);
  div.appendChild(subtotalAndChekout);
}

//events
const btn1 = document.getElementById("1");
btn1.addEventListener("click", function (event) {
  event.preventDefault();
  createCards(0);
});

const btn2 = document.getElementById("2");
btn2.addEventListener("click", function (event) {
  event.preventDefault();
  createCards(1);
});

const btn3 = document.getElementById("3");
btn3.addEventListener("click", function (event) {
  event.preventDefault();
  createCards(2);
});

const btn4 = document.getElementById("4");
btn4.addEventListener("click", function (event) {
  event.preventDefault();
  createCards(3);
});

const btn5 = document.getElementById("5");
btn5.addEventListener("click", function (event) {
  event.preventDefault();
  createCards(4);
});

const carrito = document.getElementById("carrito");
carrito.addEventListener("click", function (event) {
  event.preventDefault();
  renderChekout();
});
