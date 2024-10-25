let cartIcon = document.getElementById("cart-icon");
let closeCart = document.getElementById("close-cart");
let cart = document.querySelector(".cart");
let content = document.querySelector(".content");
let cartList = document.querySelector(".cart-list");

let quantity = document.querySelector(".quantity");
let total = document.querySelector(".total-price")

let login = document.querySelector(".login")
let newAccount= document.querySelector(".new-account")
let newUserList = document.querySelector(".new-list")
let userList = document.querySelector(".user-list")
let welcome = document.getElementById("welcome")


cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
})


closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
})

let products = [{
    id: "1",
    name: "cam",
    image: "cam.jpg",
    price: "200"

},
{
    id: "2",
    name: "doorbell",
    image: "doorbell.jpg",
    price: "300"

},
{
    id: "3",
    name: "Smart lock",
    image: "lock.jpg",
    price: "100"

},
{
    id: "4",
    name: "EchoShow",
    image: "echo.jpg",
    price: "200"

},
{
    id: "5",
    name: "robot vacuum cleaner",
    image: "robot.jpg",
    price: "800"

},
{
    id: "6",
    name: "Smart plug",
    image: "plug.jpg",
    price: "100"

}
]
let listCards;
if (localStorage.products != "null") {
    listCards = JSON.parse(localStorage.products);
} else {
    listCards = []
}
getProductsLocalStorage()



function initApp() {
    products.forEach((value) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("prod-card");
        newDiv.innerHTML = ` 
    <img src="img/${value.image}"/>
    <h2>${value.name}</h2>
    <span class="mt-auto">${value.price} " L.E."</span>
    <br>
    <button class="btn btn-dark p-1" onclick="addToCart('${value.id}')">Add to Cart</button>
    `;
        content.appendChild(newDiv);
    })

}
initApp()

function addToCart(id) {

    let product = products.find((p) => p.id === id)
    let productIndex = listCards.findIndex((p) => p.id === id)
    if (productIndex > -1) {
    listCards[productIndex].quantity += 1;
    }
    else {
    listCards.push({ ...product, quantity: 1 })
    }
    reloadCard()
}


function reloadCard() {
    cartList.innerHTML = "";
    let totalPrice = 0;
    let count = 0;
    listCards.forEach((value) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        let newLi = document.createElement("li");
        newLi.classList.add("box");
        newLi.innerHTML = `
        <div> <img src="img/${value.image}"></div>
        <div class="title">${value.name}</div>
        <div class="qty">
        <button class = "btn btn-light p-1" onclick="changeQuantity('${value.id}',${value.quantity - 1})">-</button>
        <div> ${value.quantity} </div>
        <button class = "btn btn-light p-1" onclick="changeQuantity('${value.id}',${value.quantity + 1})">+</button>
        </div>
        <div >${value.price} "L.E."</div> 
        `
        cartList.appendChild(newLi);
    })
    total.innerHTML = totalPrice;
    quantity.innerHTML = count;
    localStorage.setItem("products", JSON.stringify(listCards));
}
function changeQuantity(id, newQuantity) {
    let productIndex = listCards.findIndex((p) => p.id === id)
    if (newQuantity === 0) {
        listCards.splice(productIndex, 1)
    }
    else {
        listCards[productIndex].quantity = newQuantity;
    }
    reloadCard()
}

function getProductsLocalStorage() {
      localStorage.getItem("products")
       reloadCard()
    }


let logIn = document.createElement("div");
logIn.classList.add("account")
logIn.innerHTML =`
            <label for="email0">Email</label>
            <input type="email" id="email0" autocomplete="off">
            <label for="password0">Password</label>
            <input type="password" id="password0" autocomplete="off">
            <span id="msg2">enter email and password</span>
            <button class="btn btn-dark" onclick="signIn()">Log in</button>
            <a href="#">Forgotten password?</a>
            <button class="btn btn-success " onclick="signUp()">Create new account</button>
`
login.appendChild(logIn)

function buyNow(){
    logIn.classList.add("active")
    cart.classList.remove("active")
}

function signUp(){
    newUser.classList.add("active");
    logIn.classList.remove("active");
    
  }

let newUser =document.createElement("div");
    newUser.classList.add("new-user");
    newUser.innerHTML = `
             <label for="fname">First name:</label>
            <input type="text" id="fname" autocomplete="given-name">
            <label for="l-name">Last name</label>
            <input type="text" id="l-name" autocomplete="family-name">
            <label for="address">Address</label>
            <input type="text" id="address" autocomplete="off" >
            <label for="emailForm">Email</label>
            <input type="email" id="emailForm" autocomplete="off">
            <label for="passwordForm">Password</label>
            <input type="password" id="passwordForm" autocomplete="off">
            <label for="checkPassword">Confirm password</label>
            <input type="password" id="checkPassword" autocomplete="off">
            <span id="msg"></span>
            <button class="btn btn-dark m-2" onclick="addToUsers()" >Sign-up</button>
    `
    newAccount.appendChild(newUser)
    
    let usersList;

    if (localStorage.usersList != null){
        usersList = JSON.parse(localStorage.usersList)
        reloadUsers()
    }else{
        usersList = []
    }
    
function addToUsers(){
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("l-name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("emailForm").value;
    let pass = document.getElementById("passwordForm").value;
    let pass1 = document.getElementById("checkPassword").value;
  
    let user= {firstName,lastName,address, email,pass}
     usersList.push(user)
     console.log(user)
     console.log(usersList)
     if (firstName && lastName && address && email && pass && pass1 && pass === pass1){

     reloadUsers()
    } else if(pass != pass1){
        alert("Passwords are not matching.");
     }else {
        alert("please fill out all fields.");
     }
  
 }
     function reloadUsers(){
    userList.innerHTML=""
    
    usersList.forEach((user)=>{
    let newUserLi = document.createElement("li");
    newUserLi.classList.add("users1");
    newUserLi .innerHTML = `
        <input type="text" autocomplete="off" value="${user.firstName}">
        <input type="text" autocomplete="off" value="${user.lastName}">
        <input type="text" autocomplete="off" value="${user.address}">
        <input type="email" autocomplete="off" value="${user.email}">
        <input type="password" autocomplete="off" value="${user.password}">
    `
    userList.appendChild(newUserLi);});

    localStorage.setItem("userslog", JSON.stringify(usersList));

    newUser.classList.remove("active");
   
 } 
 
function signIn(){
    
    let savedUsers = JSON.parse(localStorage.getItem("userslog"))
    let logMail = document.getElementById("email0").value
    let logPass = document.getElementById("password0").value
    let msg = document.getElementById("msg2")

    console.log(savedUsers)
    console.log(logMail)
    console.log(logPass)

    
    if (savedUsers.some((user)=>user.email === logMail && user.pass === logPass) ){
    
        logIn.classList.remove("active")
        welcome.innerHTML = "Welcome " + savedUsers.find((user)=>user.email === logMail).firstName

    }else{
        msg.innerHTML = "invalid email or password"
        
    }
}
