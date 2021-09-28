url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

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

let data;

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    data = res;
    console.log(data[0]["name"]);
  });

function createCards(index) {
  const div = document.getElementById("cards");
  div.innerHTML = "";
  let tittle = document.createElement("h1");
  tittle.className = data[index]["name"];
  div.appendChild(tittle);
  let i = 0;
  while (i < 4) {
    let card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";

    let img = document.createElement("img");
    img.src = data[index]["products"][i]["image"];
    img.className = "card-img-top";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let title = document.createElement("h5");
    title.innerText = data[index]["products"][i]["name"];
    title.className = "card-title";

    let price = document.createElement("h5");
    price.innerText = data[index]["products"][i]["price"];
    price.className = "card-text";

    let text = document.createElement("p");
    text.innerText = data[index]["products"][i]["description"];
    text.className = "card-text";

    let btn = document.createElement("p");
    btn.innerText = "Add to car";
    btn.className = "btn btn-primary cardbtn";

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(price);
    cardBody.appendChild(btn);
    card.appendChild(img);
    card.appendChild(cardBody);
    div.appendChild(card);
    i++;
  }

  $(".cardbtn").each(function () {
    var btn = this;
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let items = document.getElementById("shopItems");
      let text = items.innerText;
      let num = parseInt(text.split(" "[0]));
      num += 1;
      items.innerText = num + " items";
    });
  });
}
