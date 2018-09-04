app.controller("myctrl", ($scope, myfactory, $filter, $window, $localStorage) => {
    $scope.call = () => {
        var promise = myfactory.callServer();
        promise.then(function (data) {
            $filter('filter')(data, function (d) {
                if ((d.Name == $scope.name) && (d.Password == $scope.pass)) {
                   $scope.store = $localStorage;
                    $scope.store.Name = $scope.name;
                    Rout();
                } else {
                    console.log("not");
                }
            })

        }, function (err) {
            $scope.result = err;
        });
    }

    function Rout() {
        //$window.open('https://www.google.com', '_blank');
       // $window.open("http://127.0.0.1:38052/Welcome/pages/welcome.html", "_self");
         location.href = "welcome.html";

        //console.log("dsdsdsd00");
    }

});
