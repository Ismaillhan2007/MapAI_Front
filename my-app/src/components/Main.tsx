import React from "react";
import { useState } from "react";
import '../index.css';
import '../App.css'

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

const Main =()=>{
    const[isModalOpen,setIsModalOpen] = useState(true);
    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Главная страница</h1>
            <p className="mb-4">Добро пожаловать на главную страницу!</p>
            <button 
                onClick={()=>setIsModalOpen(true)}
                className="static bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Start chat 
            </button>
            <Modal isOpen={isModalOpen} OnClose={() => setIsModalOpen(false)}>
                <button >Start chat</button>
            </Modal>
        </div>

    );
};




export default Main;