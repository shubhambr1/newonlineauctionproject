import React from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './styles.css';

function App() {
  return (
    <div className="container">
      <h1>🎯 Online Auction Platform</h1>
      <ItemForm />
      <ItemList />
    </div>
  );
}

export default App;
