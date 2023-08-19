import React, { useState, useEffect } from 'react';

function ChatGPT() {
    const [chatMessages, setChatMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isChatVisible, setIsChatVisible] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        // Add initial assistant message when the component mounts
        const initialAssistantMessage = {
            role: 'assistant',
            text: "Hi! I'm ChefGPT. Ask me any recipe!"
        };
        setChatMessages([initialAssistantMessage]);
    }, []);

    const handleSendMessage = async () => {
        if (userInput.trim() === '' || isTyping) return;

        const userMessage = {
            role: 'user',
            text: userInput.trim(),
        };

        setChatMessages(prevMessages => [...prevMessages, userMessage]);

        setIsTyping(true);

        const apiEndpoint = "https://api.openai.com/v1/chat/completions";
        const apiKey = "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";  // Replace with your actual API key

        const conversation = {
            model: "gpt-4", // or "gpt-3.5-turbo"
            messages: chatMessages.concat(userMessage).map(msg => ({ role: msg.role, content: msg.text }))
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify(conversation),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const botReply = data.choices[0].message.content.trim();

            setIsTyping(false);

            const botMessage = {
                role: 'assistant',
                text: botReply,
            };

            setChatMessages(prevMessages => [...prevMessages, botMessage]);
            setUserInput('');
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
        }
    };

    return (
        <div className="chatbot-container">
            <button onClick={() => setIsChatVisible(!isChatVisible)} className="toggle-chat-btn">
                {isChatVisible ? "Hide Chat" : "Show Chat"}
            </button>

            {isChatVisible && (
                <div className="chatbot">
                    <div className="chat-header">
                        ChefGPT
                    </div>
                    <div className="chat-messages">
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.role}`}>
                                {message.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-message">
                                Typing...
                            </div>
                        )}
                    </div>
                    <div className="chat-input">
                        <input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatGPT;