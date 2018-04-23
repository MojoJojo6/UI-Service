from django.views.generic import TemplateView
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

logged_in_user = {}

class Index(TemplateView):
    """
    Template View of Index Page.
    """
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a Logged in user.
        context['user'] = logged_in_user
        return context



class Login(TemplateView):
    """
    Template View of Login Page.
    """
    template_name = "login.html"

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        global logged_in_user
        if request.method == "POST":
            logged_in_user = request.data
            print('User: ', logged_in_user)
        return render(request,"", context=logged_in_user)


class Register(TemplateView):
    """
    Template View of Register.
    """
    template_name = "register.html"


class Homepage(TemplateView):
    """
    Template View of Homepage.
    """
    template_name = "homepage.html"


class UserDashboard(TemplateView):
    """
    Template View of UserDashboard.
    """
    template_name = "user_dashboard.html"

    @csrf_exempt
    def delete(self, request, *args, **kwargs):
        global logged_in_user
        if request.method == "DELETE":
            logged_in_user = {}
            print('User: ', logged_in_user)
        return HttpResponse("Logout Success")



class EnrollCourse(TemplateView):
    """
    Template View of EnrollCourse
    """
    template_name = "enrollCoursepage.html"


class CourseLessonList(TemplateView):
    """
    TemplateView of CourseLessonList
    """
    template_name = "courseLessonViewpage.html"


class LessonPlaylist(TemplateView):
    """
    TemplateView of CourseLessonList
    """
    template_name = "lessonPlaylist.html"


class Forum(TemplateView):
    """
    TemplateView of CourseLessonList
    """
    template_name = "forum.html"

