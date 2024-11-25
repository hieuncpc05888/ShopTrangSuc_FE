import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/admin/order_admin.css";

const Order = ({ orders, setOrders }) => {
  const [keywords, setKeywords] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search keywords:', keywords);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Get the current orders based on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="order-admin-container">
      <div className="row">
        <div className="col-lg-12">
          <div className="container">
            <div className="mb-4">
              <form onSubmit={handleSearch}>
                <div className="input-group float-end" style={{ maxWidth: "500px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên tìm kiếm ..."
                    name="keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    style={{ height: "40px" }}
                  />
                  <div className="input-group-append" style={{ marginLeft: "10px" }}>
                    <button
                      className="btn btn-order-admin-search"
                      type="submit"
                      style={{ height: "40px" }}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card-admin-order card">
        <div className="card-admin-order-title p-1 text-start">
          <h5>Danh sách đơn hàng</h5>
        </div>
        <div className="card-order-admin-body">
          <table className="table-order">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày tạo</th>
                <th>Tên khách hàng</th>
                <th>Trạng thái</th>
                <th>Phương thức thanh toán</th>
                <th>Khách trả</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_createDate}</td>
                  <td>{order.order_email}</td>
                  <td>{order.order_status}</td>
                  <td>{order.order_payment}</td>
                  <td>{order.order_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row float-end m-3">
        <nav aria-label="order-pagination">
          <ul className="order-admin-pagination">
            <li className="order-admin-page-item">
              <button
                className="order-admin-page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li className={`order-admin-page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index + 1}>
                <button
                  className="order-admin-page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="order-admin-page-item">
              <button
                className="order-admin-page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Order_admin = () => {
  const [orders, setOrders] = useState([
    {
      order_id: "1",
      order_price: "100.000 VNĐ",
      order_createDate: "2024-06-17 22:16:51",
      order_nameProduct: "Bông tai quả đào",
      order_email: "email@example.com",
      order_address: "123 Main St",
      order_payment: "Thanh toán khi nhận hàng",
      order_sale: "10%",
      order_quantity: "1",
      order_status: "Chờ xác nhận"
    },
    {
      order_id: "2",
      order_price: "200.000 VNĐ",
      order_createDate: "2024-06-17 22:16:51",
      order_nameProduct: "Dây chuyền vàng",
      order_email: "my123@gmail.com",
      order_address: "TP.Vị Thanh, Hậu Giang",
      order_payment: "Tiền mặt",
      order_sale: "10%",
      order_quantity: "1",
      order_status: "Đã xác nhận"
    },
    {
      order_id: "3",
      order_price: "200.000 VNĐ",
      order_createDate: "2024-06-17 22:16:51",
      order_nameProduct: "Dây chuyền bạc",
      order_email: "my123@gmail.com",
      order_address: "TP.Vị Thanh, Hậu Giang",
      order_payment: "Tiền mặt",
      order_sale: "10%",
      order_quantity: "1",
      order_status: "Đang giao"
    },
    // Add more orders for testing pagination
    {
      order_id: "4",
      order_price: "250.000 VNĐ",
      order_createDate: "2024-06-18 10:00:00",
      order_nameProduct: "Vòng tay gỗ",
      order_email: "test1@example.com",
      order_address: "123 Elm St",
      order_payment: "Thanh toán khi nhận hàng",
      order_sale: "15%",
      order_quantity: "1",
      order_status: "Chờ xác nhận"
    },
    {
      order_id: "5",
      order_price: "300.000 VNĐ",
      order_createDate: "2024-06-18 11:00:00",
      order_nameProduct: "Nhẫn bạc",
      order_email: "test2@example.com",
      order_address: "456 Oak St",
      order_payment: "Tiền mặt",
      order_sale: "20%",
      order_quantity: "1",
      order_status: "Đã xác nhận"
    },
    {
      order_id: "6",
      order_price: "150.000 VNĐ",
      order_createDate: "2024-06-18 12:00:00",
      order_nameProduct: "Mặt dây chuyền",
      order_email: "test3@example.com",
      order_address: "789 Pine St",
      order_payment: "Thẻ tín dụng",
      order_sale: "5%",
      order_quantity: "1",
      order_status: "Đang giao"
    },
    {
      order_id: "7",
      order_price: "120.000 VNĐ",
      order_createDate: "2024-06-18 13:00:00",
      order_nameProduct: "Bông tai ngọc trai",
      order_email: "test4@example.com",
      order_address: "101 Maple St",
      order_payment: "Thanh toán khi nhận hàng",
      order_sale: "10%",
      order_quantity: "1",
      order_status: "Chờ xác nhận"
    },
    {
      order_id: "8",
      order_price: "220.000 VNĐ",
      order_createDate: "2024-06-18 14:00:00",
      order_nameProduct: "Dây chuyền ngọc",
      order_email: "test5@example.com",
      order_address: "202 Cedar St",
      order_payment: "Tiền mặt",
      order_sale: "15%",
      order_quantity: "1",
      order_status: "Đã xác nhận"
    },
    {
      order_id: "9",
      order_price: "180.000 VNĐ",
      order_createDate: "2024-06-18 15:00:00",
      order_nameProduct: "Vòng cổ",
      order_email: "test6@example.com",
      order_address: "303 Birch St",
      order_payment: "Thẻ tín dụng",
      order_sale: "5%",
      order_quantity: "1",
      order_status: "Đang giao"
    },
    {
      order_id: "10",
      order_price: "400.000 VNĐ",
      order_createDate: "2024-06-18 16:00:00",
      order_nameProduct: "Nhẫn kim cương",
      order_email: "test7@example.com",
      order_address: "404 Cherry St",
      order_payment: "Thanh toán khi nhận hàng",
      order_sale: "25%",
      order_quantity: "1",
      order_status: "Chờ xác nhận"
    },
    {
      order_id: "11",
      order_price: "350.000 VNĐ",
      order_createDate: "2024-06-18 17:00:00",
      order_nameProduct: "Bông tai vàng",
      order_email: "test8@example.com",
      order_address: "505 Ash St",
      order_payment: "Tiền mặt",
      order_sale: "30%",
      order_quantity: "1",
      order_status: "Đã xác nhận"
    },
    // Add more orders as needed for testing
  ]);

  return (
    <div className="Order">
      <Order orders={orders} setOrders={setOrders} />
    </div>
  );
};

export default Order_admin;