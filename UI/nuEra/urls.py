from django.urls import path
from .views import (
    Index,
    Login,
    Register,
    Homepage,
    UserDashboard,
    EnrollCourse,
    CourseLessonList,
    LessonPlaylist,
    Forum
)
from .api_view import *

urlpatterns = [
    path('', Index.as_view(), name='index-page'),
    path('login/', Login.as_view(), name='login-page'),
    path('register/', Register.as_view(), name='register-page'),
    path('home/', Homepage.as_view(), name='homepage'),
    path('user/dashboard/', UserDashboard.as_view(), name='user-dashboard'),
    path('enroll/course/', EnrollCourse.as_view(), name='enroll-course'),
    path('course/lessonview/', CourseLessonList.as_view(), name='course-lessonview'),
    path('lesson/playlist', LessonPlaylist.as_view(), name='lesson-playlist'),
    path('forum/', Forum.as_view(), name='forum'),

    path("users/<str:email_id>/", UserRetrieveUpdateDestroy.as_view()),
    path("users/user-fetch", UserFetch.as_view()),
    path("users/user-logout", UserLogout.as_view()),
    path("user-create/", UserCreate.as_view()),
]
