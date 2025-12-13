from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", views.NoteDelete.as_view(), name="delete-note"),
    # path("profile/", views.ProfileDemoView.as_view(), name="profile"),
    path('profile/', views.ProfileDemoView.as_view(), name='user-profile'),
    path('weight-history/', views.WeightHistoryView.as_view(), name='weight-history'),
    path("estimate-nutrition/", views.EstimateNutritionView.as_view(), name="estimate-nutrition"),
    path("meals/", views.UserMealsView.as_view(), name="user-meals"),
    path("meals/reorder/", views.UserMealsView.as_view(), name="meals-reorder"),
    path("meals/<int:meal_id>/", views.MealDetailView.as_view(), name="meal-detail"),
    path("macros/", views.MacroTrackingView.as_view(), name="macro-tracking"),
    path("macros/history/", views.MacroHistoryView.as_view(), name="macro-history"),
]