app.controller("myctrl",($scope,myfactory,$filter,$window,$localStorage)=>{ 
$scope.call=()=>{
    
var promise = myfactory.callServer();
    promise.then(function(data){
        $filter('filter')(data,function (d){
            if( (d.Name == $scope.name)&&(d.Password==$scope.pass)){
            $localStorage.name =$scope.Name;
             Rout();
                }
           
            else{
                console.log("not");
            }
                        })
            
			},function(err){
				$scope.result  = err;
    		});
 }
 function Rout(){
     //$window.open('https://www.google.com', '_blank');
     $window.open("http://127.0.0.1:42151/Angular/Welcome/pages/welcome.html","_self");
    
     
    //console.log("dsdsdsd00");
 } 
    
});