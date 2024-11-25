import React, { useState } from 'react';
import '../css/order.css'; // Thêm file CSS riêng để định nghĩa kiểu dáng
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Order = () => {
  const orders = [
    {
      id: 1,
      products: [
        {
          image: 'https://lili.vn/wp-content/uploads/2021/12/Day-chuyen-vang-18k-co-bon-la-LILI_482417_11.jpg',
          name: 'Sản Phẩm 1',
          price: 100000,
          quantity: 2,
        },
        {
          image: '',
          name: 'Sản Phẩm 2',
          price: 150000,
          quantity: 1,
        }
      ],
      purchaseDate: '2024-09-15',
    },
    {
      id: 2,
      products: [
        {
          image: '',
          name: 'Sản Phẩm 1',
          price: 100000,
          quantity: 2,
        },
      ],
      purchaseDate: '2024-09-15',
    },
    // Thêm nhiều đơn hàng nếu cần
    {
      id: 3,
      products: [
        {
          image: '',
          name: 'Sản Phẩm 3',
          price: 200000,
          quantity: 1,
        },
      ],
      purchaseDate: '2024-09-15',
    },
    {
      id: 4,
      products: [
        {
          image: '',
          name: 'Sản Phẩm 4',
          price: 300000,
          quantity: 1,
        },
      ],
      purchaseDate: '2024-09-15',
    },
  ];


  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const displayedOrders = orders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="order-container">
      <div className="order-title">
        <h4>Đơn hàng của bạn</h4>
      </div>
      {displayedOrders.map(order => (
        <Link to={`/order/${order.id}`} className="text-decoration-none text-dark" key={order.id}>
          <div className="order-card mb-3">
            <div className="row">
              <div className="order-card-header">
                <p>Marni.store</p>
                <button type="submit" className="btn chat-btn">
                  <i className="bi bi-chat-dots"></i> Chat
                </button>
                <div className="order-card-header-content d-flex">
                  <i className="bi bi-truck-front"></i>
                  <p>Giao hàng thành công</p>
                  <span className="divider"></span>
                  <a href="/danh-gia" className="review-link">Đánh giá</a>
                </div>
              </div>
              <hr />
              <div className="col-lg-3">
                {order.products.map((product, index) => (
                  <div key={index} className="order-image mb-2">
                    <img src={product.image} alt={product.name} className="order-img" />
                  </div>
                ))}
              </div>
              <div className="col-lg-9">
                <div className="order-details">
                  {order.products.map((product, index) => (
                    <div key={index} className="product-details">
                      <h5 className="order-product-name">{product.name}</h5>
                      <p className="order-quantity">Số Lượng: {product.quantity}</p>
                      <p className="order-price">Giá: {product.price.toLocaleString()} VNĐ</p>
                    </div>
                  ))}
                  <p className="order-date">Ngày Mua: {order.purchaseDate}</p>
                  <hr />
                  <div className="order-card-footer">
                    <p className="order-total">
                      Thành Tiền: {order.products.reduce((total, product) => total + product.price * product.quantity, 0).toLocaleString()} VNĐ
                    </p>
                    <div className="button d-flex justify-content-end">
                      <button type="submit" className="btn receive-btn me-2">Đã nhận hàng</button>
                      <button type="submit" className="btn cancel-btn me-2">Hủy</button>
                      <button type="submit" className="btn refund-btn me-2">Yêu cầu hoàn tiền</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className="pagination d-flex justify-content-end my-3">
        <button onClick={handlePreviousPage} disabled={currentPage === 0} className="btn btn-secondary me-2">Trước</button>
        <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1} className="btn btn-secondary">Tiếp theo</button>
      </div>
    </div>
  );
};

export default Order;