// components/CustomButton.tsx
"use client";

import React from 'react';


interface CustomButtonProps {
    text: string;
    className?: string;
}


const CustomButton: React.FC<CustomButtonProps> = ({ text, className }) => {

    const handleButtonClick = () => {
        alert(`Button "${text}" was clicked!`);
    };

    return (
        <button
            className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
            onClick={handleButtonClick}
        >
            {text}
        </button>
    );
};

export default CustomButton;
