import React, { useState, useEffect } from 'react';
import { getAllItems } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

}