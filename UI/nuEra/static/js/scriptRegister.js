var signup = angular.module('signup',['ngMaterial','ngMessages']);
signup.controller('registerController', function($scope,$http,$window){
    var self = this;
    self.roles = [
        {'id': 0,'display': "Employee"},
        {'id': 1,'display': "Faculty"},
        {'id': 2,'display': "Student"}];
    // noinspection JSAnnotator

    self.roleChange = function () {
        if(self.clientrole != 0){
            self.staff = false;
            self.admin = false;
        }
        console.log("In Function");

    };
    self.onPost = function () {
        $http({
            url : "http://127.0.0.1:7000/api/user-create/",
            method : "POST",
            data: {
                    "first_name": self.clientfirstname,
                    "last_name": self.clientlastname,
                    "email_id": self.clientemail,
                    "password": self.clientpassword,
                    "mobile_number": self.clientmobilenumber,
                    "role": self.clientrole,
                    "active": self.active,
                    "staff": self.staff,
                    "admin": self.admin
            }
        }).then(function success(response){
            console.log(JSON.stringify(response.data))
            $window.location.assign("http://127.0.0.1:8000/home/")

        },function failure(response){
            console.log('Error: '+response.status)
            console.log(JSON.stringify(response.data))
        })
        
    }
});