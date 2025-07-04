import { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'https://newonlineauctionproject-backend.onrender.com';

export default function BidForm({ itemId, onBidPlaced }) {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/api/items/bid/${itemId}`, {
        amount,
        user,
      });

      alert('🎉 Bid placed!');
      setAmount('');
      setUser('');
      if (onBidPlaced) onBidPlaced(); // refresh item list
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.response?.data || err.message;
      alert('❌ Error: ' + errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bid-form">
      <input
        type="text"
        placeholder="Your Name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Your Bid (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min="1"
      />
      <button type="submit">Place Bid</button>
    </form>
  );
}
