import React from 'react';
import './popup.css';

interface Contact {
  name: string;
  mobile: string;
}

interface TraversalPopupProps {
  isVisible: boolean;
  onClose: () => void;
  traversalData: Contact[];
  traversalType: string;
}

const TraversalPopup: React.FC<TraversalPopupProps> = ({
  isVisible,
  onClose,
  traversalData,
  traversalType,
}) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3>{traversalType} Traversal Result</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="popup-body">
          {traversalData.length > 0 ? (
            <div className="contact-list">
              <div className="contact-header">
                <span className="contact-name">Name</span>
                <span className="contact-number">Phone Number</span>
              </div>
              {traversalData.map((contact, index) => (
                <div key={index} className="contact-item">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-number">{contact.mobile}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No contacts found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraversalPopup;
