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
else if(pPath == "favorites.html"){
  favoritesPage()
}
else if(pPath == "checkout.html"){
  checkoutPage();
}
else if(pPath == "placed-order.html"){
  orderPlacedPage();
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


  
  document.addEventListener('DOMContentLoaded', function() {

    var signUpForm = document.getElementById('signUpForm');

    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        // Get the password input value
        var passwordInput = document.getElementById("signupPass");
        var password = passwordInput.value;
        // Password validation: Minimum length of 6 characters, including at least one letter and one number
        if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
          window.alert("Password must be at least 6 characters long and include both letters and numbers.");
          passwordInput.value = "";
          return; // Stop form submission
        }


        var formData = new FormData(signUpForm);
        for (var pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
        // Send form data to the PHP API using fetch API
        fetch('http://localhost/Bibliomaniacs/backend/signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log("response status: " + response.status);
            return response;
        })
        .then(response => response.text()) // Extract text from response
        .then(data => {
            console.log("data is: " + data); // Log the response
            // Check if the response contains an error message
            if (data.includes("Error:")) {
                // Display error message to the user
                window.alert(data);
            } else {
                // Sign-up successful, display success message
                window.alert("Sign-up successful! You can now log in.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Display a generic error message to the user
            window.alert("An error occurred. Please try again later.");
        });


    });


    /* ********************************* */
    
    var signInForm = document.getElementById('signInForm');

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        var formData = new FormData(signInForm);

        // Send form data to the PHP API using fetch API
        fetch('http://localhost/Bibliomaniacs/backend/signin.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
                console.log(data); // Log the response

                if (data.status === "success") {
                    // Save user information in local storage
                    localStorage.setItem('userId', data.user.id);
                    localStorage.setItem('userEmail', data.user.email);
                    localStorage.setItem('userName', data.user.username);
                   
                // Redirect to the user's account page after successful sign-in
                window.location.href = `http://localhost/Bibliomaniacs/frontend/my-account.html?idusers=${data.user.id};`
            } else {
                // Display error message to the user if sign-in fails
                window.alert(data.message);
            }
        })
        
        .catch(error => {
            console.error('Error:', error);
            // Display error message to the user
            window.alert("An error occurred. Please try again later.");
        });
    });

  });

}


