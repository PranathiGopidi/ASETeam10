
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http){

    $scope.insertData = function(){
        console.log($scope.formData.topic);
        console.log($scope.formData.comment);
        var data = {
            'topic' : $scope.topic,
            'comment' : $scope.comment,
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('http://127.0.0.1:8081/register',$scope.formData);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            //alert( "failure message: " + JSON.stringify({data: data}));
        });


    };
    $scope.showtopic = function(topic) {
        $scope.topic = topic;
        $http({
            method: "GET",
            url : "https://api.mongolab.com/api/1/databases/ase/collections/asee?apiKey=AdCRHL4_tFAn75DZFj6hht_A394EoAGV",
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            /*$window.location.href = "/lab7_mongo/www/Home.html";*/

        })
    }
});