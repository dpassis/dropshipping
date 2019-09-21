var app = angular.module('dropshipping.geoService',['ngResource']);



app.factory("GetGeoData",['$resource', function ($resource) {

         return {

            getCep      : $resource('https://viacep.com.br/ws/:cep/json',{cepCode:'@cep'}, {query: {method:'GET', isArray: false}})
        

        }
    }

]);


    
  

