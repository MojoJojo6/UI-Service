from rest_framework import status
from rest_framework.permissions import *
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from django.shortcuts import  get_object_or_404
from .serializers import *
from .models import User
import UI.settings as settings # this is a hacky way of getting settings file, try and avoid
from django.contrib.auth import authenticate, login, logout


class UserCreate(CreateAPIView):
    """
    returns the list of all users or a specific user with the email address
    """
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        """
        returns the serializer class to be used
        :return:
        """
        return UserSerializer

    def create(self, request, *args, **kwargs):
        """
        This function is written separately in order to provide the functionality for creating the session variable
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = User.objects.get(email_id=request.data["email_id"])
        # note that the IsAdminUser permission classes checks 2 variables, request.user and request.user.is_staff
        # creating the session
        request.session.set_expiry(settings.SESSION_EXPIRY)
        login(request, user)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserFetch(CreateAPIView):
    """
    returns true if a particular user exists
    """
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        return the queryset
        :return:
        """
        return User.objects.all()

    def get_serializer_class(self):
        """
        gets the serializer class to be used
        :return:
        """
        return UserSerializerFetch

    def create(self, request, *args, **kwargs):
        """
        handle a post request
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        emailid = request.data["email_id"]
        password = request.data["password"]
        serializer = UserSerializerFetch(data=request.data)
        if serializer.is_valid():

            user = authenticate(request, email_id=serializer.validated_data['email_id'], password=serializer.validated_data['password'])
            if user is not None:
                request.session.set_expiry(settings.SESSION_EXPIRY)
                login(request, user)
                headers = self.get_success_headers(serializer.data)
                return Response(data=UserSerializer(user).data, status=200, headers=headers)

        return Response("Not Found", status=404)


class UserLogout(DestroyAPIView):
    """
    returns true if a particular user exists
    """
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        return the queryset
        :return:
        """
        return User.objects.all()

    def get_serializer_class(self):
        """
        gets the serializer class to be used
        :return:
        """
        return UserSerializer

    def delete(self, request, *args, **kwargs):
        """
        handle a post request
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        logout(request)
        return Response("Logged out", status=200)



class UserRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    """
    returns information for specific users with email address, updates and deletes users with specific email addresses
    """
    permission_classes = [AllowAny]
    multiple_lookup_fields = {"email_id"}

    def get_queryset(self):
        """
        return the queryset
        :return:
        """
        return User.objects.all()

    def get_serializer_class(self):
        """
        returns the serializer class
        :return:
        """
        return UserSerializer

    def get_object(self):
        """
        returns the object instance
        :return:
        """
        filter_dict = {}
        queryset = self.get_queryset()
        # self.queryset should always be used because self.queryset gets evaluated once and is cached for subsequent operations

        for field in self.multiple_lookup_fields:
            filter_dict[field] = self.kwargs[field]

        obj = get_object_or_404(queryset, **filter_dict)
        return obj