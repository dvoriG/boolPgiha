let btnLgin = document.getElementById('log_in').addEventListener('click', PageOne);
let btnSign = document.getElementById('sign_in').addEventListener('click', PageTwo);

let btnClsLogin = document.getElementById('btnSigninCls').addEventListener('click', function() {
    document.getElementById("signForm").style.display = "none";
})

let btnClsLgin = document.getElementById('btnLginCls').addEventListener('click', function() {
    document.getElementById("logForm").style.display = "none";
})

let btnLogin = document.getElementById("btnsaveLgin").addEventListener('click', login)
let btnSignin = document.getElementById("btnsaveSignin").addEventListener('click', signIn);

function PageOne() {
    document.getElementById("logForm").style.display = "block";
    document.getElementById("signForm").style.display = "none";
}

function PageTwo() {
    document.getElementById("logForm").style.display = "none";
    document.getElementById("signForm").style.display = "block";
}

function User(username, password) {
    this.username = username;
    this.password = password;
    this.highScore = 0;
    this.save = function() {
        localStorage.setItem(this.username, JSON.stringify(this));
        localStorage.setItem('currentUser', username);
    }
}

function signIn() {
    let username = document.getElementById("txtEmailSignin").value;
    let password = document.getElementById("txtPswdSignin").value;
    let confirmPassword = document.getElementById("txtPswdCheckSignIn").value;
    // validate email address format
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(username)) {
        alert("Please enter a valid email address.");
        return;
    }
    if (!username || !password || !confirmPassword) {
        alert("Please enter all required fields.");
        return;
    }
    if (localStorage.getItem(username)) {
        alert("You are already signed in.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Your password does not match the confirmation password.");
        return;
    }
    if (password.length < 4) {
        alert("Password must be at least 4 characters long.");
        return;
    }
    let user = new User(username, password);
    user.save();
    alert("Details saved successfully!");
    window.location.href = "./levels.html";
}

function login() {
    let username = document.getElementById("txtLgin").value;
    let password = document.getElementById("txtLginPswd").value;

    if (!username || !password) {
        alert("Please enter all required fields.");
        return;
    }
    let savedUser = JSON.parse(localStorage.getItem(username));
    if (savedUser && savedUser.password === password) {
        localStorage.setItem('currentUser', username);
        alert(savedUser.username + " is logged in!");
        window.location.href = "./levels.html";
    } else {
        alert("Incorrect username or password.");
    }
}