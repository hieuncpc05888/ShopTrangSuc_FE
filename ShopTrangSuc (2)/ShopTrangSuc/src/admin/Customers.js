import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/admin/customer.css"; // Ensure this path is correct
import { Modal } from "react-bootstrap";

const initialCustomers = [
    {
        id: "P001",
        ten: "Hà Nghi Khiêm",
        email: "hadu@gmail.com",
        sdt: "0987654321",
        diachi: "Thành phố Ngân Xuyên, Ninh Hạ",
        gioitinh: "Nam",
        ngaysinh: "26/08/1996",
        the: "Thường",
        trangThai: "Đang hoạt động",
    },
    {
        id: "P002",
        ten: "Diệp Đỉnh Chi",
        email: "diepvan@gmail.com",
        sdt: "0987654321",
        diachi: "Nam Quyết",
        gioitinh: "Nam",
        ngaysinh: "26/08/1996",
        the: "Vip",
        trangThai: "Ngừng hoạt động",
    },
];

const Customers = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [cardTypeFilter, setCardTypeFilter] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditCardModal, setShowEditCardModal] = useState(false);
    const [updatedCardType, setUpdatedCardType] = useState("");

    const itemsPerPage = 5;

    const filterCustomers = () => {
        return customers.filter(customer => {
            const matchesSearch = customer.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCardType = cardTypeFilter ? customer.the === cardTypeFilter : true;
            return matchesSearch && matchesCardType;
        });
    };

    const filteredCustomers = filterCustomers();
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const currentCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => {
        localStorage.setItem('customers', JSON.stringify(customers));
    }, [customers]);

    const handleRowClick = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
        setShowModal(false);
    };

    const handleEditCardType = (event, customer) => {
        event.stopPropagation();
        setSelectedCustomer(customer);
        setUpdatedCardType(customer.the);
        setShowEditCardModal(true);
        setShowModal(false);
    };

    const handleSaveCardType = () => {
        if (selectedCustomer) {
            const updatedCustomers = customers.map((customer) =>
                customer.id === selectedCustomer.id ? { ...customer, the: updatedCardType } : customer
            );
            setCustomers(updatedCustomers);
            closeEditCardModal();
        }
    };

    const closeEditCardModal = () => {
        setUpdatedCardType("");
        setShowEditCardModal(false);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="customer-container-customer">
            <div className="customer-card-customer">
                <div className="card-header-customer">
                    <h2 className="customer-title-customer">Danh sách khách hàng</h2>
                </div>
                <div className="card-body-customer">
                <div className="filter-controls-customer mb-3">
                        <select
                            className="filter-select-customer-custom"
                            value={cardTypeFilter}
                            onChange={(e) => setCardTypeFilter(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            <option value="Thường">Khách hàng thường</option>
                            <option value="Vip">Khách hàng vip</option>
                        </select>

                        <input
                            type="text"
                            className="filter-search-customer-custom"
                            placeholder="Tìm kiếm theo tên hoặc ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <table className="customer-table-customer table table-striped">
                        <thead className="table-header">
                            <tr>
                                <th className="customers-th">ID</th>
                                <th className="customers-th">Tên khách hàng</th>
                                <th className="customers-th">Email</th>
                                <th className="customers-th">Số điện thoại</th>
                                <th className="customers-th">Địa chỉ</th>
                                <th className="customers-th">Giới tính</th>
                                <th className="customers-th">Ngày sinh</th>
                                <th className="customers-th">Thẻ</th>
                                <th className="customers-th">Thao tác</th>
                                <th className="customers-th">Trạng thái</th>
                            </tr>
                        </thead>


                        <tbody>
                            {currentCustomers.map((customer) => (
                                <tr key={customer.id} className="customer-row-customer" onClick={() => handleRowClick(customer)}>
                                    <td>{customer.id}</td>
                                    <td>{customer.ten}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.sdt}</td>
                                    <td>{customer.diachi}</td>
                                    <td>{customer.gioitinh}</td>
                                    <td>{customer.ngaysinh}</td>
                                    <td>{customer.the}</td>
                                    <td>
                                        <button onClick={(e) => handleEditCardType(e, customer)} className="btn btn-edit-customer">
                                            Sửa
                                        </button>
                                    </td>
                                    <td className={customer.trangThai === "Đang hoạt động" ? "status-active-customer" : "status-inactive-customer"}>
                                        {customer.trangThai}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="customer-nav-customer">
                    <nav>
                        <div className="pagination-controls-customer">
                            <ul className="pagination-customer">
                                <li className={`page-item-customer ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link-customer" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                        &laquo;
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item-customer ${currentPage === index + 1 ? "active" : ""}`}>
                                        <button className="page-link-customer" onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item-customer ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <button className="page-link-customer" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </nav>
                </div>

            </div>

            {showModal && selectedCustomer && (
                <Modal show={showModal} onHide={closeModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><strong>Chi tiết Khách hàng</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="customer-details-customer">
                            <div className="detail-section-customer">
                                <p>ID: {selectedCustomer.id}</p>
                                <p>Tên khách hàng: {selectedCustomer.ten}</p>
                                <p>Email: {selectedCustomer.email}</p>
                            </div>
                            <div className="detail-section-customer">
                                <p>Số điện thoại: {selectedCustomer.sdt}</p>
                                <p>Ngày sinh: {selectedCustomer.ngaysinh}</p>
                                <p>Giới tính: {selectedCustomer.gioitinh}</p>
                            </div>
                            <div className="detail-section-customer">
                                <p>Loại thẻ: {selectedCustomer.the}</p>
                                <p>Trạng thái: {selectedCustomer.trangThai}</p>
                                <p>Địa chỉ: {selectedCustomer.diachi}</p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            {showEditCardModal && selectedCustomer && (
                <Modal show={showEditCardModal} onHide={closeEditCardModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title><strong>Sửa loại thẻ</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Loại thẻ:</label>
                            <select
                                value={updatedCardType}
                                onChange={(e) => setUpdatedCardType(e.target.value)}
                                className="form-select"
                            >
                                <option value="Thường">Thường</option>
                                <option value="Vip">Vip</option>
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleSaveCardType}>Lưu</button>
                        <button className="btn btn-secondary" onClick={closeEditCardModal}>Đóng</button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>

    );
};

export default Customers;
