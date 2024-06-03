import React, { useState } from 'react';
import Bucket from './Bucket';
import Payload from './Payload';

interface Payload {
  id: string;
  text: string;
}

const initialPayloads: Payload[] = [
  { id: 'payload1', text: 'Payload 1' },
  { id: 'payload2', text: 'Payload 2' },
  { id: 'payload3', text: 'Payload 3' },
  { id: 'payload4', text: 'Payload 4' },
  { id: 'payload5', text: 'Payload 5' },
  { id: 'payload6', text: 'Payload 6' },
];

export const App: React.FC = () => {
  const [payloads, setPayloads] = useState<Payload[]>(initialPayloads);
  const [buckets, setBuckets] = useState<{ [key: string]: Payload[] }>({
    bucket1: [],
    bucket2: [],
  });

  const handleDrop = (payloadId: string, bucketId: string) => {
    const payload = payloads.find((p) => p.id === payloadId);
    if (!payload) return;

    setBuckets((prevBuckets) => {
      const newBuckets = { ...prevBuckets };
      Object.keys(newBuckets).forEach((key) => {
        newBuckets[key] = newBuckets[key].filter((p) => p.id !== payloadId);
      });
      newBuckets[bucketId].push(payload);
      return newBuckets;
    });
  };

  return (
    <div>
      <h1>Drag and Drop</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '16px' }}>
          <h2>Available Payloads</h2>
          <div style={{ flexDirection: 'row' }}>
            {payloads
              .filter((p) => !Object.values(buckets).flat().includes(p))
              .map((payload) => (
                <Payload key={payload.id} id={payload.id} text={payload.text} />
              ))}
          </div>
        </div>
        <div style={{ flexDirection: 'row' }}>
          <h2>Bucket 1</h2>
          <Bucket id='bucket1' payloads={buckets.bucket1} onDrop={handleDrop} />
          <h2>Bucket 2</h2>
          <Bucket id='bucket2' payloads={buckets.bucket2} onDrop={handleDrop} />
        </div>
      </div>
    </div>
  );
};

