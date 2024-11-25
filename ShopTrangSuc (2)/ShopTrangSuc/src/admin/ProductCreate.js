import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/admin/ProductCreate.css";

let productIdCounter = 1;

const ProductCreate = ({ onCreate, onCancel }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        product_name: "",
        price: "",
        description: "",
        quantity: "",
        image: null,
    });
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newProduct = {
                id: `P${String(productIdCounter).padStart(3, "0")}`,
                product_name: formData.product_name,
                price: formData.price,
                description: formData.description,
                quantity: formData.quantity,
                image: imagePreview,
            };
            productIdCounter++;
            await onCreate(newProduct);
            setMessage("Sản phẩm đã được tạo thành công!");
            alert("Thêm sản phẩm thành công");

            setFormData({
                product_name: "",
                price: "",
                description: "",
                quantity: "",
                image: null,
            });
            setImagePreview("");
        } catch (error) {
            console.error("Lỗi khi tạo sản phẩm:", error);
            setMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    const handleCancelClick = () => {
        onCancel(); // Gọi hàm onCancel được truyền từ cha
        setFormData({
            product_name: "",
            price: "",
            description: "",
            quantity: "",
            image: null,
        });
        setImagePreview("");
        setMessage("");
    };

    return (
        <div className="create-product">
            <p className="fontcreate-product">Thêm Sản Phẩm Mới</p>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <div className="form-column">
                        <div>
                            <label className="label-create-product">Tên:</label>
                            <input
                                type="text"
                                name="product_name"
                                value={formData.product_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label-create-product">Ảnh:</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                required
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="image-preview"
                                />
                            )}
                        </div>
                    </div>
                    <div className="form-column">
                        <div>
                            <label className="label-create-product">Số lượng:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label-create-product">Giá:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label-create-product">Mô tả:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                style={{ resize: "vertical", minHeight: "100px" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button
                        onClick={handleCancelClick}
                        className="btn back1-button"
                    >
                        Trở Về
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-create"
                    >
                        Tạo Mới
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductCreate;
