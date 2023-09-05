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
  modalMyProfile = document.querySelector(".modalProfile"),
  modalProfileClose = document.getElementById("modalProfile_close"),
  profileVisitCount = modalMyProfile.querySelector(".profile_visit_count"),
  profileBooksCount = modalMyProfile.querySelector(".profile_book_count"),
  profileCopyBtn = modalMyProfile.querySelector(".profile_footer_btn"),
  profileCardNumber = modalMyProfile.querySelector(".profile_cardNumber"),
  profileLogo = modalMyProfile.querySelector(".profile_logo"),
  profileFirstLastName = modalMyProfile.querySelector(".profile_firstLastName"),
  buttonsForBuy = document.querySelectorAll(".book_shelf_btn"),
  modalBuyCard = document.querySelector(".modalBuyCard"),
  modalBuyCardClose = document.querySelector(".modalBuyCard_close"),
  modalBuyCardBtn = document.querySelector(".modalBuyCard_btn"),
  readerName = document.querySelector(".member_card_search_name"),
  readerCardNum = document.querySelector(".member_card_search_num"),
  readerBtn = document.querySelector(".member_card_btn");

// Function to show registration form
function showRegistrationForm() {
  console.log("its client no registration");
  buttonsForBuy.forEach((btn) => {
    btn.addEventListener("click", openLogInMenu);
  });
}
// Function to show login form
function showLoginForm() {
  logo.style.display = "block";
  logoCustomer.style.display = "none";
  console.log("its client has registration, but logOut");
  buttonsForBuy.forEach((btn) => {
    btn.addEventListener("click", openLogInMenu);
  });
}
// Function to show user info
function showUserInfo(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((u) => {
    if (u.email === user.email) {
      for (let i = 0; i < user.books.length; i++) {
        let k = u.books[i].title;
        buttonsForBuy.forEach((btn) => {
          const title = btn.getAttribute("data-title");
          if (title === k) {
            btn.disabled = true;
            btn.textContent = "own";
          }
        });
      }
    }
  });

  console.log("its client logIn");
  logo.style.display = "none";
  logoCustomer.style.display = "block";
  //change logo
  logoLogin.textContent = user.firstName[0] + user.lastName[0];
  //change profile for number
  dropMenu_title.textContent = user.cardNumber;
  //change in profile modal: number, logo, firstLastName
  profileCardNumber.textContent = user.cardNumber;
  profileLogo.textContent = user.firstName[0] + user.lastName[0];
  profileFirstLastName.textContent = `${user.firstName} ${user.lastName}`;
  //Change in member card
  changeLibraryCard(user);
  changeBtnLibraryCard(user);
  changeVisitYourProfile();
  //Event listener for button - profile
  document
    .querySelector(".library_card_btn_profile")
    .addEventListener("click", () => {
      modalMyProfile.classList.add("modalProfile_active");
      modalOver.classList.add("modal_active");
    });
  //add atribute title
  logoLogin.setAttribute("title", `${user.firstName} ${user.lastName}`);
  //add count visit in profile
  profileVisitCount.textContent = user.visitCount;
  //Event listener for button for copy number profile
  profileCopyBtn.addEventListener("click", function () {
    let area = document.createElement("textarea");
    area.value = dropMenu_title.innerHTML;
    window.navigator.clipboard.writeText(area.value);
    area.remove();
  });
  // Event listener for Logo Login link
  logoLogin.addEventListener("click", () => {
    ProfileLogInMenuWith.classList.add("dropMenuProfileWITHAuth_active");
    overNav.classList.add("overNav_active");
  });
  // Event listener for logout link
  LogOut_link.addEventListener("click", function () {
    ProfileLogInMenuWith.classList.remove("dropMenuProfileWITHAuth_active");
    overNav.classList.remove("overNav_active");
    logoutUser();
  });
  //Event listener for my profile link
  myProfileLink.addEventListener("click", function () {
    modalMyProfile.classList.add("modalProfile_active");
    modalOver.classList.add("modal_active");
    overNav.classList.remove("overNav_active");
    ProfileLogInMenuWith.classList.remove("dropMenuProfileWITHAuth_active");
  });
  //close modalMyProfile
  //press cross in MyProfile
  modalProfileClose.addEventListener("click", removeModal);
  //press buy book
  buttonsForBuy.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      console.log(e.target);
      // openModalBuyCard();
      // addBookForRented(user);
      const title = btn.getAttribute("data-title");
      const autor = btn.getAttribute("data-autor");
      user.books.push({ title, autor });
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.forEach((u) => {
        if (u.email === user.email) {
          u.books = user.books;
        }
      });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      btn.textContent = "own";
      btn.disabled = true;
    });
  });
  //press croos in modalBuyCard
  modalBuyCardClose.addEventListener("click", removeModal);
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
  document.location.reload();
  showLoginForm();
}
//Function for open LogIn menu
function openLogInMenu() {
  modalLogIn.classList.add("modalLogIn_active");
  modalOver.classList.add("modal_active");
}
function openModalBuyCard() {
  modalBuyCard.classList.add("modalBuyCard_active");
  modalOver.classList.add("modal_active");
}
///

