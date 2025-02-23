import React, { useState } from "react";
import "./Chatbot.css"; 
import axios from "axios";
import { assets } from "../../assets/assets";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/user/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.reply || "I didn't understand that." };

      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
    }

    setInput("");
  };

  return (
    <div>
      {/* Chat Button */}
      <button className="chat-btn" onClick={() => setIsOpen(!isOpen)}>
        <img className="chaticon" src={assets.chat_icon} alt="" /> 
        <p>Chat</p>
      </button>

      {/* Chat Window */}
      <div className={`chat-container ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <span>Chat with us</span>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <p key={index} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
            </p>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;



