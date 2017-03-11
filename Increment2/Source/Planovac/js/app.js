var app = angular.module("myApp", [])


app.controller("RegisterController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    $scope.createFixed = function() {
        alert("hi");
        $window.location.href = '/lab7_mongo/www/Login.html';
    };

    $scope.pageClass = 'register';
    $scope.register = function(username, password, email) {

        $http({
            method: 'POST',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            data: JSON.stringify({
                name: username,
                password: password,
                email: email
            }),
            contentType: "application/json"
        }).success(function() {
            $scope.userName ="";
            $scope.password ="";
            $scope.email ="";

            $scope.msg ="User created successfully";
            /*$window.location.href = "/lab7_mongo/www/Login.html";*/
        })
    }

});


app.controller("LoginController", function ($scope, $http, $httpParamSerializerJQLike,$window) {

    $scope.pageClass = 'login';
    $scope.login = function(username, pword) {
        sessionStorage.setItem('username1',username);
        $scope.uname = username;
        alert("You're logged in as "+$scope.uname);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            $window.location.href = "home.html";

        })

    }

});

app.controller("ProfileController", function ($scope, $http, $httpParamSerializerJQLike,$window) {

    $scope.pageClass = 'profile';

        $scope.username = sessionStorage.getItem("username1");
        alert($scope.username);
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            //$window.location.href = "home.html";

        })


});

app.controller("DiscussController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
//alert("hi");
    $scope.pageClass = 'register';
$scope.register = function(topic,comment) {
   
$http({
    method: 'POST',
    url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
    data: JSON.stringify({
                topic: topic,
				comment: comment
                }),
    contentType: "application/json"
}).success(function() {
    $scope.topic ="";
    $scope.comment ="";
    
    $scope.msg ="User created successfully";
    /*$window.location.href = "/lab7_mongo/www/Login.html";*/
        })
}
$scope.showtopic = function(topic) {
   $scope.topic = topic;
    alert($scope.topic);
$http({
    method: 'GET',
    url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',    
    /*contentType: "application/json"*/
}).then(function success(data) { 
    //alert(data);
   $scope.data1 = angular.fromJson(data);
    /*$window.location.href = "/lab7_mongo/www/Home.html";*/

})
}   
}); 





