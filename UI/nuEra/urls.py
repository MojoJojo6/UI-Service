from django.urls import path
from .views import * #(Index, Login, Register, Homepage, UserDashboard, EnrollCourse)

urlpatterns = [
    path('', Index.as_view(), name='index-page'),
    path('login/', Login.as_view(), name='login-page'),
    path('register/', Register.as_view(), name='register-page'),
    path('home/', Homepage.as_view(), name='homepage'),
    path('user-dashboard/', UserDashboard.as_view(), name='user-dashboard'),
    path('enroll-course/', EnrollCourse.as_view(), name='enroll-course'),
    path('course-lessonview/', CourseLessonList.as_view(), name='course-lessonview')
]
