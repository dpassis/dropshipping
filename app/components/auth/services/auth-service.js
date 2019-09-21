var app = angular.module('dropshipping.authService',['firebase']);

app.factory("Auth", ["$firebaseAuth",

            /**
             * @author dpassis
             * @description Return a instance of FirebaseAuth
             * @param $firebaseAuth
             */
            function($firebaseAuth) {
                 return $firebaseAuth();
            }
]);
 


app.factory("UserData", ["$window","$location","$firebaseAuth",function($window,$location,$firebaseAuth) {
    
    return{

        /**
         * @author dpassis
         * @description Function to verify if a user populate required data, redirect to form if the user.displayName is null
         * @param errorCode
         */
        validateUser : function () {
            var user = JSON.parse($window.localStorage.getItem("firebase:authUser:AIzaSyDcXQYwSBbCwKeztJbWQ730G3uOf7Q7Gm8:[DEFAULT]"));
            if(user != null)
                if(user.displayName == null){
                    $location.path("/profile/userdata");
                }
        },
        

        /**
         * @author dpassis
         * @description Function to retrieve user data based in localStorage
         * @param errorCode
         * @returns user parsed JSON
         */
        getUserData : function () {
            var user = JSON.parse($window.localStorage.getItem("firebase:authUser:AIzaSyDcXQYwSBbCwKeztJbWQ730G3uOf7Q7Gm8:[DEFAULT]"));
         	if(user != null){
                return user;
            }
        }

    }
}]);