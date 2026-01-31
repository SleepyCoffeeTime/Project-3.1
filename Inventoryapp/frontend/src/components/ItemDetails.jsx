import React, { useState, useEffect } from 'react';
import { getAllItems } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function ItemsDetails() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

}