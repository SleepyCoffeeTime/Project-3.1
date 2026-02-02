import React, { useState, useEffect } from 'react';
import { getItem } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const response = await getItem(id);
    setItem(response.data);
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => navigate('/inventory')}>Back</button>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
}