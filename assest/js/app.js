const menuIcon = document.getElementById("menuIcon"),
  menu = document.getElementById("menu");
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("links-toggle");
});
const leftArrow = document.querySelector(".left-arrow"),
  rightArrow = document.querySelector(".right-arrow");
let landing = document.querySelector(".landing"),
  imgArr = [
    "landing-1.jpg",
    "landing-2.jpg",
    "landing-3.jpg",
    "landing-4.jpg",
    "landing-5.jpg",
    "landing-6.jpg",
    "landing-7.jpg",
    "landing-8.jpg",
  ];
let id = 0;
rightArrow &&
  rightArrow.addEventListener("click", () => {
    id > imgArr.length - 1 && (id = 0),
      (landing.style.cssText = `background-image: url(./assest/img/${imgArr[id]});`),
      id++;
  }),
  leftArrow &&
    leftArrow.addEventListener("click", () => {
      id < 0 && (id = imgArr.length - 1),
        (landing.style.cssText = `background-image: url(./assest/img/${imgArr[id]});`),
        id--;
    }),
  landing &&
    setInterval(() => {
      id > imgArr.length - 1 && (id = 0),
        (landing.style.cssText = `background-image: url(./assest/img/${imgArr[id]});`),
        id++;
    }, 7e3),
  fetch("https://route-ecommerce.onrender.com/api/v1/products")
    .then((t) => t.json())
    .then((t) => {
      t.data.forEach((t) => {
        "Electronics" == t.category.name &&
          (addToTrending(t), addElectronics(t)),
          "Men's Fashion" == t.category.name && addToMenPage(t),
          "Women's Fashion" == t.category.name && addToWomenPage(t),
          t.category.name && addAllProducts(t);
      });
    });
let trending = document.querySelector(".trending .content");
function addToTrending(t) {
  trending &&
    (trending.innerHTML += `
      <div class="box">
      <i onclick="checkHeartId(this.id)" id="${t._id}" class="fa-solid fa-heart"></i>
      <div  class="img-box">
    <img onclick="checkProId(this.id)" id="${t._id}" src="${t.imageCover}" alt="trend" />
  </div>
  <p>${t.title}</p>
  <span>Price : ${t.price}$</span>
  <button onclick="checkCartId(this.id)" id="${t._id}" class="button">Add To Cart</button>
  </div>
  `);
}
let product = document.querySelector(".product .content");
function addToMenPage(t) {
  product &&
    (product.innerHTML += `
      <div class="box">
      <i onclick="checkHeartId(this.id)" id="${t._id}"  class="fa-solid fa-heart"></i>
      <div class="img-box">
    <img onclick="checkProId(this.id)" id="${t._id}"  src="${t.imageCover}" alt="" />
  </div>
  <p>${t.title}</p>
  <span>Price : ${t.price}$</span>
  <button onclick="checkCartId(this.id)" id="${t._id}"  class="button">Add To Cart</button>
  </div>
  `);
}
let womenProduct = document.querySelector(".women-product .content");
function addToWomenPage(t) {
  womenProduct &&
    (womenProduct.innerHTML += `
      <div class="box">
      <i onclick="checkHeartId(this.id)" id="${t._id}"  class="fa-solid fa-heart"></i>
      <div class="img-box">
    <img onclick="checkProId(this.id)" id="${t._id}"  src="${t.imageCover}" alt="" />
  </div>
  <p>${t.title}</p>
  <span>Price : ${t.price}$</span>
  <button onclick="checkCartId(this.id)" id="${t._id}"  class="button">Add To Cart</button>
  </div>
  `);
}
let allPro = document.querySelector(".shop .content");
function addAllProducts(t) {
  allPro &&
    (allPro.innerHTML += `
      <div class="box">
      <i  onclick="checkHeartId(this.id)" id="${t._id}"  class="fa-solid fa-heart"></i>
      <div   class="img-box">
    <img onclick="checkProId(this.id)" id="${t._id}"  src="${t.imageCover}" alt="" />
  </div>
  <p>${t.title}</p>
  <span>Price : ${t.price}$</span>
  <button onclick="checkCartId(this.id)" id="${t._id}"  class="button">Add To Cart</button>
  </div>
  `);
}
let electronic = document.querySelector(".electronic .content");
function addElectronics(t) {
  electronic &&
    (electronic.innerHTML += `
    <div class="box">
    <i onclick="checkHeartId(this.id)" id="${t._id}"  class="fa-solid fa-heart"></i>
      <div  class="img-box">
        <img onclick="checkProId(this.id)" id="${t._id}"  src="${t.imageCover}" alt="" />
      </d>
    <p>${t.title}</p>
    <span>Price : ${t.price}$</span>
    <button onclick="checkCartId(this.id)" id="${t._id}"  class="button">Add To Cart</button>
  </div>
  `);
}
function checkCartId(t) {
  fetch("https://route-ecommerce.onrender.com/api/v1/products")
    .then((t) => t.json())
    .then((e) => {
      e.data.forEach((e) => {
        e._id == t && addToCart(e);
      });
    });
}
let arrCart = [];
window.localStorage.getItem("cart") &&
  (arrCart = JSON.parse(window.localStorage.getItem("cart")));
let cart = document.querySelector(".cart .cart-pro .inner"),
  total = document.getElementById("total"),
  totalPlus = 0,
  cartCount = document.querySelector(".cart .count");
