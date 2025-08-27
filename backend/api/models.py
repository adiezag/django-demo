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
    date_of_birth = models.DateField()

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

    # def __str__(self):
    #     return f"{self.user.username}'s profile"
    
    def save(self, *args, **kwargs):
        # Get old weight before saving (only if updating existing profile)
        old_weight = None
        if self.pk: # Profile exists (updating)
            try:
                old_instance = ProfileDemo.objects.get(pk=self.pk)
                old_weight = old_instance.weight
            except:
                old_weight = None
        is_new = self.pk is None
        # Save the profile
        super().save(*args, **kwargs)

        # Create WeightEntry if new profile or weight changed

        if is_new or (old_weight is not None and old_weight != self.weight):
            WeightEntry.objects.create(user=self.user, weight = self.weight)


    def __str__(self):
        return f"{self.user.username}'s profile"

class WeightEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="weight_entries")
    weight = models.IntegerField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at'] # Most recent first by default

    def __str__(self):
        return f"{self.user.username} : {self.weight}kg on {self.recorded_at.strftime('%Y-%m-%d')}"