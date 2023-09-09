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
