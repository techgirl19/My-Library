
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}


function displayBooks() {
  const container = document.getElementById("bookContainer");
  container.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
      <button class="toggle-read" data-index="${index}">Toggle Read</button>
      <button class="remove-book" data-index="${index}">Remove</button>
    `;

    container.appendChild(bookCard);
  });

  // Add event listeners for buttons
  document.querySelectorAll(".remove-book").forEach(button => {
    button.addEventListener("click", removeBook);
  });

  document.querySelectorAll(".toggle-read").forEach(button => {
    button.addEventListener("click", toggleReadStatus);
  });
}

// Remove a book from the library
function removeBook(event) {
  const index = event.target.dataset.index;
  myLibrary.splice(index, 1);
  displayBooks();
}

// Toggle read status
function toggleReadStatus(event) {
  const index = event.target.dataset.index;
  myLibrary[index].toggleRead();
  displayBooks();
}

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("readStatus").checked;

  addBookToLibrary(title, author, pages, read);

  this.reset(); // Clear form fields
  this.classList.add("hidden"); // Hide form after submission
});

// Show/hide the form when clicking the button
document.getElementById("newBookBtn").addEventListener("click", function () {
  document.getElementById("bookForm").classList.toggle("hidden");
});

// Add a sample book for testing
addBookToLibrary("Trying to live in Present", "Preet", 260, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("True meaning of Perfection", "Deepak", 270, true);
addBookToLibrary("The Power of Now", "Eckhard Tolle", 235, true);
addBookToLibrary("Don't Waste Me!", "Time", 310, true);