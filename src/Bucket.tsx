import React from 'react';
import Payload from './Payload';

interface BucketProps {
  id: string;
  payloads: { id: string; text: string }[];
  onDrop: (payloadId: string, bucketId: string) => void;
}

const Bucket: React.FC<BucketProps> = ({ id, payloads, onDrop }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const payloadId = e.dataTransfer.getData('text/plain');
    onDrop(payloadId, id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        minHeight: '100px',
        border: '1px solid blue',
        padding: '8px',
        margin: '8px',
        minWidth: 200,
      }}
    >
      {payloads.map((payload) => (
        <Payload key={payload.id} id={payload.id} text={payload.text} />
      ))}
    </div>
  );
};

export default Bucket;
