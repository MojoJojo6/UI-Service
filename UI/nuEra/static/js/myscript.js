var my_app = angular.module('MyApp',['ngMaterial','ngMessages']);

my_app.config(function($mdIconProvider){
  $mdIconProvider.defaultIconSet('/static/assets/mdi.svg')
});

my_app.factory("dataService", function(){
  return {}
});

my_app.config(function($mdIconProvider, $httpProvider){
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

my_app.controller("MainController", function(){

    var self = this;

});

my_app.controller("HomeController", function(){

    var self = this;

});

my_app.controller("LoginController",function($http, $mdDialog, dataService){

    var self = this;

    self.onLogin = function (ev, mainCntrl) {
        $http({
        url : "http://127.0.0.1:8000/api/users/user-fetch",
        method: "POST",
        data: {
                "email_id": self.email,
                "password": self.password
            }
    })
    .then(function (response) {
        mainCntrl.url = 'user/dashboard/'
        dataService.user = response.data
    },function (response) {
        $mdDialog.show($mdDialog.alert()
          .parent(angular.element(document.querySelector('Body')))
          .clickOutsideToClose(false)
          .title('Authentication Failure')
          .textContent('Your Email Id or Password does not match!')
          .ariaLabel('Your Email Id or Password does not match!')
          .ok('Ok')
          .targetEvent(ev)
      );
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
        mainCntrl.url = 'login/'
    };

    self.roleChange = function () {
        if(self.clientrole != 0){
            self.staff = false;
            self.admin = false;
        }
    };

    self.onPost = function (mainCntrl) {
        $http({
            url : "http://127.0.0.1:8000/api/user-create/",
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
            mainCntrl.url = 'user/dashboard/'
            dataService.user = response.data;

        },function failure(response){
          $mdDialog.show($mdDialog.alert()
            .parent(angular.element(document.querySelector('Body')))
            .clickOutsideToClose(false)
            .title('Registration Failure')
            .textContent('Information given is not valid, try again!')
            .ariaLabel('Information given is not valid, try again!')
            .ok('Ok')
            .targetEvent(ev)
        );
      })
    }
});

my_app.controller('userDashboard', function(dataService,$mdSidenav, $http){

   var self = this;

   self.user = dataService.user;

   self.toggleLeft = buildToggler('left');
   self.toggleRight = buildToggler('right');

   function buildToggler(componentId){
     return function() {
       $mdSidenav(componentId).toggle();
     };
   }

   self.navigate = function(mainCntrl,course){

     dataService.selectedCourse = course;
     mainCntrl.url = 'enroll/course/';
   }

   self.bulkCategory = function(){
     $http({
         url : "http://127.0.0.1:8001/api/bulk/category",
         method : "GET"
     }).then(function(response){
       self.categories = response.data;
       console.log(self.categories)
     }, function(response){

     })
   }

   self.bulkCategory();

});

var check = {};
my_app.controller('EnrollCoursePage', function(dataService,$mdDialog){

  var self = this;
  check = self;
  self.course = dataService.selectedCourse;

  self.showConfirm = function(ev, mainCntrl){
    var confirm = $mdDialog.confirm()
      .title('Would you like to enroll in this course?')
      .textContent('Confirm to enroll in course')
      .ariaLabel('Confirm if you want to enroll')
      .targetEvent(ev)
      .ok('Start Course')
      .cancel('Cancel')

    $mdDialog.show(confirm).then(function(){
      self.course.enrolled = true;
      mainCntrl.url = 'course/lessonview/';

    }, function(){

    });
  };

});

my_app.controller('courseLessonViewpage',function(dataService){

  var self = this;
  self.course = dataService.selectedCourse;

  self.navigate = function(mainCntrl, lesson){
    dataService.selectedLesson = lesson
    mainCntrl.url = 'lesson/playlist'
  }

});

my_app.controller('playlistController', function(dataService,$window, $sce){

  var self = this;
  self.lesson = dataService.selectedLesson;
  self.frame_style = {'width' : '100%', 'height' : '565px'}

  self.trustSrc = function(src) {
     return $sce.trustAsResourceUrl(src);
   }

});
