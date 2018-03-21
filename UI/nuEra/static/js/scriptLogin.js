var Login = angular.module('Login',['ngMaterial','ngMessages']);
Login.controller("Login",function($scope,$http,$window){
    var self = this;
    self.onLogin = function () {
        $http({
        url : "http://127.0.0.1:7000/api/users/user-fetch",
        method: "POST",
        data: {
                "email_id": self.email,
                "password": self.password
            }
    }).then(function (response) {
        $window.location.assign("http://127.0.0.1:8000/home/")
        console.log(JSON.stringify(response.data))
    },function (response) {
        console.log("Error: "+ response.status)
        console.log("failure")
    })
    };

    self.onNotYetRegistered = function () {
        try{
            $window.location.assign("/register/")
        }
        catch(e){
            console.log("error loading page !!", e)
        }
    };

});