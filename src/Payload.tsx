import React from 'react';

interface PayloadProps {
  id: string;
  text: string;
}

const Payload: React.FC<PayloadProps> = ({ id, text }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{ padding: '8px', border: '1px solid black', marginBottom: '4px' }}
    >
      {text}
    </div>
  );
};

export default Payload;
