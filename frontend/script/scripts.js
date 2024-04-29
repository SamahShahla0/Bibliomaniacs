var slideIndex = 1;
function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-white", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-white";
}


function redirectToPage(pageName) {
  // Redirect to the target page
  console.log("testtt testt")
  window.location.href = pageName;
}

/* for subscribe feature */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribe-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const subscriberEmail = document.getElementById('subscriberEmail');
    const email = subscriberEmail.value;

    // Send email address to server
    sendEmailToServer(email);
  });

  function sendEmailToServer(email) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', 'http://localhost/Bibliomaniacs/backend/new_subscriber.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Define what happens on successful data submission
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Handle the response from the server
        console.log(xhr.responseText);
        alert('Subscription successful!');
        // Optionally, reset the form after successful submission
        form.reset();
      } else {
        console.error('Error sending email:', xhr.statusText);
        alert('Subscription failed. Please try again later.');
      }
    };

    // Define what happens in case of error
    xhr.onerror = function() {
      console.error('Request failed');
    };

    // Send the request
    xhr.send('email=' + encodeURIComponent(email));
  }
});



let pPath = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
if(pPath == "index.html"){
  landingPage()
}
else if(pPath == "sign-in-up.html"){
  signPage()
}
else if(pPath == "cart.html"){
  cartPage()
}
else if(pPath == "catalog.html"){
  catalogPage()
}
else if(pPath == "my-account.html"){
  MyAccountPage()
}
else if(pPath == "contact-us.html"){
  contactUsPage()
}


// Define functions for each page



function landingPage() {
  showDivs(slideIndex);
  
}


function signPage() {
  const signContainer = document.getElementById('signContainer');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');

  registerBtn.addEventListener('click', () => {
    signContainer.classList.add("active");
  });

  loginBtn.addEventListener('click', () => {
    signContainer.classList.remove("active");
  });
}


function cartPage() {
  $('a.remove').click(function(e){
    e.preventDefault();
    $(this).parent().parent().parent().hide( 400 );
  
  })
}


