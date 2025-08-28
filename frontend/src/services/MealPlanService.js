import api from "../api";
import { N8N_WEBHOOK_URL } from "../api";

class MealPlanService {
  // Trigger meal plan generation via n8n webhook
  static async generateMealPlan(userId) {
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
      console.log("Triggering meal plan generation for user: ", userId);
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          message: "hello",
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Webhook request failed: ${response.status} ${response.statusText}`
        );
      }
      const mealPlanData = await response.json();
      console.log("Hello. Meal plan generated successfully: ", mealPlanData);
      return mealPlanData;
    } catch (error) {
      console.error("Error generating meal plan: ", error);
      throw new Error(`Failed to generate meal plan: ${error.message}`);
    }
  }
  static async getCurrentUserId() {
    try {
      const { data } = await api.get("/api/profile/");
      console.log("DEBUG - profile data:", data);
      console.log("DEBUG - user ID:", data.user, typeof data.user);
      return data.user;
    } catch (error) {
      console.error("Error getting current user ID: ", error);
      throw new Error("Failed to get user information");
    }
  }
}
export default MealPlanService;
