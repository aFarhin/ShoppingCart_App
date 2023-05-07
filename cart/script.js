
let cartElement = document.getElementById("cart-product");
let checkPrice = document.getElementById("checkout");
let heading = document.getElementById("heading");
let products;

function guard(){
    if(!localStorage.getItem("currentUser")){
        window.location.href = "../login/login.html";    
    }
  }
  guard();

  function getTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach((element) => {
      totalPrice += element.price;
    });
    return totalPrice;
  }
  

function fetchCartProduct(){
    let cart = localStorage.getItem("cart");
    // console.log(cart)
    if(!cart){
        cartElement.innerHTML = `
        <div class="cart-element">
            <h1 style=" font-weight:500; color: rgb(42, 42, 42); width: 100%; font-size:40px">Oops, No items in cart...</h1>
        </div>;`
        checkPrice.remove();
        heading.remove();
    }
    else{
        cart = JSON.parse(cart);
        products = cart;
        let res = "";
        let check = "";
        check += `
            <h4 class="check-list">Checkout List</h4>
        `;
        let totalPrice = getTotalPrice(cart);
        cart.forEach((element, index) => {
            check += `
            <div class="checked">
                <h5>${index + 1}. ${element.title}</h5>
                <h6>${element.price}$</h6>
            </div>
            `;
            res += `
            <div class="one">
        <div class="container" style="border: 1px solid grey; overflow:hidden;">
          <div class="image">
            <img src="${element.image}" alt="Item" height="200px" />
          </div>
          <div class="info">
            <div class="title">
              <h3> ${element.title.length > 10
              ? element.title.substring(0, 10).concat(" ...more")
              : element.title}</h3>
            </div>
            <div class="price-size">
              <div class="price">
                <h5>${element.price}$</h5>
              </div>
              <div class="sizes">
                <h5>${element.sizes[0]}, ${element.sizes[1]}, ${element.sizes[2]}</h5>
              </div>
            </div>
            <div class="colors">
              <h5>Colors:</h5>
              <div class="circles">
                <div class="circle" style="background-color: ${element.colours[0]}"></div>
                <div class="circle" style="background-color: ${element.colours[1]}"></div>
                <div class="circle" style="background-color: ${element.colours[2]}"></div>
              </div>
            </div>
            <div class="rating">
           
            <h5>Rating: ${Math.floor(element.rating.rate)} ⭐</h5> 
            

                    </div>
                    <button onclick="removeFromCart(this, ${element.id})" class="cart">Remove from Cart</button>
                </div>
                </div>
                </div>`;
        });
        check += `
            <hr/>
            <div class="price-total">
                <h6 class="total"> Total</h6>
                <h6>${Math.round(totalPrice)}$</h6>
            </div>
            <hr/>
            <button  onClick="checkoutCart()" class="check-button">Click to Checkout</button>
        `;
        document.getElementById("checkout").innerHTML = check;
        cartElement.innerHTML = res;
    }
    
}

fetchCartProduct();

function removeFromCart(event, id){
    event.innerHTML = "Removed";
    products.forEach((element, index, object)=>{
        if(element.id == id) object.splice(index, 1);
    });
    localStorage.setItem("cart", JSON.stringify(products)); 
    fetchCartProduct();  
}

function checkoutCart(event){
  window.location.href = "../razorpay/index.html";  
}
