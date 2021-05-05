const logout = document.querySelector('#logout-btn');
const login = document.querySelector('#login-btn')

var emptyCells = document.getElementsByClassName('clickable');
var addModal = new bootstrap.Modal(document.getElementById('exampleModal'));

var lastclicked = 0;

for(var i = 0; i < emptyCells.length; i++) {
    emptyCells[i].addEventListener("click", bindClick(i));
}

function bindClick(i) {
 return function() {
     console.log("you clicked region number " + i);
     lastclicked = i;
     addModal.toggle();
 };
}

window.addEventListener('load', (e) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            logout.classList.remove("d-none");
            login.classList.add("d-none");
        } else {
            logout.classList.add("d-none");
            login.classList.remove("d-none");
        }
    });
});


logout.addEventListener('click', (e) => {
    
    e.preventDefault();

    auth.signOut().then(() => {
        console.log("logged out");
    });

});

login.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace("/login.html");
});