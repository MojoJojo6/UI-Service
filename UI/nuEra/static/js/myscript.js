var my_app = angular.module('MyApp',['ngMaterial','ngMessages']);

var user_service_port = '8000';
var course_Service_port = '8001';
var forum_discussion_port = '8002';
var ui_service_port = '8003';

var domain_ip_addr = 'http://127.0.0.1:'

var forum_domain = '127.0.0.1:';

var user_service_csrf = "";

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
            url : domain_ip_addr + user_service_port + "/api/users/user-fetch",
            method: "POST",
            data: {
                    "email_id": self.email,
                    "password": self.password
                }
        })
        .then(function (response) {
            dataService.user = response.data;
            user_service_csrf = getCookie('csrftoken') 
            console.log('CSRF: ', user_service_csrf)
            console.log(JSON.stringify(response))
            mainCntrl.url = 'user/dashboard/';
            // $http({
            //     url: domain_ip_addr + ui_service_port + "/login/",
            //     method: "POST",
            //     data: dataService.user,
            //     headers : {}
            // }).then(function success(response){
            //     console.log('Success Login in UI Service', JSON.stringify(response));
               
            // }, function failure(response){
            //     console.log('Failed Login in UI Service', JSON.stringify(response));
            // })

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
        });
    };

    self.onNotYetRegistered = function (mainCntrl) {
        mainCntrl.url = 'register/'
    };

});


my_app.controller('RegisterController', function($http, dataService, $mdDialog){

    var self = this;

    test = dataService;

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
            url : domain_ip_addr + user_service_port + "/api/user-create/",
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
            console.log(JSON.stringify(response.data));
            dataService.user = response.data;
            mainCntrl.url = 'user/dashboard/';

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
        });

    }
});

my_app.controller('userDashboard', function(dataService,$mdSidenav, $mdDialog, $http){

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

   self.navigateToYourCourse = function(mainCntrl,course){
        dataService.selectedCourse = course;
        mainCntrl.url = 'course/lessonview/';
   }

   self.bulkCategory = function(ev){
    $http({
            url : domain_ip_addr + course_Service_port +"/api/categories/",
            method : "GET"
        }).then(function(response){
            self.categories = response.data;
            console.log(self.categories)
        }, function(response){
            $mdDialog.show($mdDialog.alert()
                .parent(angular.element(document.querySelector('Body')))
                .clickOutsideToClose(true)
                .title('Failed to load Catalog!')
                .textContent('Failed to load Catalog.')
                .ariaLabel('Failed to load Catalog.')
                .ok('Ok')
                .targetEvent(ev)
            );
        })
   }

   self.getEnrolledCourses = function(){
       $http({
            url: domain_ip_addr + user_service_port + "/api/user-courses-emailid/"+ dataService.user.email_id +"/",
            method: "GET"
       }).then(function success(response){
            console.log('Course Ids: ', response.data)
            var course_ids = response.data;

            var course_ids_list = []
            for (each_obj in course_ids){
                course_ids_list.push(course_ids[each_obj].course_id);
                console.log('Add: ', course_ids[each_obj].course_id);
            }

            $http({
                url: domain_ip_addr + course_Service_port + "/api/courses/getbulk/",
                method: "POST",
                data: {
                    "list": course_ids_list
                }
            }).then(function(response){
                console.log('Enrolled Courses: ', response.data)
                self.enrolled_courses = response.data;
            }, function(response){
                console.log(JSON.stringify(response))
            })

       }, function failure(response){
            console.log('Failed Fetching Enrolled Courses', JSON.stringify(response))
       })
   }

    self.logout =function(mainCntrl, ev){
        mainCntrl.url = "home/";
        // $http({
        //     url: domain_ip_addr + user_service_port + "/api/users/user-logout",
        //     method: "DELETE"
        // }).then(function(response){
            
        // }, function(response){
        //     $mdDialog.show($mdDialog.alert()
        //         .parent(angular.element(document.querySelector('Body')))
        //         .clickOutsideToClose(true)
        //         .title('Failed Logging Out')
        //         .textContent('Failed to logout.')
        //         .ariaLabel('Failed to logout.')
        //         .ok('Ok')
        //         .targetEvent(ev)
        //     );
        // })
   }

   self.bulkCategory(null);
   self.getEnrolledCourses();

});

my_app.controller('EnrollCoursePage', function(dataService,$mdDialog, $http){

  var self = this;
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
        $http({
            url: domain_ip_addr + user_service_port + "/api/user-courses-create/",
            method: "POST",
            data: {
                "user": dataService.user.u_id,
                "course_id": self.course.cid
            }
        }).then(function(response){
            mainCntrl.url = 'course/lessonview/';
        }, function(response){
            $mdDialog.show($mdDialog.alert()
                .parent(angular.element(document.querySelector('Body')))
                .clickOutsideToClose(true)
                .title('Failed to Enroll')
                .textContent('Failed to Enroll')
                .ariaLabel('Failed to Enroll')
                .ok('Ok')
                .targetEvent(ev)
            );

        })

    }, function(){});
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

    self.navigateToForum = function(mainCntrl){
        mainCntrl.url = "forum/"
    }
});

