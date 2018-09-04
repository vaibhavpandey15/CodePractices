angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth, $location, $timeout, User, $route){
  var app = this;

        if(Auth.isLoggedIn()){
          console.log("User is loggrd in ");
        }else{
          console.log("User is not Logged in");
        }
  // Function to submit form and register account
  this.doLogin = function(loginData) {
      app.loading = true; // To activate spinning loading icon w/bootstrap
      app.errorMsg = false; // Clear error message each time the  user presses submit

      // Initiate service to save the user into the dabase
      Auth.login(app.loginData).then(function(data) {
          if (data.data.success) {
              app.loading = false; // Once data is retrieved, loading icon should be cleared
              app.successMsg = data.data.message + '...Redirecting'; // Create Success Message
              // Redirect to home page after 2000 miliseconds
              $timeout(function() {
                  $location.path('/about');
                  $route.reload();
              }, 2000);
          } else {
              app.loading = false; // Once data is retrieved, loading icon should be cleared
              app.errorMsg = data.data.message; // Create an error message
          }
        });
      }
      this.logout =function () {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
       }, 2000);


  };
});
