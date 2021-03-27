const logout = document.querySelector('#logout-btn');
const login = document.querySelector('#login-btn')

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