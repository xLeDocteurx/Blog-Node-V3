let socket;

socket = io.connect();

firebase.auth().onAuthStateChanged(function(user) {
  let logged = document.getElementById("logged-button");
  let loggin = document.getElementById("loggin-button");
  let newuser = document.getElementById("newuser-button");
  if (user) {
    loggin.style.display = "none";
    newuser.style.display = "none";
    logged.style.display = "initial";

    document.getElementById("userpage").innerText = user.email;
  } else {
    loggin.style.display = "initial";
    newuser.style.display = "initial";
    logged.style.display = "none";
  }
});

function login() {
  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      console.log("authentification is a success");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      alert(error.message);
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .catch(function(error) {
      console.log("signing out is a FAILURE !");
    });

  // socket.emit('subuser');
  // console.log("signing out is a success !");
  // localStorage.removeItem('user_email');
}

function register() {
  let email = document.getElementById("newuserEmail").value;
  let password = document.getElementById("newuserPassword").value;
  let username = document.getElementById("newUsername").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log("error : " + error.message);
    });

  // let user = {
  //     email : email,
  //     username : username
  // };
  // socket.emit('register', user);
}