function cartPage() {

  // Function to delete a book from the cart
  function deleteBookFromCart(bookId) {
    // Make AJAX request to PHP script to delete the book from the cart
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Bibliomaniacs/backend/delete_book_from_cart.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Refresh cart display after successful deletion
            var userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
            updateCartDisplay(userId); // Update cart display based on user ID
        }
    };
    xhr.send("bookId=" + bookId);
  }

  // Function to update subtotal based on cart contents
  function updateSubtotal() {
    var cartItems = document.querySelectorAll('.prodTotal p');
    var subtotal = 0;

    cartItems.forEach(function(item) {
        // Extract the numerical value from the text content
        var itemTotal = parseFloat(item.textContent.substring(1)); // Remove the '$' sign and parse as float
        subtotal += itemTotal;
    });

    // Update the subtotal value in the HTML
    var subtotalElement = document.querySelector('.subtotal .value');
    var totalElement = document.querySelector('.subtotal .total');
    subtotalElement.textContent = '$' + subtotal;
    totalElement.textContent = '$' + subtotal;
  }

    // Function to fetch cart contents and update cart display
  function updateCartDisplay(userId) {
    // Make AJAX request to the PHP API endpoint
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/Bibliomaniacs/backend/get_cart_contents.php?userId=" + userId, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse JSON response
            var cartContents = JSON.parse(xhr.responseText);
            if (cartContents.length > 0) {
                // Update cart display based on cartContents
                var cartList = document.querySelector('.cart-wrap');
                cartList.innerHTML = ''; // Clear existing cart items
                cartContents.forEach(function (item) {
                    var listItem = document.createElement('li');
                    listItem.className = 'items';
                    listItem.innerHTML = `
                        <div class="infoWrap">
                            <div class="cartSection">
                                <img src="data:image/webp;base64,${item.image_base64}" alt="" class="itemImg">
                                <p class="itemNumber">#${item.book_id}</p>
                                <h3>${item.title}</h3>
                                <p><input type="text" class="cart-qty" data-bookId="${item.book_id}" value="${item.quantity}" /> x $${item.price}</p>
                            </div>
                            <div class="prodTotal cartSection">
                                <p>$${item.total}</p>
                            </div>
                            <div class="cartSection removeWrap">
                                <a href="#" class="remove">x</a>
                            </div>
                        </div>
                    `;
                    // Attach event listener directly to the remove button
                    listItem.querySelector('.remove').addEventListener('click', function(e) {
                      e.preventDefault();
                      deleteBookFromCart(item.book_id);
                    });

                  cartList.appendChild(listItem);
                  updateSubtotal();
                  
              });
            } else {
                // No items in the cart
                console.log('Cart is empty');
            }

        }
    };
    xhr.send();
  }

    // Function to handle promo code submission
  function handlePromoCode() {
    var promoInput = document.querySelector('input[name="promo"]');
    var promoCode = promoInput.value.trim(); // Trim whitespace from input

    // Make AJAX request to check if the promo code exists and get the discount percentage
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/Bibliomaniacs/backend/check_promo_code.php?promoCode=" + promoCode, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse JSON response
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                // Promo code exists, apply discount
                var discountPercentage = response.discountPercentage;
                var subtotalElement = document.querySelector('.subtotal .value');
                var subtotal = parseFloat(subtotalElement.textContent.substring(1)); // Remove '$' sign and parse as float

                // Calculate discount amount
                var discountAmount = parseFloat((subtotal * discountPercentage / 100).toFixed(2));
                var discountedSubtotal = parseFloat((subtotal - discountAmount).toFixed(2));

                // Update subtotal and discount elements in the HTML
                var discountElement = document.querySelector('.subtotal .discount');
                var totalElement = document.querySelector('.subtotal .total');

                discountElement.textContent = '-$' + discountAmount;
                totalElement.textContent = '$' + discountedSubtotal;
            } else {
                // Promo code does not exist or is invalid
                console.log('Invalid promo code');
                alert("invalid promo code");
            }
        }
    };
    xhr.send();
  }

    // Function to handle quantity change
  function handleQuantityChange(bookId, newQuantity) {
    // Make AJAX request to update the quantity in the database
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Bibliomaniacs/backend/update_quantity.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Upon successful update in the database, recalculate item total, subtotal, and total
            var userId = localStorage.getItem('userId');
            updateCartDisplay(userId);

        }
    };

    // Prepare data to send in the request body
    var params = "bookId=" + bookId + "&quantity=" + newQuantity;

    // Send the request
    xhr.send(params);
  }

  document.addEventListener('DOMContentLoaded', function() {

    console.log("DOMContentLoaded event fired");
  
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    updateCartDisplay(userId); // Update cart display based on user ID
    // Attach event listener to handle promo code submission
    var promoButton = document.querySelector('.promoCode a');
    promoButton.addEventListener('click', function (event) {
      event.preventDefault();
      handlePromoCode();
    });


    // Delegate event listener to the document for change events on quantity input fields
    document.addEventListener('change', function(event) {
      if (event.target.classList.contains('cart-qty')) {
          var bookId = event.target.getAttribute('data-bookId');
          var newQuantity = parseInt(event.target.value);
          handleQuantityChange(bookId, newQuantity);
      }
  
    });


    // Select the checkout button element
    var checkoutBtn = document.querySelector('.checkout-btn');

    // Add event listener to the checkout button
    checkoutBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // Retrieve the total value
        var total = document.querySelector('.subtotal .total').textContent;
       
        // Save the total in local storage
        localStorage.setItem('total',  parseFloat(total.substring(1)));

        // Redirect to the checkout page
        window.location.href = checkoutBtn.href;
    });

  });

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
    addToCartBtn.className = "btn hreff";
    addToCartBtn.textContent = "See Book";
  
    bookContentDiv.appendChild(bookTitleDiv);
    bookContentDiv.appendChild(bookAuthorDiv);
    bookContentDiv.appendChild(bookSumDiv);
    bookContentDiv.appendChild(addToCartBtn);
  
    card.appendChild(bookImgDiv);
    card.appendChild(bookContentDiv);
  
    cardContainer.appendChild(card);

    cardContainer.appendChild(card);


    var linkBtn = addToCartBtn; // Use the button as the linkBtn

    linkBtn.addEventListener("click", () => {
        // Get the idbooks associated with this card
        const idbooks = bookData.idbooks;
        window.location.href = `http://localhost/Bibliomaniacs/frontend/single-book-page.html?idbooks=${idbooks}`;
    });

    
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

  // Function to handle sign-out
  function signOut() {
    // Clear user information from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Redirect to sign-in page or refresh the current page
    window.location.href = "http://localhost/Bibliomaniacs/frontend/sign-in-up.html";
    // Alternatively, you can refresh the current page
    // window.location.reload();
  }

  function displayOrders(userId) {
    fetch(`http://localhost/Bibliomaniacs/backend/orders.php?idusers=${userId}`)
      .then(response => response.json())
      .then(orders => {
        const ordersTableBody = document.querySelector('#my-orders-table tbody');
        ordersTableBody.innerHTML = ''; // Clear existing rows
        
        orders.forEach(order => {
          // Create a new table row for each order
          const row = document.createElement('tr');
          row.innerHTML = `
            <td># ${order.order_id}</td>
            <td>${order.date_created}</td>
            <td>${order.status}</td>
            <td>$ ${order.total}</td>
          `;
          ordersTableBody.appendChild(row); // Append row to the table body
        });
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }
  
  
  document.addEventListener("DOMContentLoaded", function() {

      // Get user ID from URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get('idusers');
      console.log(userId);
      // Function to check if user is signed in
      function checkSignInStatus() {
        var userId = localStorage.getItem('userId');
        if (!userId) {
            // User is not signed in, hide the tab content
            var tabContent = document.getElementById('myTabContent');
            if (tabContent) {
                tabContent.style.display = 'none';
            }
            // Show the sign-in buttons
            var signInButtons = document.querySelectorAll('.sign-in-button');
            signInButtons.forEach(function(button) {
              console.log("btn");
              button.classList.remove('hidden');
            });
                          
            var signOutAnchor = document.getElementById('logout');
            if(signOutAnchor){
              signOutAnchor.style.display = 'none';
            } 

        } else {
            // User is signed in, attach event listener to the sign-out anchor
            var signOutAnchor = document.getElementById('logout');
            if (signOutAnchor) {
              signOutAnchor.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default anchor behavior
                signOut(); // Call the sign-out function
              });
            }

                        // Example: Fetch user information from backend using user ID
            fetch(`http://localhost/Bibliomaniacs/backend/userInfo.php?idusers=${userId}`)
            .then(response => response.json())
            .then(userData => {
                console.log(userData);
                const userName = userData.username;

                console.log(userName);
                // Update HTML to display the username
                const userUsernameElement = document.getElementById('user-username');
                if (userUsernameElement) {
                    userUsernameElement.textContent = userName;
                }
            })
            .catch(error => {
                console.error('Error fetching user information:', error);
            });

            var addressForm = document.getElementById('addressForm');

            if (addressForm) {
              addressForm.addEventListener('submit', function(event) {
                  event.preventDefault(); // Prevent form submission
          
                  var formData = new FormData(addressForm); // Get form data
                  // Make AJAX request
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', `http://localhost/Bibliomaniacs/backend/update_address.php?idusers=${userId}`, true);
                  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                  xhr.onreadystatechange = function() {
                      if (xhr.readyState === XMLHttpRequest.DONE) {
                          if (xhr.status === 200) {
                              var response = JSON.parse(xhr.responseText);
                              if (response.success) {
                                  alert('Address updated/inserted successfully');
                                  // You can redirect the user or do any other action here
                              } else {
                                  alert('Error occurred');
                                  // Handle error response
                              }
                          } else {
                              console.error(xhr.responseText);
                              alert('Error occurred');
                              // Handle error response
                          }
                      }
                  };
                  xhr.send(formData);
              });
          
            }

            var accountDetailForm = document.getElementById('accountDetailForm');

            if (accountDetailForm) {
              accountDetailForm.addEventListener('submit', function(event) {
                  event.preventDefault(); // Prevent form submission

                  var formData = new FormData(accountDetailForm); // Get form data

                  // Make AJAX request
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', `http://localhost/Bibliomaniacs/backend/update_account_details.php?idusers=${userId}`,true);
                  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                  xhr.onreadystatechange = function() {
                      if (xhr.readyState === XMLHttpRequest.DONE) {
                          if (xhr.status === 200) {
                              var response = JSON.parse(xhr.responseText);
                              if (response.success) {
                                  alert('Details updated successfully');
                                  // You can redirect the user or do any other action here
                              } else {
                                  alert('Error occurred');
                                  // Handle error response
                              }
                          } else {
                              console.error(xhr.responseText);
                              alert('Error occurred');
                              // Handle error response
                          }
                      }
                  };
                  xhr.send(formData);
              });
            }

            // DataTable initialization (this part should be replaced with actual DataTable initialization)
            var ordersTable = document.getElementById("my-orders-table");
            if (ordersTable) {
              displayOrders(userId);
            }

            displayOrders(userId);
        }
            
      }
      
      checkSignInStatus(); // Check sign-in status when the page loads

      var tabLinks = document.querySelectorAll(".nav-item .nav-link");
      tabLinks.forEach(function(tabLink) {
          tabLink.addEventListener("click", function(event) {
              event.preventDefault();
              var targetTabId = this.getAttribute("href").substring(1);
              showTab(targetTabId);
          });
      });



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


function checkoutPage (){

  function submitPaymentInfo(userId) {
    // Collect form data
    var holderName = document.querySelector('input[name="holderName"]').value;
    var cardNumber = document.querySelector('input[name="card_number"]').value;
    var cardType = document.querySelector('select[name="card_type"]').value;
    var expiry_date = document.querySelector('input[name="expiry_date"]').value;
    var cvv = document.querySelector('input[name="cvv"]').value;

    // Create a FormData object to send form data as key-value pairs
    var formData = new FormData();
    formData.append('holderName', holderName);
    formData.append('card_number', cardNumber);
    formData.append('card_type', cardType);
    formData.append('expiry_date', expiry_date);
    formData.append('cvv', cvv);

    // Make a POST request to the API endpoint
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Bibliomaniacs/backend/set_payment_info.php?userId=" + userId, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Request was successful, handle the response
                console.log(xhr.responseText);
                // Redirect to the checkout page or perform any other action
            } else {
                // Request failed, handle the error
                console.error("Error: " + xhr.statusText);
            }
        }
    };
    // Send the FormData object as the request body
    xhr.send(formData);
  }

  function placeOrder() {
    // Retrieve total and cart ID from local storage
    var total = localStorage.getItem('total');
    var cartId = localStorage.getItem('cartId');
    console.log("cart id: " + cartId);

    // Create a data object to send in the AJAX request
    var data = {
        total: total,
        cartId: cartId
    };

    console.log(data);
    // Make an AJAX POST request to the place_order.php API
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Bibliomaniacs/backend/place_order.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the server if needed
            var responseObj = JSON.parse(xhr.responseText);
            var orderId = responseObj.orderId; 
            localStorage.setItem("orderid", orderId);
            console.log(xhr.responseText);
        }
    };

    // Convert data object to JSON format before sending
    xhr.send(JSON.stringify(data));
  }

  document.addEventListener('DOMContentLoaded', function() {
    var userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

    var form = document.getElementById('checkoutForm');
    form.addEventListener('submit', function(event) {
        var cardnum = document.getElementById("card_number");
        if (cardnum.value.length > 16) {
            alert("card number cannot exceed 16 characters");
            event.preventDefault(); // Prevent form submission
        }else {
            var cvv = document.getElementById("cvv");
            if (cvv.value.length > 4) {
              alert("cvv cannot exceed 16 characters");
              event.preventDefault(); // Prevent form submission
            } else {
                event.preventDefault(); // Prevent the default form submission
                submitPaymentInfo(userId);
                placeOrder();

                // Delay the redirection by resetting the form after a short delay
                setTimeout(function() {
                  form.reset();
                  window.location.href = 'placed-order.html';
                }, 500);
              }
        }
    });
  });

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

    // Set data-book-id attribute for Add To Favorites button
    var addToFavoritesButton = document.getElementById("addToFavoritesButton");
    addToFavoritesButton.setAttribute("data-book-id", bookData['idbooks']);
  }

  function getBookIdFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('idbooks');
  }

  // Function to add book to favorites
  function addToFavorites() {
    // Check if the user is logged in
    if (isLoggedIn()) {
        // Retrieve bookId from the URL
        var bookId = getBookIdFromURL();

        // Retrieve userId from localStorage
        var userId = localStorage.getItem('userId');

        // Send AJAX request to the server to add/remove the book from the user's favorites
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/Bibliomaniacs/backend/add_to_favorites.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Handle success (e.g., show a success message)
                    alert('Book added to favorites!');
                } else {
                    // Handle error (e.g., show an error message)
                    alert('Error adding book to favorites. Please try again later.');
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.send(JSON.stringify({ userId: userId, bookId: bookId }));
    } else {
        // Redirect the user to the login page or show a message indicating they need to log in
        alert('Please log in to add the book to your favorites.');
        // window.location.href = '/login';
    }
  }


  // Function to add item to cart
  function addToCart(bookId) {
    // Check if the user is logged in
    if (isLoggedIn()) {
        // Retrieve userId from localStorage
        var userId = localStorage.getItem('userId');

        // Send AJAX request to the server to add the product to the cart
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/Bibliomaniacs/backend/add_to_cart.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Handle success (e.g., show a success message)
                    // Parse the JSON response
                    var response = JSON.parse(xhr.responseText);
                    // Check if the response indicates success
                    if (response.success) {
                        // Access the cartId from the response
                        var cartId = response.cartId;
                        console.log("Cart ID:", cartId);
                        localStorage.setItem("cartId", cartId);
                    }
                    alert('Product added to cart!');
                } else {
                    // Handle error (e.g., show an error message)
                    alert('Error adding product to cart. Please try again later.');
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.send(JSON.stringify({ userId: userId, bookId: bookId}));
    } else {
        // Redirect the user to the login page or show a message indicating they need to log in
        alert('Please log in to add the product to your cart.');
        // window.location.href = '/login';
    }
  }


  // Attach event listeners to all "Add To Favorites" buttons
  document.addEventListener('DOMContentLoaded', function() {
    var addToFavoritesButtons = document.querySelectorAll('.add-to-favorites-btn');
    addToFavoritesButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var bookId = this.getAttribute('data-book-id');
            addToFavorites(bookId);
        });
    });

    var addToCartButton = document.getElementById('addToCart');
    addToCartButton.addEventListener('click', function() {
        // Retrieve productId from the URL
        var bookId = getBookIdFromURL();

        addToCart(bookId);
        console.log("cart id in add to cart " + localStorage.getItem("cartId"));
    });

  });


  // Function to check if the user is logged in
  function isLoggedIn() {
    // Check if the 'userId' is stored in localStorage
    var userId = localStorage.getItem('userId');

    // If 'userId' exists and is not null, consider the user as logged in
    if (userId) {
        return true; // User is logged in
    } else {
        return false; // User is not logged in
    }
  }


  // Fetch book data based on the book ID from URL
  var bookId = getBookIdFromURL();
  fetchBook(bookId);

}


