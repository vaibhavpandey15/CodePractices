angular.module('userServices', [])

	.factory('User', function($http) {
		var userFactory = {}; // Create the User object

		// User.create(regData)
		userFactory.create = function(regData) {
			return $http.post('/api/user', regData); // Return data from end point to controller
		};

		return userFactory;
	});
