import React, { useState } from "react";

function MealPlanChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "hi, i am your personal meal planning assistant",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: `Based on your request: "${userMessage.content}"`,
      };
    } catch {
    } finally {
    }
  };
  return;
  <div>
    <div></div>
    <h2>Hello</h2>
  </div>;
}

export default MealPlanChat;
