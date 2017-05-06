var app = angular.module("myApp", [])
app.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
app.controller("RegisterController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    $scope.createFixed = function() {
        alert("hi");
        $window.location.href = '/lab7_mongo/www/Login.html';
    };
    $scope.pageClass = 'register';
    $scope.register = function(firstname, lastname, username, mobile, sso, email, password, cpassword) {
        $http({
            method: 'POST',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            data: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                username: username,
                mobile: mobile,
                sso: sso,
                email: email,
                password: password,
                cpassword: cpassword
            }),
            contentType: "application/json"
        }).success(function() {
            $scope.firstname ="";
            $scope.lastname ="";
            $scope.username ="";
            $scope.mobile ="";
            $scope.sso ="";
            $scope.email ="";
            $scope.password ="";
            $scope.cpassword ="";

            $scope.msg ="User created successfully";
            /*$window.location.href = "/lab7_mongo/www/Login.html";*/
        })
    }

});


app.controller("LoginController", function ($scope, $http, $httpParamSerializerJQLike,$window) {

    $scope.pageClass = 'login';
    $scope.login = function(username, pword) {
        //sessionStorage.setItem('username1',username);
        if(username==null||pword==null) {
            alert("Username/ password can't be empty");
            $window.location.replace("login.html");
        }
        else {
        $scope.uname = username;
        $scope.pass = pword;
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).success(function(response) {
            //alert(response);
            //$scope.data1 = angular.fromJson(data);
            var list = response;
            var count = 0;
            for (i = 0; i < list.length; i++) {
                if (list[i].username == $scope.uname && list[i].password == $scope.pass) {
                    $scope.user=list[i].username;
                    sessionStorage.setItem("firstname", list[i].firstname);
                    sessionStorage.setItem("lastname", list[i].lastname);
                    sessionStorage.setItem("username", list[i].username);
                    sessionStorage.setItem("mobile", list[i].mobile);
                    sessionStorage.setItem("sso", list[i].sso);
                    sessionStorage.setItem("sid", list[i].sid);
                    alert("You're logged in as "+$scope.uname);
                    $window.location.href = "home.html";
                    exit(0);
                }
                else {
                    //alert("Incorrect username/password");
                    count++;
                }
                //$window.location.href = "home.html";
            }
            if(count == list.length)
            {
                alert("Incorrect username/password");
                $window.location.replace("login.html");
            }
        })
        }

    }

});

