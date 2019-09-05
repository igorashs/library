let uiConfig = {
  callbacks: {
    // Called when the user has been successfully signed in.
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      document.querySelector('.modal-ui-wrapper').style.display = 'none';
      return false;
    }
  },

  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: ':3',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign(':3');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.disableAutoSignIn();
// ui.start('#firebaseui-auth-container', uiConfig);
