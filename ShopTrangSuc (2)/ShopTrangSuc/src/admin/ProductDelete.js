import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/admin/productDelete.css";

const Product = () => {
    // Initial product data
    const initialProducts = [
        {
            id: "P001",
            product_name: "Sản phẩm 1",
            image: "https://via.placeholder.com/100",
            description: "Không có",
            price: "100.000 VNĐ",
            quantity: 10,
        },
        {
            id: "P002",
            product_name: "Sản phẩm 2",
            image: "https://via.placeholder.com/100",
            description: "Mô tả sản phẩm 2",
            price: "200.000 VNĐ",
            quantity: 5,
        },
        // Add more products as needed
    ];

    const [products, setProducts] = useState(initialProducts);
    const [showCheckBox, setShowCheckBox] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState([]);

    const handleEdit = (productId) => {
        const product = products.find((product) => product.id === productId);
        alert(`Bạn muốn khôi phục sản phẩm: ${product.product_name}`);
    };

    return (
        <div className="productDelete">
            <div className="card-delete">
                <p className="font-productDelete"><i className="bi bi-layout-text-sidebar-reverse"></i> Danh sách sản phẩm đã xóa</p>
                <hr className="hr-productDelete" />
                <div className="card-body-delete">
                    <table className="table-delete">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Mô tả</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.product_name}
                                            className="images"
                                        />
                                    </td>
                                    <td>{product.product_name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(product.id)}
                                            className="btn btn-restore"
                                        >
                                            Khôi phục
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Product;