//angular.module('myApp',[])
app.controller('ClassController', function ($scope, $http) {
    $scope.viewDeleteClass = function(){
        var page = document.getElementById("innerform3");
        page.style.visibility='visible';
    }
    $scope.showPage = function(){
        var page = document.getElementById("innerform");
        page.style.visibility='visible';
    }
    $scope.viewClassPage = function(){
        //alert("in view class function");
        var page = document.getElementById("innerform2");
        page.style.visibility='visible';
    }
    $scope.username = sessionStorage.getItem("username");
    var uname = sessionStorage.getItem("username");
    $scope.pageClass = 'classes';
    $scope.addClass = function(classes) {
        //alert("inside function");
        var e = document.getElementById("classes");
        //alert(e);
        var cname = e.options[e.selectedIndex].value;
        //alert(cname);
        var str_array = cname.split(',');
        $http({
            method: 'PUT',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3&q={"username":"'+uname+'"}',
            data: JSON.stringify({
                "$set" : {classname: str_array[0], fromtime: str_array[1], totime: str_array[2], location: str_array[3]}
            }),
            type: "PUT",
            contentType: "application/json"
        }).success(function() {
            $scope.classname ="";
            $scope.fromtime ="";
            $scope.totime ="";
            $scope.location ="";
            alert("Class Successfully added");
            location.reload();
        })
    }
    $scope.deleteClass = function() {
        $http({
            method: 'PUT',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3&q={"username":"'+uname+'"}',
            data: JSON.stringify({
                "$unset": {classname: "", fromtime: "", totime: "", location: ""}
            }),
            type: "PUT",
            contentType: "application/json"
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            //$window.location.href = "home.html";
            alert("Class Deleted");
            location.reload();
        })
    }
    $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
    }).then(function success(data) {
        //alert(data);
        $scope.data1 = angular.fromJson(data);
        //$window.location.href = "home.html";
    })
    var map;
    var mapOptions;
    var mp;
    var st;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true

    });
    var directionsService = new google.maps.DirectionsService();
    var getLocation = function() {

        navigator.geolocation.getCurrentPosition(success, error);
    }
    function success(position) {

        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

        $.getJSON(GEOCODING).done(function(location) {
            $('#address').html(location.results[0].formatted_address);
            st=location.results[0].formatted_address


        })

    }
    function error(err) {
        console.log(err)
    }
    getLocation();

    $scope.initialize = function () {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 3,
            center: pos
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };



    $scope.calcRouteLoc = function () {


        var markerStart,markerEnd;
        var infowindowStart = new google.maps.InfoWindow();
        var infowindowEnd = new google.maps.InfoWindow();
        if(markerStart!=null)
            markerStart.setMap(null);
        if(markerEnd!=null)
            markerEnd.setMap(null);
        if(infowindowStart!=null)
            infowindowStart.close();
        if(infowindowEnd!=null)
            infowindowEnd.close();
        mp = "Miller Nichols Library, East 51st Street, KCMO, MO, United States";
        var end = mp;

        var start = st;

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            directionResponse=response;
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
            }

        });
        var startcityWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions/q/"+start+".json";
        var endcityWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions/q/"+end+".json";
        $http.get(startcityWeatherUrl).success(function(data) {
            if(data.current_observation==null){
                startcityWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions"+data.response.results[0].l+".json";
                $http.get(startcityWeatherUrl).success(function(data) {
                    markerStart=new google.maps.Marker({
                        map:map
                    });
                    markerStart.setPosition(directionResponse.routes[0].legs[0].start_location);
                    infowindowStart.setContent('<p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                    infowindowStart.open(map,markerStart);
                });
            }
            else{
                markerStart=new google.maps.Marker({
                    map:map
                });
                markerStart.setPosition(directionResponse.routes[0].legs[0].start_location);
                infowindowStart.setContent('<p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                infowindowStart.open(map,markerStart);
            }
        });
        $http.get(endcityWeatherUrl).success(function(data) {
            if(data.current_observation==null){
                endcityWeatherUrl="https://api.wunderground.com/api/36b799dc821d5836/conditions"+data.response.results[0].l+".json";
                $http.get(endcityWeatherUrl).success(function(data) {
                    markerEnd=new google.maps.Marker({
                        map:map
                    });
                    markerEnd.setPosition(directionResponse.routes[0].legs[0].end_location);
                    infowindowEnd.setContent('<p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                    infowindowEnd.open(map,markerEnd);
                });
            }
            else{
                markerEnd=new google.maps.Marker({
                    map:map
                });
                markerEnd.setPosition(directionResponse.routes[0].legs[0].end_location);
                infowindowEnd.setContent('<p class="weatherDetails"> Temperature is '+data.current_observation.temp_f+' and '+data.current_observation.weather+'<img src="'+data.current_observation.icon_url+'"/></p>');
                infowindowEnd.open(map,markerEnd);
            }
        });
    };


    google.maps.event.addDomListener(window, 'load', $scope.initialize);
});

