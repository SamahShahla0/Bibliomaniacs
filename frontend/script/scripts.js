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


function catalogPage() {
  const cardContainer = document.getElementById("card-container");
  const loadMoreButton = document.getElementById("load-more");


  const cardLimit = 10;
  const cardIncrease = 5;
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
    bookImg.src = bookData.imgSrc;
    bookImg.alt = bookData.title;
    
    // Appending image to the anchor
    imgAnchor.appendChild(bookImg);
    
    // Appending anchor to the image div
    bookImgDiv.appendChild(imgAnchor);
  
    const bookContentDiv = document.createElement("div");
    bookContentDiv.className = "book-content";
    const bookTitleDiv = document.createElement("div");
    bookTitleDiv.className = "book-title";
    bookTitleDiv.textContent = bookData.title;
    const bookAuthorDiv = document.createElement("div");
    bookAuthorDiv.className = "book-author";
    bookAuthorDiv.textContent = "by " + bookData.author;
    const bookSumDiv = document.createElement("div");
    bookSumDiv.className = "book-sum";
    const insSpan = document.createElement("ins");
    const amountSpan = document.createElement("span");
    amountSpan.className = "amount";
    amountSpan.textContent = bookData.price;
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
  };

  const addCards = (pageIndex) => {
    currentPage = pageIndex;

    handleButtonStatus();

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange =
      pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;

    // Assuming you have an array of bookData called bookDataList
    for (let i = startRange; i < endRange && i < bookDataList.length; i++) {
      createBookCard(bookDataList[i]);
    }
  };

  // Example usage:
  const bookDataList = [
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "http://127.0.0.1:5500/images/harrypotter2.jpg"
    },
    // Add more book data objects here...
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "http://127.0.0.1:5500/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "http://127.0.0.1:5500/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "http://127.0.0.1:5500/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "/images/harrypotter2.jpg"
    },
    {
      title: "The ultimate guide to Computer Science",
      author: "Elizabeth Gilbert",
      price: "€32,50",
      imgSrc: "/images/harrypotter2.jpg"
    }
  ];


  window.onload = function () {
    addCards(currentPage);
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
