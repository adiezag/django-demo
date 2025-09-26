import React, { useEffect, useState } from "react";
import MealPlanService from "../services/MealPlanService";

function MealPlanChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

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
      const response = await MealPlanService.sendChatMessage(
        userId,
        userMessage.content
      );

      const aiMessage = {
        sender: "ai",
        timestamp: new Date(),
        content: response.output || "Sorry, I couldn't generate a response",
        // content: `Based on your request: "${userMessage.content}"`
      };
      setMessages((prev) => [...prev, aiMessage]);
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
              }}
            >
              {message.content}
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
          }}
          rows="1"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || !userId || isLoading}
          style={{
            padding: "12px 20px",
            backgroundColor: isLoading ? "#ccc" : "#546E7A",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MealPlanChat;
