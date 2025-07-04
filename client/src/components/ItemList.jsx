import { useEffect, useState } from 'react';
import axios from 'axios';
import BidForm from './BidForm';
import moment from 'moment';

export default function ItemList() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('❌ Error fetching items:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems(); // Refresh list after deletion
    } catch (err) {
      alert('❌ Failed to delete item');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-5 mb-4 text-center text-primary fw-bold">
        📦 Available Auction Items
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-muted">No items listed yet.</p>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{item.title}</h5>
                  <p className="card-text text-muted small">{item.description}</p>

                  <p className="mb-1">
                    <strong>Current Bid:</strong>{' '}
                    <span className="text-success">₹{item.currentBid}</span>
                  </p>
                  <p className="mb-2">
                    <strong>Ends:</strong>{' '}
                    <span className="text-danger">
                      {moment(item.endTime).format('LLL')}
                    </span>
                  </p>

                  <BidForm itemId={item._id} onBidPlaced={fetchItems} />

                  <button
                    className="btn btn-outline-danger btn-sm mt-3"
                    onClick={() => handleDelete(item._id)}
                  >
                    🗑️ Delete
                  </button>

                  {item.bids?.length > 0 && (
                    <div className="mt-4">
                      <strong>Recent Bids</strong>
                      <ul className="list-group list-group-flush mt-2">
                        {item.bids.slice(-3).reverse().map((bid, idx) => (
                          <li className="list-group-item px-2 py-1" key={idx}>
                            ₹{bid.amount} by <strong>{bid.user}</strong>{' '}
                            <span className="text-muted">
                              ({moment(bid.time).fromNow()})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
