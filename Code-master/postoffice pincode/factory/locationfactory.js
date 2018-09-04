app.factory("myfactory",($http,$q)=>{
		var object = {
			callServer:(searchParam)=>{
				var pr = $q.defer();
                var url ="http://postalpincode.in/api/pincode/"+searchParam;
				$http.get(url).then(function(data){
					pr.resolve(data);
					//console.log("Data is Success...",data);
				}
					,function(err){
					pr.reject(err);	
					console.log("Data is Error");
					});
				
				return pr.promise;
				}
		}
		return object;
	});	