function favoritesPage() {
  const cardContainer = document.getElementById("card-container");
  const messageBox = document.getElementById("messageBox");

  // Function to delete a favorite book
  function deleteFavorite(bookId, userId) {
    console.log("user id:" + userId);
    console.log("book id:" + bookId);
    console.log("begin deletee");
    console.log("DELETE Request Payload:", { idbooks: bookId, idusers: userId });
    // Make an API call to delete the book from favorites
    fetch(`http://localhost/Bibliomaniacs/backend/delete_favorite.php`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idbooks:bookId, idusers:userId})
    })
    .then(response => {
        if (!response.ok) {
            console.log("book not deleted");
            throw new Error('Failed to delete favorite book');
        }
        location.reload();

    })
    .catch(error => {
        console.error('Error deleting favorite:', error);

    });
  }


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
    addToCartBtn.className = "btn hreff";
    addToCartBtn.textContent = "See Book";

    const deleteIcon = document.createElement('i');
    deleteIcon.className = "margin-left fa-solid fa-trash";
    deleteIcon.style.marginLeft = "15px";
    deleteIcon.style.cursor="pointer";

    deleteIcon.addEventListener('click', function() {
      const bookId = bookData.idbooks;
      deleteFavorite(bookId,userId);

    });

    bookContentDiv.appendChild(bookTitleDiv);
    bookContentDiv.appendChild(bookAuthorDiv);
    bookContentDiv.appendChild(bookSumDiv);
    bookContentDiv.appendChild(addToCartBtn);
    bookContentDiv.appendChild(deleteIcon);
  
    card.appendChild(bookImgDiv);
    card.appendChild(bookContentDiv);
  
    cardContainer.appendChild(card);
  
    cardContainer.appendChild(card);
  
  
    var linkBtn = addToCartBtn; // Use the button as the linkBtn
  
    linkBtn.addEventListener("click", () => {
        // Get the idbooks associated with this card
        const idbooks = bookData.idbooks;
        redirectToPage( `http://localhost/Bibliomaniacs/frontend/single-book-page.html?idbooks=${idbooks}`);
        /*window.location.href = `http://localhost/Bibliomaniacs/frontend/single-book-page.html?idbooks=${idbooks}`;*/
    });
  
    
  };


  async function fetchBookDetails(bookId) {
    try {
      const response = await fetch(`http://localhost/Bibliomaniacs/backend/get_single_book.php?idbooks=${bookId}`);
      return await response.json();
    } catch (error) {
      const errorMessage = 'Error fetching book details: ' + error;
      messageBox.textContent = errorMessage;
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  async function fetchFavorites(userId) {
    try {
      const response = await fetch(`http://localhost/Bibliomaniacs/backend/get_favorites.php?idusers=${userId}`);
      return await response.json();
    } catch (error) {
      const errorMessage = 'Error fetching favorites: ' + error;
      messageBox.textContent = errorMessage;
      throw error;  // Rethrow the error to be caught by the caller
    }
  }

  function displayFavorite(bookId) {
    fetchBookDetails(bookId)
      .then(bookData => {
        createBookCard(bookData);
      })
      .catch(error => {
        const errorMessage = 'Error displaying favorite: ' + error;
        messageBox.textContent = errorMessage;
      });
  }

  const userId = localStorage.getItem('userId');
  if (userId) {
    fetchFavorites(userId)
      .then(favorites => {
        if (favorites.length === 0) {
          const message = "No favorites found for this user.";
          messageBox.textContent = message;
        } else {
          // Display each favorite book
          favorites.forEach(bookId => {
            displayFavorite(bookId);
          });
        }
      })
      .catch(error => {
        const errorMessage = 'Error fetching favorites: ' + error;
        messageBox.textContent = errorMessage;
      });
  } else {
    const message = "Please log in first.";
    messageBox.textContent = message;
  }
  

}

function orderPlacedPage(){
  document.addEventListener("DOMContentLoaded", function() {
    var orderid = document.getElementById("order_id");
    var orderId = localStorage.getItem("orderid");
    orderid.textContent = "#" + orderId;

  });
}

