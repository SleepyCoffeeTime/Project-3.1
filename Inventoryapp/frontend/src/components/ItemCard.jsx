import React from 'react';

export default function ItemCard({ item }) {
  return (
  <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Owner: {item.owner}</p>
    </div>
  );
}