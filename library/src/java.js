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
//4. Part authorization menu.
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const logInMenuRegistr = document.querySelector(".dropMenu_register");
const ProfilelogInMenuNo = document.querySelector(".dropMenuProfileNOAuth"),
  logo = document.querySelector(".menu_img"),
  logoTablet = document.querySelector(".menu_img_tablet"),
  logoCustomer = document.querySelector(".menu_img_logIn"),
  // modalRegister = document.querySelector(".modalRegister"),
  modalOver = document.querySelector(".modal"),
  modalLogIn = document.querySelector(".modalLogIn"),
  logInMenuLog = ProfilelogInMenuNo.querySelector(".dropMenu_log"),
  modalLogIn_close = document.querySelector(".modalLogIn_close"),
  formRegister = document.getElementById("register"),
  modalRegister_close = document.getElementById("modalRegister_close");
const formRegisterElemets = formRegister.elements;
const btnFormRegister = formRegister.querySelector('[ type="submit"]');
let LogOut_link = document.querySelector(".dropMenu_LogOut");
let logoLogin = document.querySelector(".icon-profile_letter");
let ProfileLogInMenuWith = document.querySelector(".dropMenuProfileWITHAuth"),
  dropMenu_title = ProfileLogInMenuWith.querySelector(".dropMenu_title"),
  logoLoginTablet = document.querySelector(".icon-profile_letter_tablet"),
  myProfileLink = ProfileLogInMenuWith.querySelector(".dropMenu_MyProfile"),
  modalMyProfile = document.querySelector(".modalProfile");
// Function to show registration form
function showRegistrationForm() {
  console.log("its client no registration");
}
// Function to show login form
function showLoginForm() {
  logo.style.display = "block";
  logoCustomer.style.display = "none";
  console.log("its client has registration, but logOut");
}
// Function to show user info
function showUserInfo(user) {
  logoLogin.textContent = user.firstName[0] + user.lastName[0];
  dropMenu_title.textContent = user.cardNumber;
  logoLogin.setAttribute("title", `${user.firstName} ${user.lastName}`);
  logo.style.display = "none";
  logoCustomer.style.display = "block";
  logoLogin.addEventListener("click", () => {
    ProfileLogInMenuWith.classList.add("dropMenuProfileWITHAuth_active");
    overNav.classList.add("overNav_active");
  });
  // Event listener for logout button
  LogOut_link.addEventListener("click", function () {
    ProfileLogInMenuWith.classList.remove("dropMenuProfileWITHAuth_active");
    overNav.classList.remove("overNav_active");
    logoutUser();
  });
}
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    let visitCount = +user.visitCount;
    visitCount++;
    user.visitCount = visitCount;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    showUserInfo(user);
  } else {
    alert("Not find your mail or password. Please try again.");
  }
}
// Function to handle user logout
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  showLoginForm();
}

//
///
// Event listener for user logo without login
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
  formRegister.classList.add("modalRegister_active");
  modalOver.classList.add("modal_active");
});
//if press Sign Up in  general document
document
  .querySelector(".library_register_card_btn_sigh")
  .addEventListener("click", () => {
    formRegister.classList.add("modalRegister_active");
    modalOver.classList.add("modal_active");
  });
//close register
function removemModalRegister() {
  formRegister.classList.remove("modalRegister_active");
  modalOver.classList.remove("modal_active");
  modalLogIn.classList.remove("modalLogIn_active");
}
//press cross in register
modalRegister_close.addEventListener("click", removemModalRegister);
//press avoid register
modalOver.addEventListener("click", (event) => {
  // console.log(event.target);
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
//press cross in LogIn
modalLogIn_close.addEventListener("click", removemModalRegister);

// Event listener for registration form submission
formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  const randomNumTo16 = (d) => {
    return (hexString = Number(d).toString(16));
  };
  let randomNum = Math.floor(Math.random() * 1000000000);
  const firstName = document.getElementById("first-name_register").value;
  const lastName = document.getElementById("last-name_register").value;
  const email = document.getElementById("email_register").value;
  const password = document.getElementById("new-password_register").value;
  const cardNumber = randomNumTo16(randomNum);
  let visitCount = 1;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ firstName, lastName, email, password, cardNumber, visitCount });
  localStorage.setItem("users", JSON.stringify(users));
  removemModalRegister();
  // showLoginForm();
  loginUser(email, password);
});
// Event listener for login form submission
modalLogIn.addEventListener("submit", function (e) {
  e.preventDefault();
  const loginEmail = document.getElementById("modalLogIn_email").value;
  const loginPassword = document.getElementById(
    "modalLogIn_new-password",
  ).value;

  loginUser(loginEmail, loginPassword);
  removemModalRegister();
});

// Initial display based on login status
if (loggedInUser) {
  showUserInfo(loggedInUser);
} else {
  showRegistrationForm();
}
///
