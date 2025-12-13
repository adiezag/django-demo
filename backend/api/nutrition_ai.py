import os
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class EstimateNutritionEvent(BaseModel):
    calories: float
    protein: float
    carbs: float
    fat: float

# def estimate_nutrition(meal_name: str, portion: str) -> EstimateNutritionEvent:
#     """
#     Calls OpenAI to estimate nutrition for a given meal.
#     Returns a typed Pydantic object.
#     """
#     from openai import OpenAI
#     openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
#     meal_description = f"{meal_name} {portion}"
#     completion = openai_client.beta.chat.completions.parse(
#         model="gpt-4o-mini",
#         messages=[
#             {
#                 "role": "system",
#                 "content": """
#                 Estimate calories, protein, carbs, and fat for the described meal.
#                 Respond ONLY in numerical values. No units, no explanations.
#                 """
#             },
#             {"role": "user", "content": meal_description},
#         ],
#         response_format=EstimateNutritionEvent
#     )

#     return completion.choices[0].message.parsed

def estimate_nutrition(meal_description: str) -> EstimateNutritionEvent:
    """
    Calls OpenAI to estimate nutrition for a given meal.
    Returns a typed Pydantic object.
    """
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """
                Estimate calories, protein, carbs, and fat for the described meal.
                Respond ONLY in JSON format with keys: calories, protein, carbs, fat.
                All values should be numbers (floats).
                """
            },
            {"role": "user", "content": meal_description},
        ],
        response_format={"type": "json_object"}
    )
    print("OpenAI call succeeded")
        
    result_dict = json.loads(completion.choices[0].message.content)

    # Calculate calories
    calories = (result_dict['protein']*4) + (result_dict['carbs']*4) + (result_dict['fat']*9)
        
    # return EstimateNutritionEvent(**result_dict)
    return EstimateNutritionEvent(
        calories=round(calories),
        protein=result_dict['protein'],
        carbs=result_dict['carbs'],
        fat=result_dict['fat']

    )
        
   