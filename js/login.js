const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(credential => {
        loginForm.reset();
        window.location.replace("/");
    })

});