async function catalogPage() {

  const cardContainer = document.getElementById("card-container");
  const loadMoreButton = document.getElementById("load-more");

  const cardLimit = 34;
  const cardIncrease = 8;
  const pageCount = Math.ceil(cardLimit / cardIncrease);
  let currentPage = 1;

  const handleButtonStatus = () => {
    if (pageCount === currentPage) {
      loadMoreButton.classList.add("disabled");
      loadMoreButton.setAttribute("disabled", true);
    }
  };

  const createBookCard = (bookData) => {
    const card = document.createElement("div");
    card.className = "book-cell";

    const bookImgDiv = document.createElement("div");
    bookImgDiv.className = "book-img";
  
    // Creating anchor element
    const imgAnchor = document.createElement("a");
    imgAnchor.href = "single-book-page.html"; // Replace "your_target_page_url_here" with the URL you want to link to
    
    const bookImg = document.createElement("img");
    bookImg.className = "book-photo";
    bookImg.src = "data:image/webp;base64," + bookData.image_base64; // Assuming the image is JPEG format, adjust accordingly
    bookImg.alt = bookData.tittle;
    
    // Appending image to the anchor
    imgAnchor.appendChild(bookImg);
    
    // Appending anchor to the image div
    bookImgDiv.appendChild(imgAnchor);
  
    const bookContentDiv = document.createElement("div");
    bookContentDiv.className = "book-content";
    const bookTitleDiv = document.createElement("div");
    bookTitleDiv.className = "book-title";
    bookTitleDiv.textContent = bookData.tittle;
    const bookAuthorDiv = document.createElement("div");
    bookAuthorDiv.className = "book-author";
    bookAuthorDiv.textContent = "by " + bookData.author;
    const bookSumDiv = document.createElement("div");
    bookSumDiv.className = "book-sum";
    const insSpan = document.createElement("ins");
    const amountSpan = document.createElement("span");
    amountSpan.className = "amount";
    amountSpan.textContent = "$ " + bookData.price;
    insSpan.appendChild(amountSpan);
    bookSumDiv.appendChild(insSpan);
    
    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "btn";
    addToCartBtn.textContent = "Add To Cart";
  
    bookContentDiv.appendChild(bookTitleDiv);
    bookContentDiv.appendChild(bookAuthorDiv);
    bookContentDiv.appendChild(bookSumDiv);
    bookContentDiv.appendChild(addToCartBtn);
  
    card.appendChild(bookImgDiv);
    card.appendChild(bookContentDiv);
  
    cardContainer.appendChild(card);

    cardContainer.appendChild(card);
  };

  const fetchBookData = async () => {
    try {
      const response = await fetch('http://localhost/Bibliomaniacs/backend/get_books.php');
      if (!response.ok) {
        throw new Error('Failed to fetch book data');
      }
      const bookDataList = await response.json();
      return bookDataList;
    } catch (error) {
      console.error('Error fetching book data:', error);
      return [];
    }
  };

  const addCards = async (pageIndex) => {
    currentPage = pageIndex;

    handleButtonStatus();

    const bookDataList = await fetchBookData();
    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange =
      pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;

    for (let i = startRange; i < endRange && i < bookDataList.length; i++) {
      createBookCard(bookDataList[i]);
    }
  };

  /******************************************************************** */

  // Function to fetch books based on category
  function fetchBooksByCategory(categoryId) {
    fetch('http://localhost/Bibliomaniacs/backend/get_books_by_category.php?category_id=' + categoryId)
        .then(response => { 
          return response.json();
        })
        .then(books =>  {
          console.log('books are:', books);
          displayBooks(books);
        })
        .catch(error => console.error('Error fetching book data:', error));
  }

  // Function to display books in the book container
  function displayBooks(books) {
    const bookContainer = document.getElementById('card-container');
    bookContainer.innerHTML = ''; // Clear previous content
    console.log(books);
    books.forEach(book => {
        createBookCard(book);
    });
  }


  // Event listener for category links
  document.getElementById('category-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Prevent default behavior of anchor tag
        const categoryId = event.target.dataset.categoryId;
        console.log('category id : ' + categoryId);
        fetchBooksByCategory(categoryId);
    }
  });


  // Function to populate category list dynamically
  function populateCategoryList(categories) {
    const categoryList = document.getElementById('category-list');
    categories.forEach(category => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        if (category.idcategories == 1) {
          link.className = "icon fa fa-gratipay";
        } else if (category.idcategories == 2) {
          link.className = "icon fa fa-magic";
        } else if (category.idcategories == 3) {
          link.className = "icon fa fa-hourglass-half";
        } else if (category.idcategories == 4) {
          link.className = "icon fa fa-book";
        } else if (category.idcategories == 5) {
          link.className = "icon fa fa-graduation-cap";
        } else if (category.idcategories == 6) {
          link.className = "icon fa fa-puzzle-piece";
        } else if (category.idcategories == 7) {
          link.className = "icon fa fa-child";
        } else if (category.idcategories == 8) {
          link.className = "icon fa fa-trophy";
        }

        const spanName = document.createElement('span');
        link.href = '#'; // Set href to '#' since we're handling the click event
        spanName.textContent = category.category_desc;
        link.dataset.categoryId = category.idcategories; // Set dataset to store category ID
        link.appendChild(spanName);
        listItem.appendChild(link);
        categoryList.appendChild(listItem);
    });
  }


  // Assuming you have a function to retrieve categories from the server
  function getCategories() {
    console.log('Fetching categories...');

    fetch('http://localhost/Bibliomaniacs/backend/get_categories.php')
        .then(response => {
            return response.json();
        })
        .then(categories => {
            console.log('Received categories:', categories);
            populateCategoryList(categories);
        })
        .catch(error => console.error('Error fetching category data:', error));
}


  window.onload = async function () {
    getCategories();

    await addCards(currentPage);
    loadMoreButton.addEventListener("click", () => {
      addCards(currentPage + 1);
    });
    
  };


}



function MyAccountPage() {

  document.addEventListener("DOMContentLoaded", function() {
    var tabLinks = document.querySelectorAll(".nav-item .nav-link");
    tabLinks.forEach(function(tabLink) {
        tabLink.addEventListener("click", function(event) {
            event.preventDefault();
            var targetTabId = this.getAttribute("href").substring(1);
            showTab(targetTabId);
        });
    });

    // DataTable initialization (this part should be replaced with actual DataTable initialization)
    var ordersTable = document.getElementById("my-orders-table");
    if (ordersTable) {
        // Initialize DataTable
    }

    var cards = document.querySelectorAll(".my-account-dashboard .card");
    cards.forEach(function(card) {
        card.addEventListener("click", function() {
            var areaToggle = this.getAttribute("area-toggle");
            var navLink = document.querySelector(".nav-area a#" + areaToggle);
            if (navLink) {
                navLink.click();
            }
        });
    });
  });

  function showTab(tabId) {
      var tabs = document.querySelectorAll(".tab-pane");
      tabs.forEach(function(tab) {
          tab.classList.remove("active");
      });

      var activeTab = document.getElementById(tabId);
      if (activeTab) {
          activeTab.classList.add("active");
      }
  }

}

function contactUsPage(){

  function handleContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(contactForm);

        // Send form data to backend
        fetch('http://localhost/Bibliomaniacs/backend/save_messages.php', {
            method: 'POST',
            body: formData
            
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset(); // Reset the form after successful submission
            } else {
                throw new Error('Failed to send message');
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again later.');
        });
    });
  }

  handleContactForm(); 

}