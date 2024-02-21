const express = require('express');
const fetchUser = require('../middleware/user');

const router = express.Router();

router.get('/', fetchUser, async (req, res) => {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
