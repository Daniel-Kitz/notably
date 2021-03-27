const signupForm = document.querySelector('#sign-up-form');

signupForm.addEventListener('submit', (e) => {

    e.preventDefault();

    //grab userinfo
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    //send userinfo to firebase
    auth.createUserWithEmailAndPassword(email, password).then(credential => {
        signupForm.reset();
        window.location.replace("/");
    });

});