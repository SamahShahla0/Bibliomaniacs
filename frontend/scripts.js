var slideIndex = 1;
showDivs(slideIndex);

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

/*function showads(){
    axios.get('http://localhost/ecommerce-project/ecommerce-server/get_ads.php').then((response) => {
      const data = response.data;
      data.forEach((ad, i) => {
        document.getElementById("ad").insertAdjacentHTML('beforebegin', '<img class="mySlides" src="data:image/png;base64,'+ad.ad+'" ></img>')
        document.getElementById("ad").insertAdjacentHTML('beforeend', '<span class="hero-badge demo hero-border hero-transparent hero-hover-white" onclick="currentDiv('+(i+2)+')"></span>')
      })
    })
  }*/