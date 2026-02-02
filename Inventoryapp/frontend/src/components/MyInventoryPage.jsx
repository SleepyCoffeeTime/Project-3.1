import React, { useState, useEffect } from 'react';
import { getUserItems, createItem, deleteItem } from '../services/api';

export default function MyInventoryPage({ user }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    loadMyItems();
  }, []);

  const loadMyItems = async () => {
    const response = await getUserItems(user.userId);
    setItems(response.data);
  };

  const addItem = async (e) => {
    e.preventDefault();
    await createItem({
      name: name,
      description: description,
      quantity: quantity,
      user_id: user.userId
    });
    setName('');
    setDescription('');
    setQuantity(0);
    loadMyItems();
  };

  const removeItem = async (id) => {
    await deleteItem(id);
    loadMyItems();
  };

  return (
    <div>
      <h2>My Inventory</h2>
      
      <form onSubmit={addItem}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <button>Add Item</button>
      </form>

      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Qty: {item.quantity}</p>
          <button onClick={() => removeItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}