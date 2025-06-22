import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./Dashboard.css";

export default function AdminMenuManagement() {
    const [menuItems, setMenuItems] = useState([]);
    const [formData, setFormData] = useState({ //form input store
        id: "",
        name: "",
        category: "",
        price: "",
        image: null, // New image field
    });
    const [editing, setEditing] = useState(false);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = () => {
        fetch("http://localhost:8080/api/menu")
            .then((res) => res.json())
            .then(setMenuItems)
            .catch((err) => console.error("Fetch error", err));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });//input field (text or number) change
        //...formdta la prev value store pnaro
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] }); // Handle image file

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editing ? "PUT" : "POST";
        const url = editing
            ? `http://localhost:8080/api/menu/${formData.id}`
            : "http://localhost:8080/api/menu";

        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);//drinks meals etc
        data.append("price", formData.price);
        if (formData.image) {
            data.append("image", formData.image);
        }

        //fetch to be
        fetch(url, { 
            method,  
            body: data,
        })
            .then(() => {
                fetchMenuItems(); // Refresh list
                setFormData({ id: "", name: "", category: "", price: "", image: null }); // Clear form
                setEditing(false);
            })
            .catch(() => alert("Failed to save item")); 
    };

    const handleEdit = (item) => {
        setFormData({   //edit kudutha ,thana fill agum form la
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            image: null, // Do not prefill image
        });
        setEditing(true);
    };
//menu delete panrom
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure?")) return;
        fetch(`http://localhost:8080/api/menu/${id}`, { method: "DELETE" })
            .then(() => {
                fetchMenuItems();
                alert("Item deleted");
            })
            .catch(() => alert("Delete failed"));
    };

    const filteredItems =
        filter === "All"
            ? menuItems
            : menuItems.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

    return (
        <div className="admin-dashboard">
            <AdminNavbar />
            <div className="admin-content">
                <h2>{editing ? "✏️ Edit Menu Item" : "➕ Add Menu Item"}</h2>
                <form onSubmit={handleSubmit} className="user-form" encType="multipart/form-data">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                        required
                    />
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category (e.g., Drinks)"
                        required
                    />
                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required={!editing}
                    />
                    <button type="submit">{editing ? "Update" : "Create"}</button>
                </form>

                <h2>🍽️ Menu Items</h2>
                <div style={{ marginBottom: "10px" }}>
                    <label>Filter by Category: </label>
                    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="All">All</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Meals">Meals</option>
                    </select>
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item, i) => ( //all item id name catogiry prize display panro
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>₹{item.price}</td>
                                <td> 
                                    {item.image && (
                                        <img
                                            src={`http://localhost:8080/uploads/${item.image}`}
                                            alt={item.name}
                                            style={{ width: '50px', height: '50px' }}//backend la uploads la iirukum
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(item)}>✏️</button>
                                    <button onClick={() => handleDelete(item.id)}>❌</button>
                                </td>
                            </tr>
                        ))}
                        {filteredItems.length === 0 && (
                            <tr>
                                <td colSpan="6">No items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
