from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, date
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
    date_of_birth = models.DateField(default=date.today)

    ACTIVITY_LEVEL_CHOICES = [("sedentary", "Sedentary"), ("light","Light"),("moderate","Moderate"),("active","Active")]
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES)

    GOAL_CHOICES = [("lose","Lose"),("maintain","Maintain"),("gain","Gain")]
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES)

    @property
    def age(self):
        today = datetime.now().date()
        age = today.year - self.date_of_birth.year
        if (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day):
            age -= 1
        return age

    def __str__(self):
        return f"{self.user.username}'s profile"