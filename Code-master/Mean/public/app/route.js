angular.module('appRoutes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider // Create routes

            // Home Route
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })

            // Aboute Route
            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })
            .when('/register', {
                templateUrl: 'app/views/pages/users/register.html',
                controller: 'regCtrl',
                controllerAs: 'register'
            })
            .when('/login',{
              templateUrl:'app/views/pages/users/login.html'
            })

            .when('/logout',{
              templateUrl:'app/views/pages/users/logout.html'
            })
            .when('/profile',{
              templateUrl:'app/views/pages/users/profile.html'
            })
             .when('/facebook/:token',{
              templateUrl:'app/views/pages/users/social/social.html'
            })

           .otherwise({ redirectTo: '/' });

        // Required for no base (remove '#' from address bar)
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });
