from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class ProfileDemo(models.Model):
    # link to the built-in User model
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    
    # profile fields
    height = models.IntegerField()
    weight = models.IntegerField()
    age = models.IntegerField()

    ACTIVITY_LEVEL_CHOICES = [("sedentary", "Sedentary"), ("light","Light"),("moderate","Moderate"),("active","Active")]
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES)

    GOAL_CHOICES = [("lose_weight","Lose weight"),("maintain","Maintain"),("lose_weight","Lose weight")]
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES)

    def __str__(self):
        return f"{self.user.username}'s profile"