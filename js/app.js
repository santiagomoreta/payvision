'use strict';
var payVisionApp = angular.module('payVisionApp',[]);

payVisionApp.controller('mainController', ['$scope','$filter','mainService',
    function($scope,$filter,mainService){
        $scope.init = function(){
          $scope.transactionTypes = [
          {id:"0",name:"Transaction type"},
          {id:"1",name:"Payment"},
          {id:"2",name:"Authorize"},
          {id:"3",name:"Credit"}
          ]		;
          $scope.Currencys = [
          	{id:"0",name:"Currency"},
          	{id:"1",name:"USD"},
          	{id:"2",name:"EUR"},
          	{id:"3",name:"GBP"}
          ]	
          $scope.CreditCards = function(){

          }
          $scope.getTransactions();
        }
        $scope.getTransactions = function(){
	        var getTransactions_IN={};
	        mainService.getTransactions(getTransactions_IN).then(
	          function (data){
	          	$scope.transactionsData = data;
	          	$scope.transactionsDataAux = data;
	          	console.log(data)
	          }, function(error){
	          	console.log(error)
	          });
        }
        $scope.transactionFilter = function(data,filtro){
			var _filtros = $filter('filter')(data, function(item){
						if(filtro.toLowerCase() == item.action.toLowerCase()){
							return true
						}
					return false;
			});
			return _filtros
        }
        $scope.currencyFilter = function(data,filtro){
			var _filtros = $filter('filter')(data, function(item){
						if(filtro.toLowerCase() == item.currencyCode.toLowerCase()){
							return true
						}
					return false;
			});
			return _filtros
        }
        $scope.search = function(){
        	console.log($scope.transactionType);
        	console.log($scope.currency);
        	if($scope.transactionType == "Transaction type" && $scope.currency == "Currency"){
        		$scope.transactionsData = $scope.transactionsDataAux;
        	}else{
				if($scope.currency != "Currency")
					$scope.transactionsData = $scope.currencyFilter($scope.transactionsDataAux,$scope.currency);  
				if($scope.transactionType != "Transaction type")
					$scope.transactionsData = $scope.transactionFilter($scope.transactionsDataAux,$scope.transactionType);  
				if($scope.currency != "Currency" && $scope.transactionType != "Transaction type"){
					var aux = $scope.transactionFilter($scope.transactionsDataAux,$scope.transactionType);  
					$scope.transactionsData = $scope.currencyFilter(aux,$scope.currency);  
				}
        	}     		
        }
}]);

payVisionApp.factory('mainService', ['$q', 'mainModel',
    function( $q,mainModel ){
      var mainService = {};


       mainService.getTransactions= function(getTransactions_IN)
        {
          var deferred = $q.defer();
          mainModel.getTransactions(getTransactions_IN).success(function(data,status) {
            deferred.resolve(data);
           }).error(function(data, status) {
           deferred.reject(data);
           });
        return deferred.promise;

        }
        return mainService;
  }]);

payVisionApp.factory('mainModel',[ '$http', function($http) {
	var URL_TRANSACTIONS ="https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions";

	var mainModel = {};

	mainModel.getTransactions= function(getTransactions_IN) {
		var resultadoPeticion = $http.get(URL_TRANSACTIONS, {
			headers : {
				'authorization': 'Basic Y29kZS1jaGFsbGVuZ2U6cGF5dmlzaW9uZXI=',
				'Content-Type' : 'application/json'
			}
		});

		return resultadoPeticion;
	};
	return mainModel;

}]);