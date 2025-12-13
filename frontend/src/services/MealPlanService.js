import api from "../api";
import { N8N_WEBHOOK_URL } from "../api";

class MealPlanService {
  // Trigger meal plan generation via n8n webhook
  static async sendChatMessage(userId, message, remainingMacros = null) {
    // console.log("DEBUG - userId received:", userId, typeof userId);

    // const payload = { user_id: userId };
    // console.log("DEBUG - payload being sent:", payload);

    // const response = await fetch(N8N_WEBHOOK_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });
    try {
      // console.log("Triggering meal plan generation for user: ", userId);
      // console.log(import.meta.env.VITE_API_URL);
      // console.log(import.meta.env.VITE_N8N_WEBHOOK_URL);
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: message,
          remainingMacros: remainingMacros,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Webhook request failed: ${response.status} ${response.statusText}`
        );
      }
      const responseData = await response.json();
      // console.log("Hello. Meal plan generated successfully: ", responseData);
      return responseData;
    } catch (error) {
      console.error("Error generating meal plan: ", error);
      throw new Error(`Failed to generate meal plan: ${error.message}`);
    }
  }
  static async getCurrentUserId() {
    try {
      const { data } = await api.get("/api/profile/");
      // console.log("DEBUG - profile data:", data);
      // console.log("DEBUG - user ID:", data.user, typeof data.user);
      return data.user;
    } catch (error) {
      console.error("Error getting current user ID: ", error);
      throw new Error("Failed to get user information");
    }
  }

  // method to save selected meals using axios instance

  static async saveMeals(userId, meals) {
    try {
      const { data } = await api.post("/api/meals/log", {
        userId,
        meals,
      });
      return data;
    } catch (error) {
      console.error("MealPlanService.saveMeals error: ", error);
      throw error;
    }
  }

  static async estimateNutrition(mealDescription) {
    try {
      const { data } = await api.post("/api/estimate-nutrition/", {
        meal_description: mealDescription,
      });
      return data;
    } catch (error) {
      console.error("MealPlanService.estimateNutrition error: ", error);
      throw error;
    }
  }

  static async addMeal(mealData) {
    const { data } = await api.post("/api/meals/", mealData);
    return data;
  }

  static async getMacros(date = null) {
    try {
      const url = date ? `/api/macros/?date=${date}` : "/api/macros/";
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      console.error("Error fetching macros: ", error);
      throw error;
    }
  }

  static async getCalAndMacros(start_date, end_date) {
    try {
      const url = `/api/macros/history/?start_date=${start_date}&end_date=${end_date}`;
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      console.error("Error fetching calories and macros: ", error);
    }
  }
  static async getMeals(date = null) {
    const url = date ? `/api/meals/?date=${date}` : "/api/meals/";
    const { data } = await api.get(url);
    return data;
  }

  static async updateMeal(mealId, updates) {
    const { data } = await api.patch(`/api/meals/${mealId}/`, updates);
    return data;
  }

  static async deleteMeal(mealId) {
    const { data } = await api.delete(`/api/meals/${mealId}/`);
    return data;
  }

  static async reorderMeals(mealsOrder) {
    const { data } = await api.patch("/api/meals/reorder/", {
      meals: mealsOrder,
    });
    return data;
  }
}

export default MealPlanService;
