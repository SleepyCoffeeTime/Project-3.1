import React, { useState, useEffect } from 'react';
import { getAllItems } from '../services/api';
import ItemCard from './ItemCard';

export default function ItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const response = await getAllItems();
    setItems(response.data);
  };

  return (
    <div>
      <h2>All Items</h2>
      <div>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}