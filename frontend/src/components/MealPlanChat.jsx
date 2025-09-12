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
