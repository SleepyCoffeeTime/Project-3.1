import React, { useState } from 'react';
import { updateItem, deleteItem } from '../services/api';

export default function MyItemCard({ item, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [quantity, setQuantity] = useState(item.quantity);

  const saveChanges = async (e) => {
    e.preventDefault();
    await updateItem(item.id, { name, description, quantity });
    setEditing(false);
    onUpdate();
  };

  const removeItem = async () => {
    if (window.confirm('Delete this item?')) {
      await deleteItem(item.id);
      onUpdate();
    }
  };

return (
  <div className="item-card" style={editing ? { background: '#FFF0F5' } : {}}>
      {editing ? (
        <form onSubmit={saveChanges}>
          <h3>Editing Mode</h3>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="4"
            style={{ width: '100%' }}
          />
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder="Quantity"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={removeItem}>Delete</button>
        </div>
      )}
    </div>
  );
}