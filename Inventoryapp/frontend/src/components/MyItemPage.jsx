import React, { useState, useEffect } from 'react';
import { getUserItems, createItem } from '../services/api';
import MyItemCard from './MyItemCard';

export default function MyItemPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));

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
      name,
      description,
      quantity,
      user_id: user.userId
    });
    setName('');
    setDescription('');
    setQuantity(0);
    loadMyItems();
  };

  return (
    <div>
      <h2>My Items</h2>
      
      <form onSubmit={addItem}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        <button>Add Item</button>
      </form>

      <div>
        {items.map(item => (
          <MyItemCard key={item.id} item={item} onUpdate={loadMyItems} />
        ))}
      </div>
    </div>
  );
}