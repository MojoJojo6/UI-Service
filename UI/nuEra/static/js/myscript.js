var my_app = angular.module('MyApp',['ngMaterial','ngMessages']);

my_app.factory("dataService", function(){
  return {}
})

my_app.config(function($mdIconProvider, $httpProvider){
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

my_app.controller("MainController", function(){

    var self = this;

});

my_app.controller("HomeController", function(){

    var self = this;

});

my_app.controller("LoginController",function($http, dataService){

    var self = this;

    self.onLogin = function (mainCntrl) {
        $http({
        url : "http://127.0.0.1:7000/api/users/user-fetch",
        method: "POST",
        data: {
                "email_id": self.email,
                "password": self.password
            }
    })
    .then(function (response) {
        mainCntrl.url = 'user-dashboard/'
        console.log(JSON.stringify(response.data))
        dataService.user = response.data
    },function (response) {
        console.log("Error: "+ response.status)
    })
  };

    self.onNotYetRegistered = function (mainCntrl) {
        mainCntrl.url = 'register/'
    };

});


my_app.controller('RegisterController', function($http, dataService){

    var self = this;

    self.roles = [
        {'id': 0,'display': "Employee"},
        {'id': 1,'display': "Faculty"},
        {'id': 2,'display': "Student"}];
    // noinspection JSAnnotator

    self.onNotYetRegistered = function (mainCntrl) {
        mainCntrl.url = 'register/'
    };

    self.roleChange = function () {
        if(self.clientrole != 0){
            self.staff = false;
            self.admin = false;
        }
        // console.log("In Function");

    };

    self.onPost = function (mainCntrl) {
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
            // $window.location.assign("http://127.0.0.1:8000/home/")
            mainCntrl.url = 'user-dashboard/'
            dataService.user = response.data;

        },function failure(response){
            console.log('Error: '+response.status)
            alert('Error: '+ response.status);
            // console.log(JSON.stringify(response.data))
        })

    }
});

var check= {}

my_app.controller('userDashboard', function(dataService){

   var self = this;

   self.user = dataService.user;

   check = self;

   self.categories = [

     {
       category_name : 'Your Enrolled Courses',
       courses : [
         {course_name : 'Course 1'},
         {course_name : 'Course 2'},
         {course_name : 'Course 3'},
         {course_name : 'Course 4'},
         {course_name : 'Course 5'},
         {course_name : 'Course 6'},
         {course_name : 'Course 7'},
       ]
     },
     {
       category_name : 'Category 2',
       courses : [
         {course_name : 'Course 1'},
         {course_name : 'Course 2'},
         {course_name : 'Course 3'},
         {course_name : 'Course 4'},
         {course_name : 'Course 5'},
         {course_name : 'Course 6'},
         {course_name : 'Course 7'},
       ]
     },
     {
       category_name : 'Category 3',
       courses : [
         {course_name : 'Course 1'},
         {course_name : 'Course 2'},
         {course_name : 'Course 3'},
         {course_name : 'Course 4'},
         {course_name : 'Course 5'},
         {course_name : 'Course 6'},
         {course_name : 'Course 7'},
       ]
     },
     {
       category_name : 'Category 4',
       courses : [
         {course_name : 'Course 1'},
         {course_name : 'Course 2'},
         {course_name : 'Course 3'},
         {course_name : 'Course 4'},
         {course_name : 'Course 5'},
         {course_name : 'Course 6'},
         {course_name : 'Course 7'},
       ]
     },
     {
       category_name : 'Category 5',
       courses : [
         {course_name : 'Course 1'},
         {course_name : 'Course 2'},
         {course_name : 'Course 3'},
         {course_name : 'Course 4'},
         {course_name : 'Course 5'},
         {course_name : 'Course 6'},
         {course_name : 'Course 7'},
       ]
     },

   ]

});
