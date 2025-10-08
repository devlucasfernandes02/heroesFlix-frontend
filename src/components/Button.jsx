import React from 'react';

const buttonStyle = {
    padding: '10px 40px',
    backgroundColor: '#1948c7ff',
    color: '#FFF',
    fontSize: '20px',
    fontWeight: 600,
    border: '2px solid rgb(51,51,51)',
    borderRadius: '1px',
    cursor: 'pointer',
    transition: 'background-color 0.5s, border 0.5s',
};

const hoverStyle = {
    backgroundColor: 'transparent',
    border: '2px solid #1948c7ff',
};

export default function Button({ children, ...props }) {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <button
            style={isHovered ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {children}
        </button>
    );
}