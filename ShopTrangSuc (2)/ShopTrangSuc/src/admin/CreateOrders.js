import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button } from "react-bootstrap";
import '../css/admin/createorders.css';

const CreateOrders = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderSearchTerm, setOrderSearchTerm] = useState(""); // Tìm kiếm mã đơn hàng
  const [buyerSearchTerm, setBuyerSearchTerm] = useState(""); // Tìm kiếm mã khách hàng
  const ordersPerPage = 10;

  const [orders, setOrders] = useState({
    pending: [
      {
        orderId: "ORD001", // Mã đơn hàng
        buyer: "vncxtestbuyer",
        itemName: "Giày cao gót Juno phối quai chữ T CG07045",
        price: "250.000₫",
        total: "296.183₫",
        imgSrc: "/path/to/image1.png",
        quantity: 1,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 04-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van A",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          phone: "0123456789",
          email: "nguyenvana@example.com"
        },
        createdAt: "2024-09-30",
        paymentMethod: "Thẻ tín dụng"
      },
      {
        orderId: "ORD002",
        buyer: "vncxtestbuyer2",
        itemName: "Giày thể thao Adidas Ultra Boost",
        price: "3.200.000₫",
        total: "3.450.000₫",
        imgSrc: "/path/to/image2.png",
        quantity: 1,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 05-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van B",
          address: "456 Đường XYZ, Quận 2, TP.HCM",
          phone: "0987654321",
          email: "nguyenvb@example.com"
        },
        createdAt: "2024-09-29",
        paymentMethod: "Chuyển khoản"
      },
      {
        orderId: "ORD003",
        buyer: "vncxtestbuyer3",
        itemName: "Áo khoác nam Zara",
        price: "1.200.000₫",
        total: "1.500.000₫",
        imgSrc: "/path/to/image3.png",
        quantity: 2,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 06-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van C",
          address: "789 Đường DEF, Quận 3, TP.HCM",
          phone: "0912345678",
          email: "nguyenvc@example.com"
        },
        createdAt: "2024-09-28",
        paymentMethod: "Tiền mặt"
      },
      {
        orderId: "ORD004",
        buyer: "vncxtestbuyer4",
        itemName: "Đồng hồ Casio G-Shock",
        price: "1.500.000₫",
        total: "1.600.000₫",
        imgSrc: "/path/to/image4.png",
        quantity: 1,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 07-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van D",
          address: "321 Đường GHI, Quận 4, TP.HCM",
          phone: "0123456780",
          email: "nguyenvd@example.com"
        },
        createdAt: "2024-09-27",
        paymentMethod: "Thẻ ghi nợ"
      },
      {
        orderId: "ORD005",
        buyer: "vncxtestbuyer5",
        itemName: "Laptop Dell XPS 13",
        price: "25.000.000₫",
        total: "26.000.000₫",
        imgSrc: "/path/to/image5.png",
        quantity: 1,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 08-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van E",
          address: "654 Đường JKL, Quận 5, TP.HCM",
          phone: "0981234567",
          email: "nguyenvd@example.com"
        },
        createdAt: "2024-09-26",
        paymentMethod: "Chuyển khoản"
      }
    ],
    toPickup: [
      {
        orderId: "ORD001", // Mã đơn hàng
        buyer: "vncxtestbuyer",
        itemName: "Giày cao gót Juno phối quai chữ T CG07045",
        price: "250.000₫",
        total: "296.183₫",
        imgSrc: "/path/to/image1.png",
        quantity: 1,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 04-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van A",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          phone: "0123456789",
          email: "nguyenvana@example.com"
        },
        createdAt: "2024-09-30",
        paymentMethod: "Thẻ tín dụng"
      }
    ],
    delivering: [
      {
        orderId: "ORD001", // Mã đơn hàng
        buyer: "vncxtestbuyer",
        itemName: "Giày cao gót Juno phối quai chữ T CG07045",
        price: "250.000₫",
        total: "296.183₫",
        imgSrc: "/path/to/image1.png",
        quantity: 1,
        status: "Chờ xác nhận",
        shippingInfo: "Giao trước 04-07-2018 để đơn không bị hủy.",
        customerInfo: {
          name: "Nguyen Van A",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          phone: "0123456789",
          email: "nguyenvana@example.com"
        },
        createdAt: "2024-09-30",
        paymentMethod: "Thẻ tín dụng"
      }
    ]
  });

  const handlePrepareOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const confirmOrder = () => {
    if (selectedOrder) {
      // Cập nhật danh sách đơn hàng
      setOrders(prevOrders => {
        const newPending = prevOrders.pending.filter(order => order !== selectedOrder);
        return {
          ...prevOrders,
          pending: newPending,
          toPickup: [...prevOrders.toPickup, selectedOrder] // Thêm đơn hàng vào danh sách "toPickup"
        };
      });
    }
    setActiveTab("toPickup"); // Chuyển sang tab "Chuẩn bị đơn hàng"
    setShowModal(false);
  };
  const renderOrders = (orderList) => {
    return orderList.map((order, index) => (
      <div className="create-order" key={index}>
        <div className="create-order-header">
          <span>{order.buyer}</span>
          <span className="pickup-status">{order.status}</span>
        </div>
        <div className="create-order-body">
          <img src={order.imgSrc} alt="item" className="create-order-img" />
          <div className="order-details">
            <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
            <p>{order.itemName}</p>
            <p>Số lượng: {order.quantity}</p>
            <p className="price">{order.price}</p>
            <p className="total">Tổng Thanh toán: {order.total}</p>
          </div>
        </div>
        <div className="create-order-footer">
          <p className="shipping-info">{order.shippingInfo}</p>
          <button
            className="prepare-btn"
            onClick={() => handlePrepareOrder(order)}
          >
            {activeTab === "pending" ? "Xác nhận đơn" : "Chuẩn bị hàng"}
          </button>
        </div>
      </div>
    ));
  };

  const getCurrentOrders = (tab) => {
    const orderList = orders[tab];

    // Lọc đơn hàng theo mã đơn hàng và mã khách hàng
    const filteredOrders = orderList.filter(order =>
      order.buyer.toLowerCase().includes(buyerSearchTerm.toLowerCase()) &&
      order.itemName.toLowerCase().includes(orderSearchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredOrders.length / ordersPerPage);
    const currentOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
    return { currentOrders, pageCount };
  };

  const { currentOrders, pageCount } = getCurrentOrders(activeTab);

  return (
    <div className="CreateOrders">
      {/* Thanh tìm kiếm cho mã đơn hàng và mã khách hàng */}
      <div className="search-bar mb-3 float-end d-flex align-items-center">
        <input
          type="text"
          placeholder="Tìm kiếm mã đơn hàng..."
          value={orderSearchTerm}
          className="search-id-order"
          onChange={(e) => setOrderSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-search-order me-3"
          onClick={() => {
            setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
          }}
        >
          Tìm kiếm
        </button>

        <input
          type="text"
          placeholder="Tìm kiếm mã khách hàng..."
          className="search-id-customer"
          value={buyerSearchTerm}
          onChange={(e) => setBuyerSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-search-customer"
          onClick={() => {
            setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
          }}
        >
          Tìm kiếm
        </button>
      </div>

      <div className="create-order-tabs">
        <button className={`create-order-tab ${activeTab === "pending" ? "active" : ""}`} onClick={() => { setActiveTab("pending"); setCurrentPage(1); }}>Xác nhận đơn</button>
        <button className={`create-order-tab ${activeTab === "toPickup" ? "active" : ""}`} onClick={() => { setActiveTab("toPickup"); setCurrentPage(1); }}>Chuẩn bị đơn hàng</button>
        <button className={`create-order-tab ${activeTab === "delivering" ? "active" : ""}`} onClick={() => { setActiveTab("delivering"); setCurrentPage(1); }}>Đang giao</button>
      </div>
      <div className="create-order-card">
        {renderOrders(currentOrders)}
      </div>

      {pageCount > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          <span>Trang {currentPage} / {pageCount}</span>
          <button
            onClick={() => setCurrentPage(currentPage < pageCount ? currentPage + 1 : pageCount)}
            disabled={currentPage === pageCount}
          >
            Sau
          </button>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title><h4>{activeTab === "pending" ? "Xác nhận đơn hàng" : "Chuẩn bị đơn hàng"}</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="row">
                <div className="col-lg-6">
                  <div className="customer-info">
                    <h5>Thông tin khách hàng</h5>
                    <p><strong>Tên:</strong> {selectedOrder.customerInfo.name}</p>
                    <p><strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}</p>
                    <p><strong>Số điện thoại:</strong> {selectedOrder.customerInfo.phone}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="product-info">
                    <h6>Sản phẩm:</h6>
                    <p><strong>Tên sản phẩm:</strong> {selectedOrder.itemName}</p>
                    <p><strong>Số lượng:</strong> {selectedOrder.quantity}</p>
                    <p className="create-order-price"><strong>Giá:</strong> {selectedOrder.price}</p>
                    <p className="create-order-total"><strong>Tổng thanh toán:</strong> {selectedOrder.total}</p>
                    <p><strong>Mã đơn hàng:</strong> {selectedOrder.orderId}</p> {/* Display order ID */}
                    <p><strong>Ngày tạo đơn:</strong> {selectedOrder.createdAt}</p>
                    <p><strong>Phương thức thanh toán:</strong> {selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
          {activeTab === "toPickup" && (
            <Button
              variant="success"
              onClick={() => {
                // Gọi hàm in đơn hàng ở đây
                console.log("In đơn hàng:", selectedOrder);
              }}
            >
              In đơn hàng
            </Button>
          )}
          <Button
            variant="primary"
            onClick={confirmOrder} // Gọi confirmOrder
          >
            Xác nhận đơn hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateOrders;