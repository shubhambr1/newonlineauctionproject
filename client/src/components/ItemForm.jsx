import { useState } from 'react';
import axios from 'axios';

export default function ItemForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startingBid: 0,
    endTime: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/items', form);
      alert('✅ Item listed successfully!');
      setForm({ title: '', description: '', startingBid: 0, endTime: '' });
    } catch (err) {
      alert('❌ Failed to list item: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>📝 List a New Auction Item</h2>
      <input
        name="title"
        placeholder="Item Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Item Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="startingBid"
        type="number"
        placeholder="Starting Bid ₹"
        value={form.startingBid}
        onChange={handleChange}
        required
      />
      <input
        name="endTime"
        type="datetime-local"
        value={form.endTime}
        onChange={handleChange}
        required
      />
      <button type="submit">Post Auction</button>
    </form>
  );
}
