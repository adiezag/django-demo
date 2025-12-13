from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, date
from django.utils import timezone
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
    weight = models.FloatField()
    date_of_birth = models.DateField()

    ACTIVITY_LEVEL_CHOICES = [("sedentary", "Sedentary"), ("light","Light"),("moderate","Moderate"),("active","Active")]
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_LEVEL_CHOICES)

    GOAL_CHOICES = [("lose","Lose"),("maintain","Maintain"),("gain","Gain")]
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES)

    GENDER_CHOICES = [('male', 'Male'), ('female','Female')]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    
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
    weight = models.FloatField()
    recorded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-recorded_at'] # Most recent first by default

    def __str__(self):
        return f"{self.user.username} : {self.weight}kg on {self.recorded_at.strftime('%Y-%m-%d')}"
    
class Macros(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="macros")
    calories = models.IntegerField()
    protein = models.IntegerField()
    carbohydrates = models.IntegerField()
    fats = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Macros"

    def __str__(self):
        return f"{self.user.username}: {self.calories} kcal"
    

class Meal(models.Model):
    MEAL_TYPES = [("breakfast", "Breakfast"),("lunch","Lunch"),("dinner","Dinner"),("snack","Snack")]
    SOURCE_CHOICES = [("manual", "Manual Entry"), ("ai_generated", "AI Generated")]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "meals")
    meal_description= models.TextField()
    meal_type=models.CharField(max_length=20, choices=MEAL_TYPES)

    # Nutrition - required
    calories=models.FloatField()
    protein=models.FloatField()
    carbs=models.FloatField()
    fat=models.FloatField()

    order = models.IntegerField(default=1)
    is_eaten = models.BooleanField(default=False)

    source=models.CharField(max_length=20, choices = SOURCE_CHOICES, default="manual")
    notes = models.TextField(blank=True, null=True)

    date = models.DateField(default=timezone.now) 
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.meal_description[:50]} ({self.meal_type}) - {self.user.username}"