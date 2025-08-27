from django.urls import path
from . import views


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", views.NoteDelete.as_view(), name="delete-note"),
    # path("profile/", views.ProfileDemoView.as_view(), name="profile"),
    path('profile/', views.ProfileDemoView.as_view(), name='user-profile'),
    path('weight-history/', views.WeightHistoryView.as_view(), name='weight-history'),
    
]