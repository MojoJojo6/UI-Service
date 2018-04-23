from rest_framework import serializers
from nuEra.models import User
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    """
    serializer for user model
    """

    u_id = serializers.IntegerField(required=False, read_only=True)
    first_name = serializers.CharField(max_length=20)
    last_name = serializers.CharField(max_length=20)
    email_id = serializers.EmailField(max_length=255, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(max_length=255, write_only=True, required=True)
    mobile_number = serializers.CharField(max_length=20, required=False)
    role = serializers.ChoiceField(choices=User.roles)
    active = serializers.BooleanField(default=True)
    staff = serializers.BooleanField(default=False)
    admin = serializers.BooleanField(default=False)
    date_created = serializers.DateTimeField(read_only=True)
    date_modified = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ['u_id', 'first_name', 'last_name', 'email_id', 'password', 'mobile_number', 'role', 'active', 'staff', 'admin',
                  'date_created', 'date_modified']


class UserSerializerFetch(serializers.ModelSerializer):
    """
    serializer for user model
    """
    email_id = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email_id', 'password']