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
let width = 479; // width picture + margin
let position = 0; // position ленты прокрутки

// circles.forEach((item) => {
//   item.onclick = function () {
//     item.classList.remove("about_circle_active");
//   };
// });
//if use under buttons
for (let i = 0; i < allBtn.length; i++) {
  allBtn[i].onclick = function () {
    position = -i * width;
    //console.log(position);
    circles[i].classList.toggle("about_circle_active");
    list.style.marginLeft = position + "px";
  };
}
//if use arrows
document.querySelector(".about_slider_arrow_next").onclick = function () {
  position -= width;
  position = Math.max(position, -width * (listElems.length - 1));
  list.style.marginLeft = position + "px";
};
document.querySelector(".about_slider_arrow_prev").onclick = function () {
  position += width;
  position = Math.min(position, 0);
  list.style.marginLeft = position + "px";
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
