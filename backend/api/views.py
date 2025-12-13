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
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from django.utils import timezone
from .models import Meal
from .serializers import MealSerializer
from .nutrition_ai import estimate_nutrition
from django.db.models import Max, F, Sum

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
    
# @api_view(['POST'])
# def estimate_nutrition(request):
#     """
#     Expects:
#     {
#     "mealName": "pancakes",
#     "portion": "2 pieces"
#     }
#     """
#     meal_name = request.data.get("mealName", "")
#     portion = request.data.get("portion","")

#     if not meal_name:
#         return Response({"error": "mealName is required"}, status=400)
#     # TODO: replace this with your actual n8n or AI call
#     # Example static dummy values for now:
#     estimated = {
#         "calories": 350,
#         "protein": 8,
#         "carbs": 55,
#         "fat": 10,
#     }    

#     return Response({"nutrition": estimated})


class UserMealsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # retrieve all meals for the current user for a given date
        # accepts optional query param ?date=YYYY-MM-DD
        # defaults to today if not provided

        user = request.user
        date_str = request.query_params.get("date")
        

        if date_str:
            try:
                query_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)
        else:
            query_date = timezone.localdate()
        
        meals = Meal.objects.filter(user=user, date=query_date).order_by("order")
        serializer = MealSerializer(meals, many=True)
        return Response(serializer.data)
    

    def post(self, request):
        serializer = MealSerializer(data=request.data)
        if serializer.is_valid():
            date = serializer.validated_data['date']
            max_order = Meal.objects.filter(
                user = request.user,
                date = date
            ).aggregate(Max('order'))['order__max'] or 0
       
            serializer.save(user=request.user, order=max_order + 1)
            
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    


    # def post(self, request):
    #     #from django.contrib.auth.models import User
    #     serializer = MealSerializer(data=request.data)
    #     if serializer.is_valid():
    #         # for testing with postman
    #         # test_user = User.objects.get(id=9)
    #         date = serializer.validated_data['date']
    #         max_order = Meal.objects.filter(
    #             user = request.user,
    #             user = test_user,
    #             date = date
    #         ).aggregate(Max('order'))['order__max'] or 0
    #     # create a new meal
    #     # serializer = MealSerializer(data=request.data)
    #     # if serializer.is_valid():
    #         serializer.save(user=request.user, order=max_order + 1)
    #         # serializer.save(user=test_user, order=max_order + 1)
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

    def patch(self, request):
        """Reorder meals. Expects:
        {
            "meals": [
                {"id":1, "order":1},
                {"id":3, "order":2},
                {"id":2, "order":3}
            ]
        }
        """
        meals_data = request.data.get('meals',[])

        if not meals_data:
            return Response({"error": "meals array is required"}, status = 400)

        for meal_item in meals_data:
            Meal.objects.filter(
                id=meal_item['id'],
                user=request.user
            ).update(order=meal_item['order'])
        return Response({"message": "Meals reordered successfully"}, status=200)
    
class MealDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, meal_id):
        """Update meal fields (like is_eaten status)"""
        print(f"PATCH received - meal_id: {meal_id}, data: {request.data}")  # Add this

        try:
            # test_user = User.objects.get(id=9)
            meal = Meal.objects.get(id=meal_id, user=request.user)
        except Meal.DoesNotExist:
            return Response({"error": "Meal not found"}, status=404)
        
        # Update with partial data
        serializer = MealSerializer(meal, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            print(f"Meal updated - is_eaten: {meal.is_eaten}")  # Add this
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    def delete(self, request, meal_id):
        try:
            meal = Meal.objects.get(id=meal_id, user=request.user)
        except Meal.DoesNotExist:
            return Response({"error":"Meal not found"}, status=404)
        
        deleted_order = meal.order
        deleted_date = meal.date
        meal.delete()
        Meal.objects.filter(
            user=request.user,
            date=deleted_date,
            order__gt=deleted_order
        ).update(order=F('order') - 1)

        return Response({"message": "Meal deleted successfully"}, status=200)
        






# class EstimateNutritionView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         meal_name = request.data.get("mealName")
#         portion = request.data.get("portion")

#         if not meal_name or not portion:
#             return Response({"error": "mealName and portion are required"}, status=400)

#         try:
#             result = estimate_nutrition(meal_name, portion)
#             return Response(result.dict(), status=200)
#         except Exception as e:
#             print(e)
#             return Response({"error": "Failed to estimate nutrition"}, status=500)
        

class EstimateNutritionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("=== VIEW STARTED ===")
        print(f"request type: {type(request)}")
        
        # Extract data from request
        meal_description = request.data.get("meal_description")
        

        # Validate required fields
        if not meal_description:
            return Response(
                {"error": "meal_description is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            print("About to call estimate_nutrition...")
            # Call the nutrition estimation function with proper string arguments
            result = estimate_nutrition(meal_description)
            print(f"estimate_nutrition returned: {result}")

            # Return as dict
            return Response(result.dict(), status=200)

        except Exception as e:
            # Log the error server-side for debugging
            print("Estimate nutrition failed:", e)
            import traceback
            print("Full traceback:")
            traceback.print_exc()

            return Response(
                {"error": "Failed to estimate nutrition."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MacroTrackingView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Returns daily macro targets and current progress.
        Accepts optional ?date=YYYY-MM-DD (defaults to today)
        """
        user = request.user
        # test_user = User.objects.get(id=9)
        # Get date from query params or default to today
        date_str = request.query_params.get("date")
        if date_str:
            try:
                query_date = datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                return Response({"error": "Invalid date format. Use YYYY-MM-DD"}, status=400)
        else:
            query_date = timezone.localdate()
        
        # Get user's profile
        try:
            # profile = test_user.profile
            profile = user.profile
        except ProfileDemo.DoesNotExist:
            return Response({"error": "User profile not found"}, status=404)
        
        # Calculate daily targets
        from api.utils.macro_calculator import calculate_daily_macros
        targets = calculate_daily_macros(profile)
        
        # Calculate consumed macros (only eaten meals)
        eaten_meals = Meal.objects.filter(
            # user=test_user,
            user=user,
            date=query_date,
            is_eaten=True
        )
        
        consumed = eaten_meals.aggregate(
            calories=Sum('calories'),
            protein=Sum('protein'),
            carbs=Sum('carbs'),
            fat=Sum('fat')
        )
        
        # Handle None values if no meals eaten
        consumed = {
            'calories': consumed['calories'] or 0,
            'protein': consumed['protein'] or 0,
            'carbs': consumed['carbs'] or 0,
            'fat': consumed['fat'] or 0,
        }
        
        # Calculate remaining
        remaining = {
            'calories': targets['calories'] - consumed['calories'],
            'protein': targets['protein'] - consumed['protein'],
            'carbs': targets['carbs'] - consumed['carbs'],
            'fat': targets['fat'] - consumed['fat'],
        }
        
        return Response({
            'date': query_date,
            'targets': targets,
            'consumed': consumed,
            'remaining': remaining,
        })
    
class MacroHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        '''
        Returns daily consumed macros over a date range
        Accepts ?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
        '''
        user = request.user
        #user = User.objects.get(id=9)

        start_date_str = request.query_params.get("start_date")
        end_date_str = request.query_params.get("end_date")

        if not start_date_str or not end_date_str:
            return Response(
                {"error": "Both start_date and end_date are required"},
            )
        
        try:
            start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()
        except  ValueError:
            return Response(
                {"error": "Invalid date format. Use YYYY-MM-DD"},
                status=400
            )
        
        # get all eaten meals in date range
        eaten_meals = Meal.objects.filter(
            user=user,
            date__gte = start_date,
            date__lte = end_date,
            is_eaten=True
        ).values('date').annotate(
            total_calories = Sum('calories'),
            total_protein = Sum('protein'),
            total_carbs = Sum('carbs'),
            total_fat = Sum('fat'),
        ).order_by('date')

        # format response

        history = [
            {
                'date': str(meal['date']),
                'calories': meal['total_calories'] or 0,
                'protein': meal['total_protein'] or 0,
                'carbs': meal['total_carbs'] or 0,
                'fat': meal['total_fat'] or 0,

            }
            for meal in eaten_meals
        ]

        return Response(history)