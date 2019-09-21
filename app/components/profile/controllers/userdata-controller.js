var app = angular.module('dropshipping.userDataController',
													[
													 'dropshipping.sharedService'
													,'dropshipping.geoService'
													,'dropshipping.sharedDirective'
												   ]);


app.controller('UserDataController',
									[
									 '$scope'
									,'$route'
									,'$location' 
									,'locale'
									,'Auth'
									,'ErrorMessage'
									,'$firebaseArray'
									,'GetGeoData'
									,'$http'
									,function (
												$scope
												,$route
												,$location
												,locale
												,Auth
												,ErrorMessage
												,firebaseArray
												,GetGeoData
												,$http
											){

			$scope.name = "userData";
			$scope.auth = Auth;
			$scope.$route = $route;
			$scope.$location = $location;
			$scope.setLocale = locale.setLocale;
			$scope.errorMessage = ErrorMessage;
			$scope.geoData = GetGeoData;

			var currentUser  = $scope.auth.$getAuth();

		/**
		 * @author dpassis
		 * @description Get a json with Adress informations
		 * @param zipCode zipCode passed in resource.query
		 * 
		 */
		 $scope.getCep = function(){
			
				var resourceCep  = $scope.geoData.getCep;
	
				resourceCep.query({cep:$scope.userData.zipcode}, function (data) {
					console.log(data);
					$scope.userData.zipcode = data.cep,
					$scope.userData.street = data.logradouro,
					$scope.userData.district = data.bairro,
					$scope.userData.city = data.localidade,
					$scope.userData.state = data.uf
					
				})
		};

		/**
		 * @author dpassis
		 * @description Save userData based on the $scope Data get by form
		 * Data are saved in the Firebase Database and the user Display Name is update
		 * in Firebase Authentication
		 * 
		 */
		$scope.writeUserData = function () {

			$scope.succesWriteUserData = false;

			var userFinal = {

					firstName : 		$scope.userData.firstName,
					lastName : 			$scope.userData.lastName,
					email: 				currentUser.email,
					gender : 			$scope.userData.gender,
					birthday : 			$scope.userData.birthday,
					zipcode :  			$scope.userData.zipcode ,
					street: 			$scope.userData.street,
					housenumber:		$scope.userData.housenumber,
					add_address_data: 	$scope.userData.add_address_data,
					district: 			$scope.userData.district,
					city :  			$scope.userData.city ,
					state :				$scope.userData.state
			}
				

			var ref = firebase.database().ref('customer_data/' + currentUser.uid);
	
			ref.set(userFinal,
				function (error) {
					if (error) {
						$scope.error = $scope.errorMessage.getErrorMessageAuth('auth.unknownError');
					  } else{
						currentUser.updateProfile({
							displayName: userFinal.firstName+' '+userFinal.lastName,
						  }).then(function() {
							  $scope.$location.path("/profile/successUserData");
									$scope.$apply();
						  }).catch(function(error) {
							$scope.succesWriteUserData = false;
							$scope.error = $scope.errorMessage.getErrorMessageAuth('auth.unknownError');
						  });
	
					  }
				}
			);
		};

}]);