app.controller("TasksController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    //alert("tasks");
    $scope.viewDeleteTasks = function(){
        var page = document.getElementById("innerform3");
        page.style.visibility='visible';
    }
    $scope.addTasks = function(){
        var page = document.getElementById("innerform");
        page.style.visibility='visible';
    }
    $scope.showTasks = function(){
        //alert("in show tasks function");
        var page = document.getElementById("innerform2");
        page.style.visibility='visible';
    }
    $scope.username = sessionStorage.getItem("username");
    var uname = sessionStorage.getItem("username");
    $scope.pageClass = 'Tasks';
    $scope.addTask = function(taskname,deadline) {
        // alert("inside function");
        //var taskn = document.getElementById("taskn");
        //var dl = document.getElementById("deadline");
        //alert(taskname);
        $http({
            method: 'PUT',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3&q={"username":"'+uname+'"}',
            data: JSON.stringify({"$set" : {taskname:taskname, deadline:deadline}
            }),
            type: "PUT",
            contentType: "application/json"
        }).success(function() {
            $scope.taskname ="";
            $scope.deadline ="";
            alert("Task Successfully added");
            location.reload();
        })
    }
    $scope.deleteTasks = function() {
        $http({
            method: 'PUT',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3&q={"username":"'+uname+'"}',
            data: JSON.stringify({"$unset" : {taskname:"", deadline:""}
            }),
            type: "PUT",
            contentType: "application/json"
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            //$window.location.href = "home.html";
            alert("task Deleted");
            location.reload();
        })
    }
    $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
    }).then(function success(data) {
        //alert(data);
        $scope.data1 = angular.fromJson(data);
        //$window.location.href = "home.html";
    })

});

app.controller("ProfileController", function ($scope, $http, $httpParamSerializerJQLike,$window) {
    $scope.pageClass = 'profile';
    $scope.username = sessionStorage.getItem("username");
    email = sessionStorage.getItem("username");
    $http({
        method: 'GET',
        url: 'https://api.mongolab.com/api/1/databases/planovac/collections/users?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
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
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/discuss?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            data: JSON.stringify({
                topic: topic,
                comment: comment
            }),
            contentType: "application/json"
        }).success(function() {
            $scope.topic ="";
            $scope.comment ="";
            $scope.msg ="Topic created successfully";
            /*$window.location.href = "/lab7_mongo/www/Login.html";*/
        })
    }
    $scope.showtopic = function(topic) {
        $scope.topic = topic;
        $http({
            method: 'GET',
            url : 'https://api.mongolab.com/api/1/databases/planovac/collections/discuss?apiKey=1fB-Vh6r9XKxu-n0eW_4OeXvlAEViZl3',
            /*contentType: "application/json"*/
        }).then(function success(data) {
            //alert(data);
            $scope.data1 = angular.fromJson(data);
            /*$window.location.href = "/lab7_mongo/www/Home.html";*/

        })
    }
});

function logout()
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
function login()
{
    var myParams = {
        'clientid' : '738433218081-7111mc5s0vgkfgqjoaeahr87alrpd3vm.apps.googleusercontent.com',
        'cookiepolicy' : 'single_host_origin',
        'callback' : 'loginCallback',
        'approvalprompt':'force',
        'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    };
    gapi.auth.signIn(myParams);

}
function loginCallback(result)
{
    if(result['status']['signed_in'])
    {
        var request = gapi.client.plus.people.get(
            {
                'userId': 'me'
            });
        request.execute(function (resp)
        {
            var email = '';
            if(resp['emails'])
            {
                for(i = 0; i < resp['emails'].length; i++)
                {
                    if(resp['emails'][i]['type'] == 'account')
                    {
                        email = resp['emails'][i]['value'];
                    }
                }
            }
            var dispname = resp['displayName'];
            var str = "Name:" + resp['displayName'] + "<br>";
            str += "<img src='" + resp['image']['url'] + "' /><br>";
            str += "Email:" + email + "<br>";
            str += "URL:" + resp['url'] + "<br>";
            document.getElementById("dispname").innerHTML = dispname;
            sessionStorage.setItem("username",dispname);
            sessionStorage.setItem("profile",str);
            window.location.replace("home.html");
        });
    }
}
function onLoadCallback()
{
    gapi.client.setApiKey('AIzaSyA23Qn5CJLuLm1_rfY1qBPa6i1s1Gi2J1w');
    gapi.client.load('plus', 'v1',function(){});
}
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client.js?onload=onLoadCallback';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();



