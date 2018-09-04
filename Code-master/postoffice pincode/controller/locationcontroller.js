app.controller("myctrl",($scope,myfactory)=>{
		$scope.doSearch=()=>{
			var promise = myfactory.callServer($scope.search);
			promise.then((data)=>{
				$scope.result = data.data.PostOffice;
				console.log(data);
				},(err)=>{
				$scope.result = err;
				console.log("Get the Err in Promise...");
			})
			
		}
	});