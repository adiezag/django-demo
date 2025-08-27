from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, serializers, status
from .serializers import UserSerializer, NoteSerializer, ProfileDemoSerializer, WeightEntrySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .models import ProfileDemo
from .models import WeightEntry
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
# Create your views here.
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ProfileDemoView(APIView):
    # serializer_class = ProfileDemoSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user's profile
        try:
            profile = ProfileDemo.objects.get(user=request.user)
            serializer = ProfileDemoSerializer(profile)
            return Response(serializer.data)
        except ProfileDemo.DoesNotExist:
            return Response({"error": "ProfileNotFound"},
                            status = status.HTTP_404_NOT_FOUND)
        
    def post(self, request):
        """Create user's profile"""
        # Check if profile already exists
        if ProfileDemo.objects.filter(user=request.user).exists():
            return Response(
                {"error": "Profile already exists for this user"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = ProfileDemoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        """Update user's profile"""
        try:
            profile = ProfileDemo.objects.get(user=request.user)
        except ProfileDemo.DoesNotExist:
            return Response(
                {"error": "Profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
    def patch(self, request):
        """Partially update user's profile"""
        try:
            profile = ProfileDemo.objects.get(user=request.user)
        except ProfileDemo.DoesNotExist:
            return Response(
                {"error": "Profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = ProfileDemoSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # This will trigger the WeightEntry creation if weight changed
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ProfileDetailView(generics.RetrieveUpdateAPIView):
#     serializer_class = ProfileDemoSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_object(self):
#         try:
#             return ProfileDemo.objects.get(user=self.request.user)
#         except ProfileDemo.DoesNotExist:
#             raise Http404("Profile not found")

class WeightHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        entries = WeightEntry.objects.filter(user=request.user).order_by("-recorded_at")
        serializer  = WeightEntrySerializer(entries, many=True)
        return Response(serializer.data)
    


# Alternative: Using Generic View (simpler approach)
class ProfileGenericView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileDemoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        # Get or create profile for the user
        profile, created = ProfileDemo.objects.get_or_create(user=self.request.user)
        return profile