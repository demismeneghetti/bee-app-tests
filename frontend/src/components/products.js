import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
    setProducts(response.data);
  };

  const addProduct = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/products`, { name, price });
    fetchProducts();
  };

  const updateProduct = async (id) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, { name, price });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div>
      <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Product Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>

      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => updateProduct(product._id)}>Update</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
