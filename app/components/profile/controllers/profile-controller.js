var app = angular.module('dropshipping.profileController',
													[
													 'dropshipping.sharedService'
													,'dropshipping.geoService'
													,'dropshipping.sharedDirective'
												   ]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/profile/myaccount', {
		templateUrl: 'app/components/auth/views/myAccountView.html',
		controller: 'ProfileController',
		resolve: {
			"currentAuth": ["Auth", function(Auth) {
				return Auth.$requireSignIn();
			}],
			"userValidate": ["UserData", function(UserData){
				return UserData.validateUser();
			}],
			langs: function (locale) {
				return locale.ready('pfl');
			}
		}
	})

	.when('/profile', {
		templateUrl: 'app/components/profile/views/profileView.html',
		resolve: {
				 "currentAuth": ["Auth", function(Auth) {
					return Auth.$requireSignIn();
				 }],
				 "userValidate": ["UserData", function(UserData){
					return UserData.validateUser();
				}],
						deps: ['$ocLazyLoad', function ($ocLazyLoad) {
							return $ocLazyLoad.load([{
									name: 'cssAuthView',
									files: [
											'css/cssAuthView.css'
									]
							}]);
						}],
				langs: function (locale) {
				  return locale.ready('pfl');
				}
			}

	})

	.when('/profile/userdata', {
		templateUrl: 'app/components/profile/views/userDataView.html',
		controller: 'UserDataController',
		resolve: {
			"currentAuth": ["Auth", function(Auth) {
				return Auth.$requireSignIn();
			 }],
			 "userValidate": ["UserData", function(UserData){
				return UserData.validateUser();
			}],
			langs: function (locale) {
						return locale.ready('pfl');
							},
			loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
											 
					var deferred = $q.defer();
													 
			require(["userDataController"], function () {
																
				$ocLazyLoad.inject('dropshipping.userDataController');
				deferred.resolve();
				});
			
				return deferred.promise;
			}]
		}
	})


	.when('/profile/successUserData', {
		templateUrl: 'app/components/profile/views/successUserDataView.html',
		resolve: {
			"currentAuth": ["Auth", function(Auth) {
				return Auth.$requireSignIn();
			}],
			langs: function (locale) {
				return locale.ready('pfl');
			}
		}
	})

	.when('/profile/loginData', {
		templateUrl: 'app/components/profile/views/loginDataView.html',
		controller: 'LoginDataController',
		resolve: {
			"currentAuth": ["Auth", function(Auth) {
				return Auth.$requireSignIn();
			}],
			"userValidate": ["UserData", function(UserData){
				return UserData.validateUser();
			}],
			langs: function (locale) {
				return locale.ready('pfl');
			},
			loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
											 
				var deferred = $q.defer();
												 
			require(["loginDataController"], function () {
															
				$ocLazyLoad.inject('dropshipping.loginDataController');
				deferred.resolve();
			});
		
			return deferred.promise;
			}]
		}
	})


	.when('/profile/personalData', {
		templateUrl: 'app/components/profile/views/loginDataView.html',
		controller: 'LoginDataController',
		resolve: {
			"currentAuth": ["Auth", function(Auth) {
				return Auth.$requireSignIn();
			}],
			"userValidate": ["UserData", function(UserData){
				return UserData.validateUser();
			}],
			langs: function (locale) {
				return locale.ready('pfl');
			},
			loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
											 
				var deferred = $q.defer();
												 
			require(["loginDataController"], function () {
															
				$ocLazyLoad.inject('dropshipping.loginDataController');
				deferred.resolve();
			});
		
			return deferred.promise;
		}]
		}
	})

}]);