my_app.controller('ForumController', function($scope, dataService){
    var self = this;
    ctrl = self;
    self.connection_status = 'Disconnected';
    self.user_id = dataService.user.u_id;
    self.user_first_name = dataService.user.first_name;
    self.user_last_name = dataService.user.last_name;
    self.courseId = dataService.selectedCourse.cid;
    self.room_name = dataService.selectedCourse.cid;

    self.connect = function(){
        console.log('Connecting... ')
        self.socket = new WebSocket('ws://' + forum_domain + forum_discussion_port + '/ws/forum/' + self.room_name + '/');

        self.socket.onmessage = self.onReceive;
        self.socket.onclose = self.onDisconnect;

        console.log('Connected!')
        self.connection_status = 'Connected';
        //$scope.$apply();
    }

    self.onDisconnect = function(e){
        console.error('Chat socket closed unexpectedly');
        self.connection_status = 'Disconnected';
    }

    self.disconnect = function(){
        self.socket.close();
        self.connection_status = 'Disconnected';
    }

    self.onReceive = function(e){
        var data = JSON.parse(e.data);
        console.log('Received: ')
        console.log(data);
        self.comment_list = data;
        $scope.$apply();
    }

    self.onSend = function(){
        self.socket.send(
            JSON.stringify(
                {
                    event_type: 0,
                    data: {
                        id              : null, 
                        user_id         : self.user_id,
                        user_first_name : self.user_first_name,
                        user_last_name  : self.user_last_name,
                        course_id       : self.room_name,
                        comment         : self.new_comment,
                        parent_id       : null,
                    } 
                }
            )
        )
    }

    self.connect();
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }


  my_app.component('comment', {
    bindings: {
        socket: '<',
        userId: '<',
        userFirstName: '<',
        userLastName: '<',
        courseId: '<',
        roomName: '<',
        comment: '=',
        parentId: '<'
    },
    template:   `<div layout="column" ng-style="{'padding': '0px'}">
                    <div layout-padding md-whiteframe="3" layout="column" ng-style="{'background-color': 'white'}">
                        <label class="md-title">{{$ctrl.comment.user_first_name}} {{$ctrl.comment.user_last_name}}</label>
                        <label class="md-body-1">{{$ctrl.comment.comment}}</label>
                    </div>
                    <div layour="row" flex layout="end end">
                        <md-input-container flex>
                            <label>Reply</label>
                            <input type="text" ng-model="$ctrl.new_comment" flex>
                        </md-input-container>
                        <md-button ng-click="$ctrl.onSend($ctrl.comment.id, 0)" class="md-raised md-primary" ng-style="{'height': '36px'}" ng-disabled="!$ctrl.new_comment">Send</md-button>
                        <md-button ng-click="$ctrl.onSend($ctrl.parentId, 1)" class="md-raised md-primary" ng-style="{'height': '36px'}">Delete</md-button>
                    </div>
                    <comment-list ng-if="$ctrl.comment.children.length > 0" collection="$ctrl.comment.children" socket="$ctrl.socket" user-id="$ctrl.userId" user-first-name="$ctrl.userFirstName" user-last-name="$ctrl.userLastName" course-id="$ctrl.courseId" room-name="$ctrl.roomName" parent-id="$ctrl.comment.id"></comment-list>
                </div>`,
    controller: function(){
        var self = this;

        self.onSend = function(parent_id, event_type){
            console.log('Sending...')
            self.socket.send(
                JSON.stringify(
                    {
                        event_type: event_type,
                        data: {
                            id              : event_type ? this.comment.id : null, 
                            user_id         : self.userId,
                            user_first_name : self.userFirstName,
                            user_last_name  : self.userLastName,
                            course_id       : self.roomName,
                            comment         : self.new_comment,
                            parent_id       : parent_id,
                        } 
                    }
                )
            )
        }
    }
});


my_app.component('commentList', {
    bindings: {
        socket: '<',
        userId: '<',
        userFirstName: '<',
        userLastName: '<',
        courseId: '<',
        roomName: '<',
        collection: '=',
        parentId: '<'
    },
    template:   `<div layout-padding layout="column">
                    <comment ng-repeat="comment_obj in $ctrl.collection" comment="comment_obj" socket="$ctrl.socket" user-id="$ctrl.userId" user-first-name="$ctrl.userFirstName" user-last-name="$ctrl.userLastName" course-id="$ctrl.courseId" room-name="$ctrl.roomName" parent-id="$ctrl.parentId" ng-style="{'margin-left': '40px', 'margin-right': '0px'}" ></comment> 
                </div>`,
});
