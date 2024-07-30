import React from 'react';

interface ConfirmPopupProps{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({message, onConfirm, onCancel }) => {
    return(
        <div className="popup-overlay">
            <div className="popup-container">
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default ConfirmPopup;