from django.views.generic import TemplateView

# Create your views here.


class Index(TemplateView):
    """
    Template View of Index Page.
    """
    template_name = "index.html"


class Login(TemplateView):
    """
    Template View of Login Page.
    """
    template_name = "login.html"


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