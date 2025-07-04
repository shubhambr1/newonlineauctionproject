import { useState } from 'react';
import axios from 'axios';

export default function BidForm({ itemId, onBidPlaced }) {
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://newonlineauctionproject-backened.onrender.com/api/items/bid/${itemId}`, {
        amount,
        user,
      });
      alert('🎉 Bid placed!');
      setAmount('');
      setUser('');
      if (onBidPlaced) onBidPlaced(); // refresh item list
    } catch (err) {
      alert('❌ Error: ' + err.response?.data || err.message);
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
      />
      <button type="submit">Place Bid</button>
    </form>
  );
}
