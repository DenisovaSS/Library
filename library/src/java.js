//1. Humburger menu
const nav = document.querySelector(".nav"),
  overNav = document.querySelector(".overNav"),
  menuItem = document.querySelectorAll(".menu_item"),
  menuCross = document.querySelector(".menu_cross"),
  hamburger = document.querySelector(".humburger");
//add active
hamburger.addEventListener("click", () => {
  overNav.classList.add("overNav_active");
  nav.classList.add("nav_active");
});
//remove active
function menuRemove() {
  overNav.classList.remove("overNav_active");
  nav.classList.remove("nav_active");
}
//if press menuCross
menuCross.onclick = menuRemove;
//if press to avoid nav
overNav.onclick = menuRemove;
//if press to menu items
menuItem.forEach((item) => {
  item.onclick = menuRemove;
});

//2. Part for ABOUT(carousel)
const carousel = document.querySelector(".about_slider_section"),
  list = carousel.querySelector(".img_gallery"),
  listElems = carousel.querySelectorAll(".about_img"),
  allBtn = document.querySelectorAll(".about_wrapper_circle"),
  circles = document.querySelectorAll(".about_circle");
let dotIndex = 0;
let width = 479; // width picture + margin
let position = 0; // position ленты прокрутки
//for count slides
const thisSlide = (index) => {
  for (let circle of circles) {
    circle.classList.remove("about_circle_active");
  }
  if (index === 0) {
    document.querySelector(".about_slider_arrow_prev").style.pointerEvents =
      "none";
  } else {
    document.querySelector(".about_slider_arrow_prev").style.pointerEvents = "";
  }
  if (index === listElems.length - 1) {
    document.querySelector(".about_slider_arrow_next").style.pointerEvents =
      "none";
  } else {
    document.querySelector(".about_slider_arrow_next").style.pointerEvents = "";
  }
  circles[index].classList.add("about_circle_active");
};

//if use under buttons
for (let i = 0; i < allBtn.length; i++) {
  allBtn[i].onclick = function () {
    position = -i * width;
    list.style.marginLeft = position + "px";
    dotIndex = i;
    thisSlide(dotIndex);
  };
}
//if use arrows
document.querySelector(".about_slider_arrow_next").onclick = function () {
  position -= width;
  position = Math.max(position, -width * (listElems.length - 1));
  list.style.marginLeft = position + "px";
  //dots
  dotIndex++;
  dotIndex = Math.min(dotIndex, listElems.length - 1);
  thisSlide(dotIndex);
};
document.querySelector(".about_slider_arrow_prev").onclick = function () {
  position += width;
  position = Math.min(position, 0);
  list.style.marginLeft = position + "px";
  //dots
  dotIndex--;
  dotIndex = Math.max(dotIndex, 0);
  thisSlide(dotIndex);
};
//3.Part for favorites_book_shelf
const radioButtons = document.querySelectorAll('input[name="book-type"]');
const boxes = document.querySelectorAll(".section_favorites_book_shelf");

for (let i = 0; i < radioButtons.length; i++) {
  if (radioButtons[i].checked) {
    boxes[i].classList.add("section_favorites_book_shelf_checked");
  }
  radioButtons[i].addEventListener("change", () => {
    boxes.forEach((el) =>
      el.classList.remove("section_favorites_book_shelf_checked"),
    );
    boxes[i].classList.add("section_favorites_book_shelf_checked");
  });
}
//4. Part authorization menu when clicking on the user icon
// overNav = document.querySelector(".overNav"),
const logInMenuRegistr = document.querySelector(".dropMenu_register");
const logInMenu = document.querySelector(".dropMenuProfileNOAuth"),
  logo = document.querySelector(".menu_img"),
  logoTablet = document.querySelector(".menu_img_tablet"),
  modalRegister = document.querySelector(".modalRegister"),
  modalOver = document.querySelector(".modal");
logo.addEventListener("click", () => {
  logInMenu.classList.add("dropMenuProfileNOAuth_active");
  overNav.classList.add("overNav_active");
});
logoTablet.addEventListener("click", () => {
  logInMenu.classList.add("dropMenuProfileNOAuth_active");
  overNav.classList.add("overNav_active");
  nav.classList.remove("nav_active");
});
function dropMenuRemove() {
  logInMenu.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
}
overNav.onclick = dropMenuRemove;
////if press to dropMenu_register
logInMenuRegistr.addEventListener("click", () => {
  logInMenu.classList.toggle("dropMenuProfileNOAuth_active");
  overNav.classList.toggle("overNav_active");
  modalRegister.classList.add("modalRegister_active");
  modalOver.classList.add("modal_active");
});
//if press Sign Up
document
  .querySelector(".library_register_card_btn_sigh")
  .addEventListener("click", () => {
    modalRegister.classList.add("modalRegister_active");
    modalOver.classList.add("modal_active");
  });
//close register
let modalRegister_close = document.getElementById("modalRegister_close");
function removemModalRegister() {
  modalRegister.classList.remove("modalRegister_active");
  modalOver.classList.remove("modal_active");
}
//press cross
modalRegister_close.addEventListener("click", removemModalRegister);
//press avoid register
modalOver.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target === modalOver) {
    removemModalRegister();
  }
});
//localStorage
const formRegister = document.getElementById("register");
const formRegisterElemets = formRegister.elements;
const btnFormRegister = formRegister.querySelector('[ type="submit"]');

btnFormRegister.addEventListener("click", getInfo);
function getInfo() {
  for (let i = 0; i < formRegisterElemets.length; i++) {
    if (formRegisterElemets[i].type !== "submit") {
      localStorage.setItem(
        formRegisterElemets[i].name,
        formRegisterElemets[i].value,
      );
    }
  }
}
let customerFirstName = localStorage.getItem(formRegisterElemets[0].name);

let customerLastName = localStorage.getItem(formRegisterElemets[1].name);
let customerMail = localStorage.getItem(formRegisterElemets[2].name);
let customerPassword = localStorage.getItem(formRegisterElemets[3].name);

const randomNumTo16 = (d) => {
  return (hexString = Number(d).toString(16));
};

let isUserRegister, isUserLogin; //user is registered

if (customerFirstName && customerLastName && customerMail && customerPassword) {
  isUserRegister = true;
} else {
  isUserRegister = false;
}

if (isUserRegister === true) {
  let randomNum = Math.floor(Math.random() * 1000000000);
  let randomNum16 = randomNumTo16(randomNum);
  document.querySelector(
    ".menu_img",
  ).innerHTML = `<div class="icon-profile_letter">${customerFirstName[0]}${customerLastName[0]}</div>
   <div class="dropMenuProfileWITHAuth">
      <div class="dropMenu_title">${randomNum16}</div>
      <div class="line_pop"></div>
      <a class="dropMenu_MyProfile">My profile</a>
      <a class="dropMenu_LogOut">Log Out</a>
    </div>`;
  document.querySelector(".menu_img_tablet").innerHTML = `
  <div class="icon-profile_letter_tablet">${customerFirstName[0]}${customerLastName[0]}</div>`;
}
const logoLogin = document.querySelector(".icon-profile_letter"),
  logoLoginTablet = document.querySelector(".icon-profile_letter_tablet");

logoLogin.addEventListener("click", (e) => {
  logInMenu.classList.add("dropMenuProfileWITHAuth_active");
  //overNav.classList.add("overNav_active");
  console.log(e.target);
});
logoLoginTablet.addEventListener("click", () => {
  logInMenu.classList.add("dropMenuProfileWITHAuth_active");
  overNav.classList.add("overNav_active");
  nav.classList.remove("nav_active");
});
