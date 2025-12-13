import React, { useEffect, useState } from "react";
import MealPlanService from "../services/MealPlanService";

function MealPlanChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isManualMealModalOpen, setIsManualModelOpen] = useState(false);

  const getLbl = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return "Breakfast";
      case "lunch":
        return "Lunch";
      case "dinner":
        return "Dinner";
      case "snack":
        return "Snack";
      default:
        return mealType ?? "";
    }
  };

  // const mealType = getLbl(label);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const currentUserId = await MealPlanService.getCurrentUserId();
        setUserId(currentUserId);
        setMessages([
          {
            sender: "ai",
            content:
              "Hi, I am your AI nutrition assistant. How can I help you today?",
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Failed to initialize chat: ", error);
      }
    };
    initializeChat();
  }, []);

  useEffect(() => {
    // console.log("Selected meals:", selectedMeals);
  }, [selectedMeals]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !userId || isLoading) return;
    const userMessage = {
      sender: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // const response = await MealPlanService.sendChatMessage(
      //   userId,
      //   userMessage.content
      // );
      const todayLocal = new Date().toLocaleDateString("en-CA");
      const macroData = await MealPlanService.getMacros(todayLocal);
      const response = await MealPlanService.sendChatMessage(
        userId,
        userMessage.content,
        macroData.remaining // pass remaining macros
      );
      // const response = {
      //   output: JSON.stringify({
      //     meals: [
      //       {
      //         id: "oatmeal-001",
      //         meal_description: "warm oatmeal topped with blueberries",
      //         meal_type: "Breakfast",
      //         calories: 350,
      //         protein: 12,
      //         carbs: 55,
      //         fat: 8,
      //       },
      //       {
      //         id: "chicken-002",
      //         meal_description:
      //           "Lean grilled chicken served with quinoa and vegetables.",
      //         meal_type: "Lunch",
      //         calories: 550,
      //         protein: 40,
      //         carbs: 45,
      //         fat: 15,
      //       },
      //       {
      //         id: "salmon-003",
      //         meal_description: "Oven-baked salmon fillet with steamed rice.",
      //         meal_type: "Dinner",
      //         calories: 600,
      //         protein: 42,
      //         carbs: 50,
      //         fat: 22,
      //       },
      //     ],
      //   }),
      // };

      // const aiMessage = {
      //   sender: "ai",
      //   timestamp: new Date(),
      //   content: response.output || "Sorry, I couldn't generate a response",
      //   // content: `Based on your request: "${userMessage.content}"`
      // };
      // setMessages((prev) => [...prev, aiMessage]);
      let messageToAdd = null;

      const jsonMatch = response.output.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);

          if (parsed && Array.isArray(parsed.meals)) {
            // it's a meal plan
            messageToAdd = {
              sender: "ai",
              type: "mealplan",
              data: parsed,
              timestamp: new Date(),
            };
          }
        } catch (err) {
          messageToAdd = {
            sender: "ai",
            type: "text",
            content: response.output,
            timestamp: new Date(),
          };
        }
      } else {
        // not a valid meal plan JSON
        messageToAdd = {
          sender: "ai",
          type: "text",
          content: response.output,
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, messageToAdd]);
      // console.log(messageToAdd);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        sender: "ai",
        timestamp: new Date(),
        content: "Sorry, there was an error",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleSaveSelectedMeals = async () => {
    // console.log("Button clicked!");
    // console.log("test1");
    // console.log("selected meals: ", selectedMeals);
    // console.log("test2");
    // console.log("messages: ", messages);

    // const mealsToSave = messages
    //   .filter((msg) => msg.type === "mealplan")
    //   .flatMap((msg) =>
    //     msg.data.meals
    //       .filter((meal) => selectedMeals.includes(meal.id))
    //       .map((meal) => ({
    //         meal_description: meal.meal_description,
    //         meal_type: meal.meal_type,
    //         date: new Date().toLocaleDateString("en-CA"), // Today in local timezone
    //         calories: meal.calories,
    //         protein: meal.protein,
    //         carbs: meal.carbs,
    //         fat: meal.fat,
    //         source: "ai_generated",
    //       }))
    //   );
    // const mealsToSave = selectedMeals
    //   .filter((msg) => msg.type === "mealplan")
    //   .flatMap((msg) =>
    //     msg.data.meals
    //       .filter((meal) => selectedMeals.includes(meal.id))
    //       .map((meal) => ({
    //         meal_description: meal.meal_description,
    //         meal_type: meal.meal_type,
    //         date: new Date().toLocaleDateString("en-CA"), // Today in local timezone
    //         calories: meal.calories,
    //         protein: meal.protein,
    //         carbs: meal.carbs,
    //         fat: meal.fat,
    //         source: "ai_generated",
    //       }))
    //   );
    const mealsToSave = selectedMeals.map((meal) => ({
      meal_description: meal.meal_description,
      meal_type: meal.meal_type,
      date: new Date().toLocaleDateString("en-CA"),
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      calories: meal.protein * 4 + meal.carbs * 4 + meal.fat * 9, // dynamically calculated
      source: "ai_generated",
    }));
    // console.log("meals to save: ", mealsToSave);

    if (!mealsToSave.length) return;
    console.log("mealsToSave: ", mealsToSave);
    try {
      // await MealPlanService.saveMeals(userId, mealsToSave);
      for (const meal of mealsToSave) {
        // console.log("meal i: ", meal);
        // console.log("test");
        await MealPlanService.addMeal(meal);
      }
      //await new Promise((resolve) => setTimeout(resolve, 500));
      // console.log("Meals saved (mocked):", mealsToSave);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          type: "text",
          content: "Your selected meals were saved",
          timestamp: new Date(),
        },
      ]);
      setSelectedMeals([]);
    } catch (error) {
      console.error(error);
    }
  };

  // renderer

  const renderMealPlan = (meals) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
          fontFamily: "monospace",
        }}
      >
        {meals.map((meal) => {
          const isSelected = selectedMeals.includes(meal);
          return (
            <div
              key={meal.id}
              onClick={() => handleSelectMeal(meal)}
              style={{
                backgroundColor: isSelected ? "#e1dee8ff" : "#fff",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                fontFamily: "monospace",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "4px",
                  fontFamily: "monospace",
                  fontSize: "18px",
                }}
              >
                {/* {meal.meal_type}: */}
                {getLbl(meal.meal_type)}
              </div>

              {meal.meal_description && (
                <div
                  style={{
                    color: "#555",
                    marginBottom: "6px",
                    fontFamily: "monospace",
                    fontFamily: "monospace",
                    fontSize: "15px",
                  }}
                >
                  {meal.meal_description}
                </div>
              )}

              {/* <div style={{ fontSize: "14px", color: "#333" }}>
                <strong>Portion:</strong> {meal.portion}
              </div> */}

              <div
                style={{
                  marginTop: "6px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                }}
              >
                <strong>Macros:</strong>
                <div style={{ fontFamily: "monospace" }}>
                  Calories: {meal.protein * 4 + meal.carbs * 4 + meal.fat * 9} g
                </div>
                <div style={{ fontFamily: "monospace" }}>
                  Protein: {meal.protein} g
                </div>
                <div style={{ fontFamily: "monospace" }}>
                  Carbs: {meal.carbs} g
                </div>
                <div style={{ fontFamily: "monospace" }}>Fat: {meal.fat} g</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const handleSelectMeal = (mealId) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        border: "3px solid #2196F3",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          fontFamily: "monospace",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {/* <div
              style={{
                maxWidth: "80%",
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor:
                  message.sender === "user" ? "#2196F3" : "#f1f1f1",
                color: message.sender === "user" ? "white" : "black",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {message.content}
            </div> */}
            <div
              style={{
                maxWidth: "80%",
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor:
                  message.sender === "user" ? "#2196F3" : "#f1f1f1",
                color: message.sender === "user" ? "white" : "black",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                fontFamily: "monospace",
              }}
            >
              {message.type === "mealplan"
                ? renderMealPlan(message.data.meals)
                : message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor: "#f1f1f1",
                color: "#456",
              }}
            >
              AI is typing...
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #eee",
          display: "flex",
          gap: "10px",
        }}
      >
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter text"
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "12px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            resize: "none",
            minHeight: "20px",
            maxHeight: "80px",
            fontFamily: "inherit",
            fontSize: "14px",
            fontFamily: "monospace",
          }}
          rows="1"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !userId || isLoading}
          style={{
            padding: "12px 20px",
            backgroundColor: isLoading ? "#ccc" : "#c5ced3ff",
            color: "#000000",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            fontFamily: "monospace",
          }}
        >
          Send
        </button>
        {selectedMeals.length > 0 && (
          <button
            onClick={handleSaveSelectedMeals}
            style={{
              //marginTop: "10px",
              padding: "12px 20px",
              backgroundColor: "#c5ced3ff",
              color: "#000000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontFamily: "monospace",
            }}
          >
            Save Selected Meals
          </button>
        )}
        {/* <div>
          <strong>Selected meal IDs:</strong> {JSON.stringify(selectedMeals)}
        </div> */}
      </div>
    </div>
  );
}

export default MealPlanChat;
