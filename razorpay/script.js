let cart = localStorage.getItem("cart");
cart = JSON.parse(cart);

function getTotalPrice(cart) {
  let totalPrice = 0;
  cart.forEach((element) => {
    totalPrice += element.price;
  });
  return totalPrice;
}

var thanks = document.getElementById("thanks");
var sh = document.getElementById("sh");
var btn = document.getElementById("rzp-button1");
var s = document.getElementById("s");

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq",
    amount: getTotalPrice(cart) * 100,
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order",
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  localStorage.removeItem('cart');
  btn.style.display = "none";
  thanks.style.display = "block";
  sh.style.display = 'block';
  e.preventDefault();
};


