let myLibrary = [];
const main = document.querySelector(".main");
const addBook = document.querySelector("#add");
const dialog = document.querySelector("#dialog");
const cancel = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");

const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const completed = document.querySelector("#completed");

function Book(title, author, pages, completed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
  this.toggle = function () {
    this.completed = !this.completed;
  };
}

addBook.addEventListener("click", (e) => {
  dialog.showModal();
});

cancel.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
  let book = new Book(title.value, author.value, pages.value, completed.value);
  myLibrary.push(book);
  display();
});

function createCard(book, i) {
  let card = document.createElement("div");
  card.dataset.index = i;
  let info = document.createElement("div");
  info.classList.add("info");
  let title = document.createElement("strong");
  title.textContent = book.title;
  info.append(title);
  let author = document.createElement("p");
  author.textContent = book.author;
  info.append(author);
  let pages = document.createElement("p");
  pages.textContent = book.pages;
  info.append(pages);
  let completed = document.createElement("button");
  completed.textContent = book.completed;
  info.append(completed);
  let button = document.createElement("button");
  button.classList.add("deleteBtn");
  button.textContent = "Delete";
  card.append(info);
  card.append(button);
  card.classList.add("card");
  return card;
}

function display() {
  while (main.firstChild) {
    main.firstChild.remove();
  }
  myLibrary.forEach((book, i) => {
    let card = createCard(book, i);
    main.append(card);
    let info = card.querySelector(".info");
    let button = info.querySelector("button");
    if (button) {
      button.addEventListener("click", (e) => {
        book.toggle();
        e.target.textContent = book.completed;
      });
    }
    remove(card);
  });
}

function remove(card) {

    const button = card.querySelector(".deleteBtn");
    button.addEventListener("click", (e) => {
      const element = myLibrary[card.dataset.index];
      myLibrary = myLibrary.filter((book) => {
        return book !== element;
      });
      display();
    });
}
