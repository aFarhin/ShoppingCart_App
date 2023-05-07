let newProducts = document.getElementById("products");
let categoryStatus = "all";
let products;
let r25 = false;
let r50 = false;
let r100 = false;
let r100plus = false;

function guard() {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "../login/login.html";
    alert("login first")
  }
}
guard();

function fetchProducts() {
  return new Promise((resolve, reject) => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
  });
}

function removeActiveClass() {
  document.getElementById("all").setAttribute('class', 'filter');
  document.getElementById("mens").setAttribute('class', 'filter');
  document.getElementById("womens").setAttribute('class', 'filter');
  document.getElementById("jewellery").setAttribute('class', 'filter');
  document.getElementById("electronics").setAttribute('class', 'filter');
}

function allProducts(e) {
  categoryStatus = "all";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function men(e) {
  categoryStatus = "men's clothing";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function women(e) {
  categoryStatus = "women's clothing";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function jewellery(e) {
  categoryStatus = "jewelery";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}
function electronics(e) {
  categoryStatus = "electronics";
  removeActiveClass();
  e.setAttribute('class', 'filter active');
  filterCategory();
}



function randomSize() {
  let res = [];
  let s = ["S", "M", "L", "XL", "XXL"];
  let i = 0, j = 0; k = 0;
  while (i == j || j == k || k == i) {
    i = Math.floor(Math.random() * s.length);
    j = Math.floor(Math.random() * s.length);
    k = Math.floor(Math.random() * s.length);
  }
  res.push(s[i]);
  res.push(s[j]);
  res.push(s[k]);
  return res;
}



function randomColour() {
  let res = [];
  let s = ["red", "blue", "green", "gray", "orange"];
  let i = 0, j = 0; k = 0;
  while (i == j || j == k || k == i) {
    i = Math.floor(Math.random() * s.length);
    j = Math.floor(Math.random() * s.length);
    k = Math.floor(Math.random() * s.length);
  }
  res.push(s[i]);
  res.push(s[j]);
  res.push(s[k]);
  return res;
}

fetchProducts().then((res) => {
  res.forEach((element) => {
    let sizes = randomSize();
    let colours = randomColour();
    element["sizes"] = sizes;
    element["colours"] = colours;
    console.log(element);
  });
  products = res;
  localStorage.setItem("products", JSON.stringify(products));
  populateProductScreen(products);
}).catch((err) => {
  console.error("Error in fetching products: ", err);
});

document.getElementById("search").addEventListener("keyup", () => {
  return filterCategory();
})

function setRange(res) {
  if (res == "0-25") r25 = !r25;
  else if (res == "25-50") r50 = !r50;
  else if (res == "50-100") r100 = !r100;
  else if (res == "100on") r100plus = !r100plus;
  return filterCategory();
}

function filterCategory() {
  if (categoryStatus == "all") return filterRating(products);
  let filteredByCategory = products.filter((elem) => {
    if (elem.category == categoryStatus) return true;
    return false;
  });
  return filterRating(filteredByCategory);
}

function filterRating(filteredByCategory) {
  let rate = document.getElementById("range").value;
  if (rate == 0) return filterSize(filteredByCategory);
  let filteredByRating = filteredByCategory.filter((elem) => {
    if (Math.floor(elem.rating.rate) == rate) return true;
     return false;
  });
  return filterSize(filteredByRating);
}

function filterSize(filteredByRating) {
  let sizeFilters = document.querySelectorAll('input[name="size-filter"]:checked');
  if (sizeFilters.length == 0) return filterColor(filteredByRating);
  let filteredBySize = filteredByRating.filter((elem) => {
    let sizes = elem.sizes;
    for (let i = 0; i < sizeFilters.length; i++) {
      if (sizes.includes(sizeFilters[i].value)) {
        return true;
      }
    }
    return false;
  });
  return filterColor(filteredBySize);
}

function filterColor(filteredBySize) {
  let colorFilters = document.querySelectorAll('input[name="color"]:checked');
  if (colorFilters.length == 0) return filterText(filteredBySize);
  let filteredByColor = filteredBySize.filter((elem) => {
    let colors = elem.colours;
    for (let i = 0; i < colorFilters.length; i++) {
      if (colors.includes(colorFilters[i].value)) {
        return true;
      }
    }
    return false;
  });
  return filterText(filteredByColor);
}

function filterText(filteredByColor) {
  let searchText = document.getElementById("search").value;
  if (searchText == "") return filterRange(filteredByColor);
  let filteredByText = filteredByColor.filter((elem) => {
    if (elem.title.toLowerCase().includes(searchText.toLowerCase())) return true;
    return false;
  });
  filterRange(filteredByText)
}

function filterRange(filteredByText) {
  if (!r25 && !r50 && !r100 && !r100plus) return populateProductScreen(filteredByText);
  let filteredByRange = filteredByText.filter((elem) => {
    if (f1(elem) || f2(elem) || f3(elem) || f4(elem)) return true;
    return false;
  });
  return populateProductScreen(filteredByRange);
  function f1(elem) {
    if (!r25) { return false; }
    else if (elem.price >= 0 && elem.price <= 25) {
      return true;
    }
    return false;
  }
  function f2(elem) {
    if (!r50) { return false; }
    else if (elem.price >= 25 && elem.price <= 50) {
      return true;
    }
    return false;
  }
  function f3(elem) {
    if (!r100) { return false; }
    else if (elem.price >= 50 && elem.price <= 100) {
      return true;
    }
    return false;
  }
  function f4(elem) {
    if (!r100plus) { return false; }
    else if (elem.price >= 100) {
      return true;
    }
    return false;
  }
}



function populateProductScreen(filteredPdts) {
  if (filteredPdts.length == 0) {
    newProducts.innerHTML = `
    
      <p class="para">No products found ,please try different combinations of filtering!</p>
    `;
    return;
  }
  let result = `
    <div class="row">
  `;
  filteredPdts.forEach((element) => {
    result += `
      <div class="one">
        <div class="container" style="border: 1px solid grey; overflow:hidden;">
          <div class="image">
            <img src="${element.image}" alt="Item" height="200px" />
          </div>
          <div class="info">
            <div class="title">
              <h3>$${
                element.title.length > 10
                  ? element.title.substring(0, 10).concat(" ...more")
                  : element.title
              }</h3>
            </div>
            <div class="price-size">
              <div class="price">
                <h4>${element.price}$</h4>
              </div>
              <div class="sizes">
                <h4>${element.sizes[0]}, ${element.sizes[1]}, ${element.sizes[2]}</h4>
              </div>
            </div>
            <div class="colors">
              <h4>Colors:</h4>
              <div class="circles">
                <div class="circle" style="background-color: ${element.colours[0]}"></div>
                <div class="circle" style="background-color: ${element.colours[1]}"></div>
                <div class="circle" style="background-color: ${element.colours[2]}"></div>
              </div>
            </div>
            <div class="rating">
           
            <div>Rating: ${Math.floor(element.rating.rate)} ⭐</div>
            </div>
            <button class="cart" onclick="addToCart(this, ${element.id})" id="addBtn">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
  result += `
    </div>
  `;
  newProducts.innerHTML = result;
}



function addToCart(event, id) {
  if (event.innerHTML == "Added") return;
  event.innerText = "Added";
  console.log(id);
  products.forEach((elem) => {
    if (elem.id == id) {
      let cart = localStorage.getItem("cart");
      if (!cart) { cart = [elem]; }
      else {
        cart = JSON.parse(cart);
        cart.push(elem);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
}

