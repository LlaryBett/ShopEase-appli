import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, Plus, X, Search } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-confirm-alert/src/react-confirm-alert.css"; // Import styles

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        wasPrice: "Ksh ",
        isPrice: "Ksh ",
        image: "",
        additionalImages: [],
        stock: "",
        section: "",
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://shopease-appli.onrender.com/api/products");
            setProducts(response.data);
            setFilteredProducts(response.data);
            console.log("Toastify is working well!");
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products", { position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!newProduct.name || !newProduct.description || !newProduct.image || !newProduct.stock) {
            setFormError("Please fill in all required fields.");
            return false;
        }
        setFormError("");
        return true;
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post("https://shopease-appli.onrender.com/api/products", newProduct);
            setNewProduct({
                name: "",
                description: "",
                wasPrice: "Ksh ",
                isPrice: "Ksh ",
                image: "",
                additionalImages: [],
                stock: "",
                section: "",
            });
            fetchProducts();
            toast.success("Product added successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Failed to add product", { position: "top-right" });
        }
    };

    const handleDelete = async (id) => {
        if (!id) {
            toast.error("Invalid product ID", { position: "top-right" });
            return;
        }
    
        const confirmDelete = async () => {
            try {
                await axios.delete(`https://shopease-appli.onrender.com/api/products/${id}`);
                setProducts(products.filter(product => product._id !== id));
                toast.success("Product deleted successfully!", { position: "top-right" });
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product", { position: "top-right" });
            }
        };
    
        toast.info(
            <div>
                <p>Are you sure you want to delete this product?</p>
                <button 
                    onClick={confirmDelete} 
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                >
                    Yes, Delete
                </button>
            </div>,
            { position: "top-right", autoClose: false, closeOnClick: false }
        );
    };
    const handleEditClick = (product) => {
        setEditingProduct({ ...product });
        setIsModalOpen(true);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!editingProduct) return;
    
        console.log("Updating Product:", editingProduct); // Debugging Log
    
        try {
            await axios.put(`https://shopease-appli.onrender.com/api/products/${editingProduct._id}`, editingProduct);
            setEditingProduct(null);
            setIsModalOpen(false);
            fetchProducts();
            toast.success("Product updated successfully!", { position: "top-right" });
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product", { position: "top-right" });
        }
    };
    

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleEditInputChange = (e) => {
        setEditingProduct({ ...editingProduct, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                style={{ zIndex: 9999 }} // Add this inline style
            />
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Product Management</h1>
            {/* Add Product Form */}
            <div className="bg-white shadow rounded-lg p-6 mb-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center space-x-2">
                    <Plus size={20} className="text-green-500" />
                    <span>Add New Product</span>
                </h2>
                <form onSubmit={handleAddProduct} className="space-y-6">
                    {formError && <div className="text-red-500">{formError}</div>}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="wasPrice" className="block text-lg font-medium text-gray-700">
                            Was Price (e.g., Ksh 190)
                        </label>
                        <input
                            type="text"
                            id="wasPrice"
                            name="wasPrice"
                            placeholder="Was Price (e.g., Ksh 190)"
                            value={newProduct.wasPrice}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="isPrice" className="block text-lg font-medium text-gray-700">
                            Current Price (e.g., Ksh 172)
                        </label>
                        <input
                            type="text"
                            id="isPrice"
                            name="isPrice"
                            placeholder="Current Price (e.g., Ksh 172)"
                            value={newProduct.isPrice}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-lg font-medium text-gray-700">
                            Main Image URL *
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="Main Image URL"
                            value={newProduct.image}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="additionalImages" className="block text-lg font-medium text-gray-700">
                            Additional Image URLs (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="additionalImages"
                            name="additionalImages"
                            placeholder="Additional Image URLs (comma-separated)"
                            value={newProduct.additionalImages}
                            onChange={(e) => setNewProduct({ ...newProduct, additionalImages: e.target.value.split(',') })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-lg font-medium text-gray-700">
                            Stock Quantity *
                        </label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            placeholder="Stock Quantity"
                            value={newProduct.stock}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="section" className="block text-lg font-medium text-gray-700">
                            Section (e.g., Most Popular Deals)
                        </label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            placeholder="Section (e.g., Most Popular Deals)"
                            value={newProduct.section}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded focus:outline-none focus:shadow-outline text-lg"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>

            {/* Search Bar */}
            <div className="mb-4 flex items-center">
                <label htmlFor="search" className="mr-2 text-gray-700 text-lg">
                    <Search size={20} />
                </label>
                <input
                    type="text"
                    id="search"
                    placeholder="Search products..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Product List */}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">All Products</h2>
            {loading ? (
                <div className="text-center text-lg">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="w-full h-64 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-xl text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-600 text-lg mb-3">{product.description}</p>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-gray-500 text-lg">
                                        {product.wasPrice && <s className="mr-2">{product.wasPrice}</s>}
                                        <span className="text-green-500">{product.isPrice}</span>
                                    </div>
                                    <div className="text-gray-500 text-lg">Stock: {product.stock}</div>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEditClick(product)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center text-lg"
                                    >
                                        <Edit size={20} className="mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center text-lg"
                                    >
                                        <Trash2 size={20} className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {isModalOpen && editingProduct && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-6 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl leading-6 font-medium text-gray-900">Edit Product</h3>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="px-7 py-4">
                                <label htmlFor="editName" className="block text-lg font-medium text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    id="editName"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editDescription" className="block text-lg font-medium text-gray-700 mt-4">Description</label>
                                <textarea
                                    id="editDescription"
                                    name="description"
                                    value={editingProduct.description}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editWasPrice" className="block text-lg font-medium text-gray-700 mt-4">Was Price</label>
                                <input
                                    type="text"
                                    id="editWasPrice"
                                    name="wasPrice"
                                    value={editingProduct.wasPrice}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editIsPrice" className="block text-lg font-medium text-gray-700 mt-4">Current Price</label>
                                <input
                                    type="text"
                                    id="editIsPrice"
                                    name="isPrice"
                                    value={editingProduct.isPrice}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editImage" className="block text-lg font-medium text-gray-700 mt-4">Image URL</label>
                                <input
                                    type="text"
                                    id="editImage"
                                    name="image"
                                    value={editingProduct.image}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editAdditionalImages" className="block text-lg font-medium text-gray-700 mt-4">Additional Images (comma-separated)</label>
                                <input
                                    type="text"
                                    id="editAdditionalImages"
                                    name="additionalImages"
                                    value={editingProduct.additionalImages}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, additionalImages: e.target.value.split(',') })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editStock" className="block text-lg font-medium text-gray-700 mt-4">Stock</label>
                                <input
                                    type="number"
                                    id="editStock"
                                    name="stock"
                                    value={editingProduct.stock}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />

                                <label htmlFor="editSection" className="block text-lg font-medium text-gray-700 mt-4">Section</label>
                                <input
                                    type="text"
                                    id="editSection"
                                    name="section"
                                    value={editingProduct.section}
                                    onChange={handleEditInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-2 px-3"
                                />
                            </div>
                            <div className="items-center px-4 py-4">
                                <button
                                    onClick={handleUpdateProduct}
                                    className="px-5 py-3 bg-blue-500 hover:bg-blue-700 text-white text-lg font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