//Function for closing all section modals - logIn, register, my profile, modalBuyCard
function removeModal() {
  formRegister.classList.remove("modalRegister_active");
  modalOver.classList.remove("modal_active");
  modalLogIn.classList.remove("modalLogIn_active");
  modalMyProfile.classList.remove("modalProfile_active");
  modalBuyCard.classList.remove("modalBuyCard_active");
}
//function for change your library card

function changeLibraryCard(customer) {
  readerName.value = `${customer.firstName} ${customer.lastName}`;
  readerCardNum.value = customer.cardNumber;
}
function changeBtnLibraryCard(customer) {
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="pfofile_info_libCard">
          <div class="profile_libCard">
            <p class="pfofile_info_titlelibCard">Visits</p>
            <img class="pfofile_info_imglibCard" src="pictures/Union.png" alt="man">
            <div class="profile_visit_count">${customer.visitCount}</div>
          </div>
          <div class="profile_libCard">
              <p class="pfofile_info_titlelibCard">Bonuses</p>
              <img class="pfofile_info_imglibCard" src="pictures/Star.png" alt="star">
              <div class="profile_bonuse_count">0</div>
          </div>
          <div class="profile_libCard">
            <p class="pfofile_info_titlelibCard">Books</p>
            <img class="pfofile_info_imglibCard" src="pictures/book.png" alt="book">
            <div class="profile_book_count">${customer.books.length}</div>
          </div>
        </div>`;
  readerBtn.before(newElement);
  readerBtn.style.display = "none";
}
function changeVisitYourProfile() {
  document.querySelector(".library_register_card").innerHTML = `
   <div class="library_register_card_title">Visit your profile</div>
            <p class="library_register_card_recommend">With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.</p>
            <div class="register_card_wrapper_btn">
              <button class="library_card_btn_profile">Profile</button>
            </div>`;
}
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

// Event listener for dropMenuRemove
function dropMenuRemove() {
  ProfilelogInMenuNo.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
}
overNav.onclick = dropMenuRemove;
//Event listener for if press to dropMenu_register link
logInMenuRegistr.addEventListener("click", (event) => {
  event.stopPropagation();
  ProfilelogInMenuNo.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
  formRegister.classList.add("modalRegister_active");
  modalOver.classList.add("modal_active");
});
//Event listener for press Sign Up in general document
document
  .querySelector(".library_register_card_btn_sigh")
  .addEventListener("click", () => {
    formRegister.classList.add("modalRegister_active");
    modalOver.classList.add("modal_active");
  });

//Event listener for press cross in register
modalRegister_close.addEventListener("click", removeModal);
//Event listener for press avoid register
modalOver.addEventListener("click", (event) => {
  // console.log(event.target);
  if (event.target === modalOver) {
    removeModal();
  }
});
//Event listener for click for link LogIn in profile NOAuth
logInMenuLog.addEventListener("click", (event) => {
  event.stopPropagation();
  ProfilelogInMenuNo.classList.remove("dropMenuProfileNOAuth_active");
  overNav.classList.remove("overNav_active");
  openLogInMenu();
});

//Event listener for press cross in LogIn
modalLogIn_close.addEventListener("click", removeModal);

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
  const books = [];
  let visitCount = 0;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({
    firstName,
    lastName,
    email,
    password,
    cardNumber,
    visitCount,
    books,
  });
  localStorage.setItem("users", JSON.stringify(users));
  removeModal();
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
  removeModal();
});

// Initial display based on login status
if (loggedInUser) {
  showUserInfo(loggedInUser);
} else {
  showRegistrationForm();
}
///
