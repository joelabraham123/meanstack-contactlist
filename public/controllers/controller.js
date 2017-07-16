var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello World from controller");

//to refresh the page with this function
var refresh= function(){
	$http.get('/contactList').then(function(response){
		console.log("I got the data i requested");
		$scope.contactList = response.data;	//puts data received into HTML file of browser
		$scope.contact = {};		//$scope.contact is an object
		//upper line clears the input box after refresh is called
	});
};	

refresh();

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('contactList',$scope.contact).then(function(response){
			console.log(response.data);
			refresh();
		});	//sends new input data to server
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactList/' + id).then(function(response){
			refresh();
		});
	};
	
	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactList/' + id).then(function(response){
			$scope.contact = response.data;		//puts response into input boxes..contact is ng-model stuff
		});
	};
	
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/' + $scope.contact._id,$scope.contact).then(function(response){		//sends modified data to server
		refresh();
	});
	};
	
	$scope.deselect = function(){
		$scope.contact = "";		//to clear everthing
	}
	//making array of persons
	//var contactList = [person1,person2,person3];
	//$scope is glue between index.html(view) and controller
	//$scope.contactList = contactList;	//allows this array to be used in index.html
	
}]);