document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav"),
    menuItem = document.querySelectorAll(".menu_item"),
    menuCross = document.querySelector(".menu_cross"),
    hamburger = document.querySelector(".humburger");
  //add active
  hamburger.addEventListener("click", () => {
    hamburger.classList.add("humburger_active");
    nav.classList.add("nav_active");
  });
  //remove active after press cross
  menuCross.addEventListener("click", () => {
    hamburger.classList.remove("humburger_active");
    nav.classList.remove("nav_active");
  });
  /*  remove active if press to avoid nav
  document.addEventListener("click", avoidMenu);
  function avoidMenu(event) {
    if (!event.target.closest(".nav")) {
      hamburger.classList.remove("humburger_active");
      nav.classList.remove("nav_active");
    }
  } */
  //for menu item
  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("humburger_active");
      nav.classList.toggle("nav_active");
    });
  });
});
