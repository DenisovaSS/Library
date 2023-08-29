const logInMenuRegistr = document.querySelector(".dropMenu_register");
const ProfilelogInMenuNo = document.querySelector(".dropMenuProfileNOAuth"),
  logo = document.querySelector(".menu_img"),
  logoTablet = document.querySelector(".menu_img_tablet"),
  modalRegister = document.querySelector(".modalRegister"),
  modalOver = document.querySelector(".modal"),
  modalLogIn = document.querySelector(".modalLogIn"),
  logInMenuLog = ProfilelogInMenuNo.querySelector(".dropMenu_log");

/* //click for logo without register
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
}); */
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
let modalLogIn_close = document.querySelector(".modalLogIn_close");
//press cross in LogIn
modalLogIn_close.addEventListener("click", removemModalRegister);

const formRegister = document.getElementById("register");
const formRegisterElemets = formRegister.elements;
const btnFormRegister = formRegister.querySelector('[ type="submit"]');

let customerFirstName = localStorage.getItem(formRegisterElemets[0].name),
  customerLastName = localStorage.getItem(formRegisterElemets[1].name),
  customerMail = localStorage.getItem(formRegisterElemets[2].name),
  customerPassword = localStorage.getItem(formRegisterElemets[3].name),
  customerLogIn = 0;

let isUserRegister; //user is registered
//if customer first register
function checkCustomer() {
  if (customerLogIn === 1) {
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
    //if click for icon-profile_letter
    let logoLogin = document.querySelector(".icon-profile_letter");
    let ProfileLogInMenuWith = document.querySelector(
      ".dropMenuProfileWITHAuth",
    );
    logoLogin.addEventListener("click", () => {
      ProfileLogInMenuWith.classList.add("dropMenuProfileWITHAuth_active");
      overNav.classList.add("overNav_active");
    });
    //if click logOut
    let LogOut_link = document.querySelector(".dropMenu_LogOut");
    LogOut_link.addEventListener("click", mart());
  }
  console.log("HAppy");
}
function mart() {
  customerLogIn = 0;
}
//click in button in register form
btnFormRegister.addEventListener("click", (event) => {
  event.preventDefault();
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
  customerLogIn = 1;
  checkCustomer();
  removemModalRegister();
});
// console.log(customerLogIn);
if (customerFirstName && customerLastName && customerMail && customerPassword) {
  isUserRegister = true;
} else {
  isUserRegister = false;
}
// let logoLogin = document.querySelector(".BTN_mj");

// logoLogin.addEventListener("click", () => {
//   // console.log("next");
//   customerLogIn = 0;
//   checkCustomer();
// });
checkCustomer();
function dropMenuProfileWITHAuth() {}
LogOut_link.addEventListener("click", function () {
  localStorage.setItem("LogIn", false);
  checkCustomer(); //
  myProfileLink.addEventListener("click", () => {
    modalMyProfile.classList.add("modalProfile_active");
    modalOver.classList.add("modal_active");
  });

  //dropMenuProfileWITHAuth
  let logoLogin = document.querySelector(".icon-profile_letter");
  let ProfileLogInMenuWith = document.querySelector(".dropMenuProfileWITHAuth"),
    logoLoginTablet = document.querySelector(".icon-profile_letter_tablet"),
    myProfileLink = ProfileLogInMenuWith.querySelector(".dropMenu_MyProfile"),
    modalMyProfile = document.querySelector(".modalProfile");
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
});
