import React from "react";
import { useState } from "react";
import '../index.css';
import '../App.css'
import { sendAIQuestion } from '../services/Api';
import UserRegistration from '../services/Register'; // Импортируйте компонент регистрации

const Modal = ({
    isOpen,
    OnClose,
    children
} : {
    isOpen:Boolean,
    OnClose:()=>void,
    children:React.ReactNode
}) => {
    if(!isOpen){
        return null;
    }
    return(
        <div 
        id="modal-overlay"
        onClick={OnClose}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1000]"           >
            <div 
            id = "modal-content"
            onClick={e => e.stopPropagation()}
            className="bg-white p-5 rounded-md relative"
            >
                <button 
                id="CloseButton"
                onClick={OnClose}
                className="absolute top-2 right-2 text-sm text-gray-600 hover:text-gray-800" 
                >
                    Закрыть
                </button>
                {children}
            </div>
        </div> 
        );
};

interface Message {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const Main = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // новое состояние для регистрации
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSendQuestion = async () => {
        if (!currentQuestion.trim()) return;
        
        const userMessage: Message = {
            text: currentQuestion,
            isUser: true,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        
        try {
            const response = await sendAIQuestion(currentQuestion);
            const aiMessage: Message = {
                text: response.response || response.answer || 'No response received',
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                text: 'Sorry, there was an error processing your question.',
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setCurrentQuestion('');
        }
    };

    return (
        <div className="p-8 ">
            <h1 className="text-3xl font-bold mb-6">Добро пожаловать на главную страницу!</h1>
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="static bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Start chat 
                </button>
                <button
                    onClick={() => setIsRegisterOpen(true)} // открывает модал регистрации
                    className="static bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Registration
                </button>
            </div>
            <Modal isOpen={isModalOpen} OnClose={() => setIsModalOpen(false)}>
                <div className="w-96 h-96 flex flex-col">
                    <h2 className="text-xl font-bold mb-4">AI Chat</h2>
                    
                    <div className="flex-1 overflow-y-auto mb-4 p-3 border rounded bg-gray-50">
                        {messages.length === 0 ? (
                            <p className="text-gray-500 text-center">Start a conversation with AI!</p>
                        ) : (
                            messages.map((message, index) => (
                                <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
                                    <div className={`inline-block p-2 rounded max-w-xs ${
                                        message.isUser 
                                            ? 'bg-blue-500 text-white' 
                                            : 'bg-white border'
                                    }`}>
                                        {message.text}
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="text-left mb-2">
                                <div className="inline-block p-2 rounded bg-gray-200">
                                    AI is thinking...
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
                            placeholder="Ask AI a question..."
                            className="flex-1 p-2 border rounded"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendQuestion}
                            disabled={isLoading || !currentQuestion.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={isRegisterOpen} OnClose={() => setIsRegisterOpen(false)}>
                <UserRegistration />
            </Modal>
        </div>

    );
};




export default Main;