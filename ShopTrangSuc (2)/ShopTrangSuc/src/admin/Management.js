import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import '../css/admin/Management.css'; // Import file CSS

const Management = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Nguyễn Thị Mai', email: 'mai@gmail.com', phone: '0123456789', createdAt: '01/01/2023', status: 'Hoạt động' },
        { id: 2, name: 'Trần Văn B', email: 'b@gmail.com', phone: '0987654321', createdAt: '15/03/2023', status: 'Tạm khóa' },
        { id: 3, name: 'Lê Thị C', email: 'c@gmail.com', phone: '0912345678', createdAt: '20/05/2023', status: 'Hoạt động' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', status: 'Hoạt động' });

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    const handleShow = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
        if (confirmed) {
            setUsers(users.filter(user => user.id !== id));
            handleClose();
        }
    };

    const handleSave = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn lưu thay đổi?");
        if (confirmed) {
            const updatedUsers = users.map(user =>
                user.id === selectedUser.id ? selectedUser : user
            );
            setUsers(updatedUsers);
            handleClose();
        }
    };

    const handleAddUser = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn thêm người dùng mới?");
        if (confirmed) {
            const newId = users.length + 1; // Tạo ID mới
            setUsers([...users, { ...newUser, id: newId, createdAt: new Date().toLocaleDateString() }]);
            setShowAddModal(false);
            setNewUser({ name: '', email: '', phone: '', status: 'Hoạt động' }); // Reset thông tin người dùng mới
        }
    };

    return (
        <div className="management-container mt-4">
            <div className="card p-4">
                <h2 className="management-title">Danh sách quản lý</h2>
                <div className="d-flex align-items-center mb-0">
                    <input
                        type="text"
                        className="form-control management-input me-2"
                        placeholder="Tìm kiếm theo tên, email hoặc số điện thoại"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '400px', height: '40px' }} // Cập nhật chiều rộng và chiều cao ở đây
                    />
                    <Button variant="success" onClick={() => setShowAddModal(true)} className="management-button">Thêm</Button>
                </div>

                <div className="sales-table-container">
                    <table className="table management-table table-striped">
                        <thead>
                            <tr>
                                <th className="management-th">ID</th>
                                <th className="management-th">Tên</th>
                                <th className="management-th">Email</th>
                                <th className="management-th">Số điện thoại</th>
                                <th className="management-th">Ngày tạo</th>
                                <th className="management-th">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} onClick={() => handleShow(user)} className="management-tr" style={{ cursor: 'pointer' }}>
                                    <td className="management-td">{user.id}</td>
                                    <td className="management-td">{user.name}</td>
                                    <td className="management-td">{user.email}</td>
                                    <td className="management-td">{user.phone}</td>
                                    <td className="management-td">{user.createdAt}</td>
                                    <td className="management-td">{user.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal để chỉnh sửa thông tin người dùng */}
            <Modal show={showModal} onHide={handleClose} className="management-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết quản lý</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <div className="mb-3">
                                <label>Tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedUser.name}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedUser.phone}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Trạng thái</label>
                                <select
                                    className="form-control"
                                    value={selectedUser.status}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                >
                                    <option value="Hoạt động">Hoạt động</option>
                                    <option value="Tạm khóa">Tạm khóa</option>
                                </select>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="management-button">
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(selectedUser.id)} className="management-button">
                        Xóa
                    </Button>
                    <Button variant="primary" onClick={handleSave} className="management-button">
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal để thêm người dùng mới */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} className="management-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới quản lý</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label>Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Trạng thái</label>
                        <select
                            className="form-control"
                            value={newUser.status}
                            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                        >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Tạm khóa">Tạm khóa</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)} className="management-button">
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleAddUser} className="management-button">
                        Thêm người dùng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Management;
