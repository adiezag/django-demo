from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note
from .models import ProfileDemo, WeightEntry
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author":{"read_only": True}}

class ProfileDemoSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField() # make age read-only since it's calculated
    class Meta:
        model = ProfileDemo
        fields = ["id","user", "height", "weight", "age","date_of_birth","activity_level", "goal"]
        extra_kwargs = {"user":{"read_only":True}}

class WeightEntrySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only = True) # Show username instead of id
    class Meta:
        model = WeightEntry
        fields = ["id", "user","weight","recorded_at"]