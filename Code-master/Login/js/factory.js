app.factory("myfactory",($http,$q)=>{
    var object ={
        callServer(){
   //  console.log("allServer call");
            var pr = $q.defer();
            var url ="server.json";
            $http.get(url).then(function(data){
					//console.log("result ",data);
                	pr.resolve(data.data.User);
               
            },function(err){
					pr.reject(err);
				});
				return pr.promise;
				
            
        
        }
    }
    return object;
});