function addToCart(t) {
  cart.innerHTML += `
  <div class="my-products">
  <img src=${t.imageCover} alt="image" />
  <p class="title">${t.title}</p>
  <p class="price">${t.price}$</p>
  <i class="fa-solid fa-trash"></i>
  </div>
  `;
  let e = { image: t.imageCover, title: t.title, price: t.price };
  arrCart.push(e),
    window.localStorage.setItem("cart", JSON.stringify(arrCart)),
    getTotal(),
    (cartCount.innerHTML = arrCart.length),
    showData();
}
function showData() {
  cart.innerHTML = "";
  for (let t = 0; t < arrCart.length; t++)
    cart.innerHTML += `
    <div class="my-products">
    <img src=${arrCart[t].image} alt="image" />
    <p class="title">${arrCart[t].title}</p>
    <p class="price">${arrCart[t].price}$</p>
    <i onclick="deleteData(${t})" class="fa-solid fa-trash"></i>
    </div>
    `;
  getTotal(), (cartCount.innerHTML = arrCart.length);
}
function getTotal() {
  let t = arrCart.reduce((t, e) => t + e.price, 0);
  total.innerHTML = `${t}$`;
}
showData();
let cartIcon = document.querySelector(".cart i"),
  cartWindow = document.querySelector(".cart .cart-pro");
function deleteData(t) {
  arrCart.splice(t, 1),
    (window.localStorage.cart = JSON.stringify(arrCart)),
    showData();
}
function checkHeartId(t) {
  fetch("https://route-ecommerce.onrender.com/api/v1/products")
    .then((t) => t.json())
    .then((e) => {
      e.data.forEach((e) => {
        e._id == t && addToHeart(e);
      });
    });
}
cartIcon.addEventListener("click", () => {
  cartWindow.classList.toggle("open-close"),
    heartWindow.classList.remove("open-close-heart");
});
let arrHeart = [];
window.localStorage.getItem("heart") &&
  (arrHeart = JSON.parse(window.localStorage.getItem("heart")));
let heart = document.querySelector(".liked .liked-pro"),
  heartCount = document.querySelector(".liked span");
function addToHeart(t) {
  heart.innerHTML += `
    <div class="product">
    <img src="${t.imageCover}" alt="" />
    <div class="title">${t.title}</div>
    <button onclick="checkCartId(this.id)" id="${t._id}"  class="button">Add To Cart</button>
    <button class="delete">Delete</button>
    </div>
`;
  let e = { id: t._id, image: t.imageCover, title: t.title };
  arrHeart.push(e),
    window.localStorage.setItem("heart", JSON.stringify(arrHeart)),
    showDataHeart(),
    (heartCount.innerHTML = arrHeart.length);
}
function showDataHeart() {
  heart.innerHTML = "";
  for (let t = 0; t < arrHeart.length; t++)
    heart.innerHTML += `
    <div class="product">
    <img src="${arrHeart[t].image}" alt="" />
    <div class="title">${arrHeart[t].title}</div>
    <button onclick="checkCartId(this.id)" id="${arrHeart[t].id}" class="button">Add To Cart</button>
    <button onclick="deleteHeart(${t})" class="delete">Delete</button>
    </div>
    `;
  heartCount.innerHTML = arrHeart.length;
}
function deleteHeart(t) {
  arrHeart.splice(t, 1),
    (window.localStorage.heart = JSON.stringify(arrHeart)),
    showDataHeart();
}
showDataHeart();
let btnHeart = document.querySelector(".liked>i"),
  heartWindow = document.querySelector(".liked .liked-pro");
function checkProId(t) {
  fetch("https://route-ecommerce.onrender.com/api/v1/products")
    .then((t) => t.json())
    .then((e) => {
      e.data.forEach((e) => {
        e._id == t && addProToAbout(e);
      });
    });
}
btnHeart.addEventListener("click", () => {
  heartWindow.classList.toggle("open-close-heart"),
    cartWindow.classList.remove("open-close");
});
let aboutProWindow = document.querySelector(".about-product .container"),
  aboutProduct = document.querySelector(".about-product"),
  imagesCount = document.querySelector(
    ".about-product .container .left .images"
  );
function openCloseAbout() {
  aboutProduct.classList.remove("open");
}
function addProToAbout(t) {
  aboutProduct.classList.add("open"),
    (aboutProWindow.innerHTML = `
    <div class="left">
    <div class="main-img">
      <img src="${t.imageCover}" alt="main-image" />
      </div>
      <div class="images">

      </div>
      </div>
      <div class="right">
      <i onclick="openCloseAbout()" class="fa-solid fa-xmark"></i>
      <h2>${t.title}</h2>
      <p>${t.description}</p>
      <span>Price:${t.price}$</span>
      <button onclick="checkCartId(this.id)" id="${t._id}" class="button">Add To Cart</button>
      </div>
      `);
  let e = document.querySelector(".about-product .container .left .images"),
    r = t.images;
  for (let i = 0; i < r.length; i++)
    e.innerHTML += `
          <img src="${r[i]}" alt="main-image" />
      `;
  let a = document.querySelectorAll(
      ".about-product .container .left .images img"
    ),
    o = document.querySelector(".about-product .container .left .main-img");
  a.forEach((t) => {
    t.addEventListener("click", (t) => {
      o.innerHTML = `<img src="${t.target.src}" alt="test" />`;
    });
  });
}
