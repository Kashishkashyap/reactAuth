import React, { useEffect, useState } from 'react';
import './styling/products.css';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = !!localStorage.getItem('token');

const Products = () => {
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated, navigate]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products/', {
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                }
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data.products);
                setFilteredProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterProducts(e.target.value, minPrice, maxPrice);
    };

    const handlePriceFilter = () => {
        filterProducts(searchTerm, minPrice, maxPrice);
    };

    const filterProducts = (searchTerm, minPrice, maxPrice) => {
        let filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (minPrice === '' || product.price >= parseFloat(minPrice)) &&
            (maxPrice === '' || product.price <= parseFloat(maxPrice))
        );
        setFilteredProducts(filtered);
    };

    const addToCart = (productId) => {
        const selectedProduct = products.find(product => product.id === productId);
        if (selectedProduct) {
            setCart([...cart, selectedProduct]);
            alert('Product added to cart!');
        }
    };

    return (
        <div className="container products mt-5">
            <h2 className="mb-4">Products</h2>
            <div className="search-filter mb-5">
                <input type="text" placeholder="Search by product name" value={searchTerm} onChange={handleSearch} />
                <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <button onClick={handlePriceFilter}>Filter</button>
            </div>
            <div className="row">
                {filteredProducts.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <img src={product.thumbnail} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                <p className="card-text"><strong>Rating:</strong> {product.rating}</p>
                                <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 m-2" style={{ width: '80px' }} onClick={() => addToCart(product.id)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-info">
                <p>Cart Count: {cart.length}</p>
                <p>Total Amount: ${cart.reduce((acc, curr) => acc + curr.price, 0)}</p>
            </div>
        </div>
    );
}

export default Products;
