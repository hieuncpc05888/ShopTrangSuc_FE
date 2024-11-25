import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/admin/product.css";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";

const Product = () => {
  // Initial product data
  const initialProducts = [
    {
      id: "P001",
      product_name: "Sản phẩm 1",
      image: "https://via.placeholder.com/100",
      description: "Không có",
      price: "100.000 VNĐ",
      material: "Bạc",
      type: "Vòng tay",
      quantity: 10,
    },
    {
      id: "P002",
      product_name: "Sản phẩm 2",
      image: "https://via.placeholder.com/100",
      description: "Mô tả sản phẩm 2",
      price: "200.000 VNĐ",
      material: "Vàng",
      type: "Hoa tai",
      quantity: 5,
    },
    {
      id: "P003",
      product_name: "Sản phẩm 3",
      image: "https://via.placeholder.com/100",
      description: "Mô tả sản phẩm 3",
      price: "300.000 VNĐ",
      material: "Vàng",
      type: "Vòng cổ",
      quantity: 2,
    },
    {
      id: "P004",
      product_name: "Sản phẩm 4",
      image: "https://via.placeholder.com/100",
      description: "Mô tả sản phẩm 4",
      price: "400.000 VNĐ",
      material: "Titan",
      type: "Vòng tay",
      quantity: 1,
    },
    {
      id: "P005",
      product_name: "Sản phẩm 5",
      image: "https://via.placeholder.com/100",
      description: "Mô tả sản phẩm 5",
      price: "500.000 VNĐ",
      material: "Bạc",
      type: "Nhẫn",
      quantity: 8,
    },
    {
      id: "P006",
      product_name: "Sản phẩm 6",
      image: "https://via.placeholder.com/100",
      description: "Mô tả sản phẩm 6",
      price: "600.000 VNĐ",
      material: "Bạc",
      type: "Vòng tay",
      quantity: 3,
    },
    // Thêm sản phẩm khác nếu cần
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số sản phẩm hiển thị trên mỗi trang

  // Tính toán các chỉ số sản phẩm để hiển thị
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setShowCreateForm(true);
  };

  const handleEdit = (productId) => {
    const product = products.find((product) => product.id === productId);
    setProductToEdit(product);
  };

  const handleDelete = () => {
    setProducts(
      products.filter((product) => !selectedProductIds.includes(product.id))
    );
    alert(`Xóa các sản phẩm: ${selectedProductIds.join(", ")}`);
    setShowCheckBox(false);
    setSelectedProductIds([]);
  };

  const toggleCheckBox = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    setShowCheckBox(true);
  };

  const resetSelection = () => {
    setShowCheckBox(false);
    setSelectedProductIds([]);
  };

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính số trang
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // console.log(`Current Page: ${currentPage}`, currentProducts);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 2;

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 1) {
        pageNumbers.push(1, 2, "...");
      } else if (currentPage >= totalPages) {
        pageNumbers.push("...", totalPages - 1, totalPages);
      } else {
        pageNumbers.push("...", currentPage, "...");
      }
    }

    return pageNumbers;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleUpdateProduct = async (updatedProductData) => {
    const productId = updatedProductData.get("id");
    const existingProduct = products.find((p) => p.id === productId);

    if (!existingProduct) {
      setMessage("Sản phẩm không tìm thấy!");
      return;
    }

    const updatedProduct = {
      id: productId,
      product_name:
        updatedProductData.get("product_name") || existingProduct.product_name,
      price: updatedProductData.get("price") || existingProduct.price,
      description:
        updatedProductData.get("description") || existingProduct.description,
      quantity: updatedProductData.get("quantity") || existingProduct.quantity,
      image: updatedProductData.get("image") || existingProduct.image,
    };

    // Cập nhật sản phẩm trong state
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    setMessage("Cập nhật sản phẩm thành công!");
    setProductToEdit(null); // Reset trạng thái sau khi cập nhật

    // Giải phóng URL hình ảnh cũ nếu cần
    if (existingProduct.image !== updatedProduct.image) {
      URL.revokeObjectURL(existingProduct.image);
    }
  };

  const handleCreateProduct = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]); // Chèn sản phẩm mới vào đầu danh sách
    setShowCreateForm(false); // Đóng form thêm sản phẩm
    setCurrentPage(1); // Đặt lại trang về 1 để hiển thị sản phẩm mới
  };

  const [selectedType, setSelectedType] = useState("Tất cả");
  const [selectedMaterial, setSelectedMaterial] = useState("Tất cả");

  const filteredProducts = products.filter(product => {
    const typeMatch = selectedType === "Tất cả" || product.type === selectedType;
    const materialMatch = selectedMaterial === "Tất cả" || product.material === selectedMaterial;
    return typeMatch && materialMatch;
  });

  // Cập nhật currentProducts với sản phẩm đã lọc
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="product-container">
      {!showCreateForm && !productToEdit && (
        <div className="row m-3">
          <select onChange={(e) => setSelectedType(e.target.value)} className="form-select-product1 form-select-sm">
            <option value="Tất cả" selected>Tất cả</option>
            <option value="Nhẫn">Nhẫn</option>
            <option value="Vòng cổ">Vòng cổ</option>
            <option value="Vòng tay">Vòng tay</option>
            <option value="Hoa tai">Hoa tai</option>
          </select>
          <select onChange={(e) => setSelectedMaterial(e.target.value)} className="form-select-product2 form-select-sm">
            <option value="Tất cả" selected>Tất cả</option>
            <option value="Bạc">Bạc</option>
            <option value="Vàng">Vàng</option>
            <option value="Titan">Titan</option>
          </select>
          <button onClick={handleAdd} className="btn btn-add-product">
            Thêm Sản Phẩm
          </button>
          {showCheckBox ? (
            <>
              <button onClick={handleDelete} className="btn btn-confimdelete-product">
                Xác Nhận Xóa
              </button>
              <button onClick={resetSelection} className="btn btn-cancel-product">
                <i className="bi bi-x-lg"></i> Hủy
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowCheckBox(true)}
              className="btn btn-delete-product"
            >
              Chọn Xóa
            </button>
          )}
        </div>
      )}

      {showCreateForm && <ProductCreate onCreate={handleCreateProduct} />}

      {productToEdit && (
        <ProductEdit
          product={productToEdit}
          onUpdate={handleUpdateProduct}
          onCancel={() => setProductToEdit(null)}
        />
      )}
      {!showCreateForm && !productToEdit && (
        <div className="product">
          <div className="card">
            <h2 className="font-product">Danh sách sản phẩm</h2>
            <hr className="hr-product" />
            <div className="card-body">
              <table className="table-product">
                <thead className="thead-product">
                  <tr className="tr-product">
                    <th className="th-product">#</th>
                    <th className="th-product">ID</th>
                    <th className="th-product">Hình ảnh</th>
                    <th className="th-product">Tên sản phẩm</th>
                    <th className="th-product">Giá</th>
                    <th className="th-product">Chất liệu</th>
                    <th className="th-product">Loại</th>
                    <th className="th-product">Mô tả</th>
                    <th className="th-product">Số lượng</th>
                    <th className="th-product">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="tr-product">
                      <td className="td-product">
                        {showCheckBox && (
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id={`flexCheckDefault-${product.id}`}
                              checked={selectedProductIds.includes(product.id)}
                              onChange={() => toggleCheckBox(product.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheckDefault-${product.id}`}
                            ></label>
                          </div>
                        )}
                      </td>
                      <td className="td-product">{product.id}</td>
                      <td className="td-product">
                        <img
                          src={product.image}
                          alt={product.product_name}
                          className="images"
                        />
                      </td>
                      <td className="td-product">{product.product_name}</td>
                      <td className="td-product">{product.price}</td>
                      <td className="td-product">{product.material}</td>
                      <td className="td-product">{product.type}</td>
                      <td className="td-product">{product.description}</td>
                      <td className="td-product">{product.quantity}</td>
                      <td className="td-product">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="btn btn-edit-product"
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Phần chuyển trang */}
            <div className="nav-product-custom">
              <nav>
                <ul className="pagination-product">
                  <li className={`page-item-product ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link-product"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {generatePageNumbers().map((pageNumber, index) => (
                    <li key={index} className={`page-item-product ${currentPage === pageNumber ? "active" : ""}`}>
                      <button
                        className="page-link-product"
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item-product ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                      className="page-link-product"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>



          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
