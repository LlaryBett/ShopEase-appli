const Product = require('../models/Product');

// 🔹 Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 🔹 Get products by section
exports.getProductsBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const products = await Product.find({ section });

    if (!products.length) {
      return res.status(404).json({ message: `No products found in ${section}` });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products by section:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 🔹 Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 🔹 Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Error creating product' });
  }
};

// 🔹 Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: 'Error updating product' });
  }
};

// 🔹 Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Search for products based on query (search all products)
exports.searchProducts = async (req, res) => {
    const { query } = req.query; // Get the search query from the request
  
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }
  
    try {
      console.log('Searching for:', query); // Log the query to see if it's being passed correctly
  
      // Perform the search using case-insensitive regex to match the product name, description, category, and brand
      let products = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },  // Search by product name (case-insensitive)
          { description: { $regex: query, $options: 'i' } },  // Search by description
          { category: { $regex: query, $options: 'i' } }, // Search by category
          { brand: { $regex: query, $options: 'i' } },  // Search by brand (if available)
        ]
      });
  
      // Optional: If the query includes price range (example: 'price:100-200'), handle it
      const priceRangeRegex = /price:([0-9]+)-([0-9]+)/;
      const priceMatch = query.match(priceRangeRegex);
  
      if (priceMatch) {
        const [ , minPrice, maxPrice ] = priceMatch;
        products = products.filter(product => 
          product.price >= Number(minPrice) && product.price <= Number(maxPrice)
        );
      }
  
      // If no products found, return a 404 message
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      // Return the found products
      res.json(products);
    } catch (error) {
      console.error('Error during search:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };