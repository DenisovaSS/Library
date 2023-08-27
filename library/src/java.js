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
overNav.addEventListener("click", menuRemove);
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

const logInMenuRegistr = document.querySelector(".dropMenu_register");
const ProfilelogInMenuNo = document.querySelector(".dropMenuProfileNOAuth"),
  logo = document.querySelector(".menu_img"),
  logoTablet = document.querySelector(".menu_img_tablet"),
  modalRegister = document.querySelector(".modalRegister"),
  modalOver = document.querySelector(".modal"),
  modalLogIn = document.querySelector(".modalLogIn"),
  logInMenuLog = ProfilelogInMenuNo.querySelector(".dropMenu_log");

//click for logo without register
logo.addEventListener("click", () => {
  ProfilelogInMenuNo.classList.add("dropMenuProfileNOAuth_active");
  overNav.classList.add("overNav_active");
});
//and click in burgermenu
logoTablet.addEventListener("click", () => {
  ProfilelogInMenuNo.classList.add("dropMenuProfileNOAuth_active");
  overNav.classList.add("overNav_active");
  nav.classList.remove("nav_active");
});
function dropMenuRemove() {
  ProfilelogInMenuNo.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
}
overNav.onclick = dropMenuRemove;
////if press to dropMenu_register link
logInMenuRegistr.addEventListener("click", (event) => {
  event.stopPropagation();
  ProfilelogInMenuNo.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
  modalRegister.classList.add("modalRegister_active");
  modalOver.classList.add("modal_active");
});
//if press Sign Up in form
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
  modalLogIn.classList.remove("modalLogIn_active");
}
//press cross in register
modalRegister_close.addEventListener("click", removemModalRegister);
//press avoid register
modalOver.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target === modalOver) {
    removemModalRegister();
  }
});
//click for link LogIn in profile NOAuth
logInMenuLog.addEventListener("click", (event) => {
  event.stopPropagation();
  ProfilelogInMenuNo.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
  modalLogIn.classList.add("modalLogIn_active");
  modalOver.classList.add("modal_active");
});
//close modalLogIn
let modalLogIn_close = document.querySelector(".modalLogIn_close");
//press cross in LogIn
modalLogIn_close.addEventListener("click", removemModalRegister);
//press link register in modalLogIn
// const modalLogInLinkRegister = document.querySelector(
//   ".modalLogIn-bottom_link",
// );

//localStorage set elements
const formRegister = document.getElementById("register");
const formRegisterElemets = formRegister.elements;
const btnFormRegister = formRegister.querySelector('[ type="submit"]');
let isUserRegister,
  isUserLogin = false; //user is registered and user logIN
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
  //create random number
  const randomNumTo16 = (d) => {
    return (hexString = Number(d).toString(16));
  };
  let randomNum = Math.floor(Math.random() * 1000000000);
  let randomNum16 = randomNumTo16(randomNum);
  localStorage.setItem("cardNumber", randomNum16);
}

let customerFirstName = localStorage.getItem(formRegisterElemets[0].name),
  customerLastName = localStorage.getItem(formRegisterElemets[1].name),
  customerMail = localStorage.getItem(formRegisterElemets[2].name),
  customerPassword = localStorage.getItem(formRegisterElemets[3].name);

if (customerFirstName && customerLastName && customerMail && customerPassword) {
  isUserRegister = true;
} else {
  isUserRegister = false;
}

// if (isUserRegister === true) {
//   isUserLogin = true;
// }

//if customer first register
if (isUserRegister === true) {
  document.querySelector(
    ".menu_img",
  ).innerHTML = `<div class="icon-profile_letter">${customerFirstName[0]}${
    customerLastName[0]
  }</div>
   <div class="dropMenuProfileWITHAuth">
      <div class="dropMenu_title">${localStorage.getItem("cardNumber")}</div>
      <div class="line_pop"></div>
      <a class="dropMenu_MyProfile">My profile</a>
      <a class="dropMenu_LogOut">Log Out</a>
    </div>`;
  document.querySelector(".menu_img_tablet").innerHTML = `
  <div class="icon-profile_letter_tablet">${customerFirstName[0]}${customerLastName[0]}</div>`;
}
// let LogOut_link = document.querySelector(".dropMenu_LogOut");
// LogOut_link.addEventListener("click", function (event) {
//   console.log(event.target);
//   isUserLogin = false;
// });

//dropMenuProfileWITHAuth
let logoLogin = document.querySelector(".icon-profile_letter");
let ProfileLogInMenuWith = document.querySelector(".dropMenuProfileWITHAuth"),
  logoLoginTablet = document.querySelector(".icon-profile_letter_tablet"),
  myProfileLink = ProfileLogInMenuWith.querySelector(".dropMenu_MyProfile"),
  modalMyProfile = document.querySelector(".modalProfile");
//
myProfileLink.addEventListener("click", () => {
  modalMyProfile.classList.add("modalProfile_active");
  modalOver.classList.add("modal_active");
});
//
logoLogin.addEventListener("click", () => {
  ProfileLogInMenuWith.classList.add("dropMenuProfileWITHAuth_active");
  overNav.classList.add("overNav_active");
});
logoLoginTablet.addEventListener("click", () => {
  ProfileLogInMenuWith.classList.add("dropMenuProfileWITHAuth_active");
  overNav.classList.add("overNav_active");
  nav.classList.remove("nav_active");
});
function dropMenuWithAuthRemove() {
  ProfileLogInMenuWith.classList.remove("dropMenuProfileWITHAuth_active");
  overNav.classList.remove("overNav_active");
}

overNav.addEventListener("click", dropMenuWithAuthRemove);
