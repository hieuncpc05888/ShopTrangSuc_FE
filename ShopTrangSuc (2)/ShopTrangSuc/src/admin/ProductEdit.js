import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/admin/ProductEdit.css';

const ProductEdit = ({ product, onUpdate, onCancel }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        product_name: '',
        price: '',
        description: '',
        quantity: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                product_name: product.product_name,
                price: product.price,
                description: product.description,
                quantity: product.quantity,
                image: product.image,
            });
            setImagePreview(product.image); // Set initial image preview
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file)); // Set image preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                updatedData.append(key, value);
            });

            await onUpdate(updatedData);
            setMessage('Sản phẩm đã được cập nhật thành công!');
            alert('Cập nhật sản thành công');

            // Call onCancel to reset editing state and navigate back
            onCancel();
            navigate('/admin/dashboard'); // Redirect to the desired page
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            setMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleBack = () => {
        onCancel();
        navigate('/admin/dashboard');
    };

    return (
        <div className="edit-product">
            <h1 className="fontedit-product">Cập nhật Sản Phẩm</h1>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <div className="form-column">
                        <div>
                            <label className="label-create-product">ID:</label>
                            <input
                                className="input-product"
                                type="text"
                                name="id"
                                value={formData.id}
                                readOnly
                                required
                            />
                        </div>
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
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="image-preview" />
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
                                style={{ resize: 'vertical', minHeight: '100px' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={handleBack} className="btn back2-button">Trở Về</button>
                    <button type="submit" className="btn btn-save">Lưu</button>
                </div>
            </form>
        </div>
    );
};

export default ProductEdit;
