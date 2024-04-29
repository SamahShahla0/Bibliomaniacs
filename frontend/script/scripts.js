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
else if(pPath == "blog.html"){
  blogPage()
}
else if(pPath == "single-article.html"){
  singleBlogPage()
}
else if(pPath == "single-book-page.html"){
  singleBookPage()
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
    imgAnchor.href = `single-book-page.html?idbooks=${bookData.idbooks}`; // Replace "your_target_page_url_here" with the URL you want to link to
    
    const bookImg = document.createElement("img");
    bookImg.className = "book-photo";
    bookImg.src = "data:image/webp;base64," + bookData.image_base64; 
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

function blogPage() {
  let numBlogsDisplayed = 0; // Track the number of blogs already displayed
  let totalBlogs = 0; // Track the total number of blogs available
  const blogsPerPage = 4; // Number of blogs to display per page

  // Function to fetch blogs from the API
  function getBlogs() {
      fetch('http://localhost/Bibliomaniacs/backend/get_blogs.php') // Fetch blogs from the PHP API
          .then(response => response.json()) // Parse the JSON response
          .then(blogs => {
              totalBlogs = blogs.length; // Update the total number of blogs available
              populateBlogSection(blogs.slice(numBlogsDisplayed, numBlogsDisplayed + blogsPerPage)); // Display initial blogs
          })
          .catch(error => console.error('Error fetching blogs:', error)); // Handle any errors
  }

  // Function to populate the blog section with fetched blogs
  function populateBlogSection(blogs) {
      const blogSection = document.querySelector('.latest-blog-section .row');

      // Iterate over each blog and create HTML elements to display them
      blogs.forEach(blog => {
          const blogItem = document.createElement('div');
          blogItem.classList.add('col-sm-6', 'col-md-4', 'item');

          const blogLink = document.createElement('a');
          blogLink.href = `single-article.html?idblogs=${blog.idblogs}`;
          blogItem.appendChild(blogLink);

          const blogImage = document.createElement('img');
          blogImage.classList.add('img-fluid');
          blogImage.src = "data:image/webp;base64," + blog.blog_img_64; // Set the source of the blog image
          blogLink.appendChild(blogImage);

          const blogTitle = document.createElement('h3');
          blogTitle.classList.add('pt-3', 'name');
          blogTitle.textContent = blog.blog_title; // Set the title of the blog
          blogItem.appendChild(blogTitle);

          const blogDescription = document.createElement('p');
          blogDescription.classList.add('description');
          blogDescription.textContent = blog.blog_text; // Set the description of the blog
          blogItem.appendChild(blogDescription);

          const readMoreLink = document.createElement('a');
          readMoreLink.classList.add('action');
          readMoreLink.href = `single-article.html?idblogs=${blog.idblogs}`;
          readMoreLink.innerHTML = 'Read article <i class="fa fa-arrow-circle-right"></i>';
          blogItem.appendChild(readMoreLink);

          blogSection.appendChild(blogItem);
      });

      // Update the number of blogs displayed
      numBlogsDisplayed += blogs.length;

      // Check if all blogs have been displayed
      if (numBlogsDisplayed >= totalBlogs) {
          disableLoadMoreButton();
      }
  }

  // Function to disable the "Load more" button
  function disableLoadMoreButton() {
      const loadMoreButton = document.getElementById('load-more');
      loadMoreButton.disabled = true;
      loadMoreButton.classList.add('disabled');
  }

  // Event listener for the "Load more" button
  document.getElementById('load-more').addEventListener('click', function() {
      getBlogs(); // Fetch more blogs when the button is clicked
  });

  // Call the function to fetch initial blogs when the page is loaded
  window.onload = function() {
      getBlogs();
  };
}


function singleBlogPage(){

  // Function to format blog text before adding it to the article content
  function formatBlogText(blogText) {
    // Split the text by empty lines to create paragraphs
    let paragraphs = blogText.split(/\n\s*\n/);

    // Create an array to store formatted content
    let formattedContent = [];

    // Iterate over each paragraph
    paragraphs.forEach(paragraph => {
        // Check if the paragraph contains blockquote pattern
        if (paragraph.trim().startsWith('"') && paragraph.trim().endsWith('"')) {
          // Add a blockquote element with a class
          formattedContent.push(`<blockquote class="article-simpleQuote">${paragraph.trim()}</blockquote>`);
      } else {
          // Add paragraph elements for each sentence with a class
          let sentences = paragraph.split('.');
          let formattedParagraph = sentences.map(sentence => `<p>${sentence.trim()}.</p>`).join('');
          formattedContent.push(formattedParagraph);
        }
    });

    // Join the formatted content and return as a single string
    return formattedContent.join('');
  }

  // Function to fetch and display a specific blog based on its ID
  function displayBlogById(blogId) {
    fetch(`http://localhost/Bibliomaniacs/backend/get_single_blog.php?idblogs=${blogId}`)
        .then(response => response.json())
        .then(blog => {
            // Update the HTML content with the fetched blog data
            document.getElementById('articleHeader').innerHTML = `<h1>${blog.blog_title}</h1>`;
            document.querySelector('.article-banner img').src = `data:image/webp;base64,${blog.blog_img_64}`;
            // Format the blog text before adding it to the article content
            let formattedText = formatBlogText(blog.blog_text);
            document.querySelector('.article-content').innerHTML = formattedText;
        })
        .catch(error => console.error('Error fetching blog:', error));
  }

  // Call the function to fetch and display the blog based on its ID
  window.onload = function() {
    // Extract the blog ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('idblogs');

    // Call the function to display the blog based on its ID
    if (blogId) {
        displayBlogById(blogId);
    } else {
        console.error('Blog ID not found in URL parameters');
    }
  };

}

function singleBookPage(){
  // Function to fetch book data from PHP API
  function fetchBook(bookId) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var bookData = JSON.parse(this.responseText);
            displayBook(bookData);
        }
    };
    xhttp.open("GET", "http://localhost/Bibliomaniacs/backend/get_single_book.php?idbooks=" + bookId, true);
    xhttp.send();
  }

  // Function to display book data on the HTML page
  function displayBook(bookData) {
    document.getElementById("bookTitle").innerHTML = bookData['tittle'];
    document.getElementById("bookAuthor").innerHTML = "Author: " + bookData['author'];
    document.getElementById("bookDescription").innerHTML = bookData['long_desc'];
    document.getElementById("bookImage").src = 'data:image/webp;base64,' + bookData['image_base64'];
    document.getElementById("bookPrice").innerHTML = "Price: $" + bookData['price'];
  }

  function getBookIdFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('idbooks');
  }

  // Fetch book data based on the book ID from URL
  var bookId = getBookIdFromURL();
  fetchBook(bookId);

}