import React, { useState } from "react";
import "../css/admin/staff.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal } from "react-bootstrap";

const Staff = () => {
    const initialStaff = [
        {
            email: "hadu@gmail.com",
            ten: "Hà Nghi Khiêm",
            sdt: "0987654321",
            gioiTinh: "Nam",
            diachi: "Abc",
            ngaysinh: "26/08/1996",
            trangThai: "Đang làm việc",
        },
        {
            email: "hadu123@gmail.com",
            ten: "Hà Dữ",
            sdt: "0987654321",
            gioiTinh: "Nam",
            diachi: "Ninh Hạ",
            ngaysinh: "26/08/1996",
            trangThai: "Đã nghỉ việc",
        },
    ];


    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [staffs, setStaffs] = useState(initialStaff);
    const [showModal, setShowModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [activeTab, setActiveTab] = useState("staff1");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [newStaff, setNewStaff] = useState({
        email: "",
        ten: "",
        sdt: "",
        gioiTinh: "Nam",
        diachi: "",
        ngaysinh: "",
        trangThai: "Đang làm việc",
    });

    const itemsPerPage = 5;
    const indexOfLastStaff = currentPage * itemsPerPage;
    const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;

    const filteredStaffs = staffs.filter(
        (staff) =>
            staff.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentStaff = filteredStaffs.slice(
        indexOfFirstStaff,
        indexOfLastStaff
    );

    const handleRowClick = (staff) => {
        setSelectedStaff(staff);
        setNewStaff(staff);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedStaff(null);
        setShowModal(false);
    };

    const handleAddStaff = () => {
        setStaffs([...staffs, newStaff]);
        setToastMessage('Thông tin đã được thêm thành công!');
        setShowToast(true);
        setNewStaff({
            email: "",
            ten: "",
            sdt: "",
            gioiTinh: "Nam",
            diachi: "",
            ngaysinh: "",
            trangThai: "Đang làm việc",
        });

        setShowModal(false);
    };

    // const updateStaff = async (staffData) => {
    //     const response = await fetch(`/api/staff/${staffData.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(staffData),
    //     });

    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }

    //     return await response.json();
    // };


    const handleEdit = () => {
        if (newStaff.email && newStaff.ten) {
            const index = staffs.findIndex(staff => staff.email === selectedStaff.email);
            if (index !== -1) {
                const updatedStaffs = [...staffs];
                updatedStaffs[index] = { ...updatedStaffs[index], ...newStaff };
                setStaffs(updatedStaffs);

                // Show toast notification
                setToastMessage('Thông tin đã được cập nhật thành công!');
                setShowToast(true);

                // Đóng modal nếu có
                closeModal();

                // Tự động ẩn toast sau 3 giây
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            } else {
                alert("Staff not found");
            }
        } else {
            alert("Please fill in all required fields");
        }
    };


    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this staff member?")) {
            // Filter out the selected staff from the list
            const updatedStaffs = staffs.filter(staff => staff.email !== selectedStaff.email);

            // Update the state with the new staff list
            setStaffs(updatedStaffs);
            setToastMessage('Thông tin đã được xóa thành công!');
            setShowToast(true);
            closeModal();
        }
    };



    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    // Mật khẩu hiện tại (dữ liệu cứng)
    const currentPassword = 'Password123'; // Thay đổi giá trị này theo yêu cầu

    const handleChangePassword = () => {
        // Kiểm tra mật khẩu cũ
        if (oldPassword !== currentPassword) {
            setMessage('Mật khẩu cũ không chính xác!');
            return;
        }

        // Kiểm tra mật khẩu mới và xác nhận
        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới không khớp!');
            return;
        }

        // Nếu tất cả đều đúng
        setMessage('Đổi mật khẩu thành công!');
        // Xóa các trường nhập sau khi thành công
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="staff-container">
            <div className="d-flex-staff">
                <input
                    type="text"
                    className="form-control-staff-search  w-25"
                    placeholder="Tìm kiếm theo tên hoặc Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="btn btn-add-staff"
                    onClick={() => setShowModal(true)}
                >
                    Thêm mới
                </button>
            </div>
            <ul className="nav nav-tabs-staff">
                <li className="nav-item-staff">
                    <a
                        className={`nav-link-staff ${activeTab === "staff1" ? "active-staff" : ""
                            }`}
                        onClick={() => setActiveTab("staff1")}
                    >
                        Tất cả
                    </a>
                </li>
                <li className="nav-item-staff">
                    <a
                        className={`nav-link-staff ${activeTab === "staff2" ? "active-staff" : ""
                            }`}
                        onClick={() => setActiveTab("staff2")}
                    >
                        Đang làm việc
                    </a>
                </li>
            </ul>

            <div className="tab-content-staff">
                {activeTab === "staff1" && (
                    <div className="tab-pane-staff fade show active-staff">
                        <h2 className="font-staff2 m-3">Danh sách tất cả nhân viên</h2>
                        <table className="table-staff2">
                            <thead>
                                <tr className="tr-staff">
                                    <th className="th-staff">Email</th>
                                    <th className="th-staff">Họ tên</th>
                                    <th className="th-staff">Số điện thoại</th>
                                    <th className="th-staff">Giới tính</th>
                                    <th className="th-staff">Địa chỉ</th>
                                    <th className="th-staff">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStaff.map((staff) => (
                                    <tr
                                        className="tr-staff"
                                        key={staff.email}
                                        onClick={() => handleRowClick(staff)}
                                    >
                                        <td className="td-staff">{staff.email}</td>
                                        <td className="td-staff">{staff.ten}</td>
                                        <td className="td-staff">{staff.sdt}</td>
                                        <td className="td-staff">{staff.gioiTinh}</td>
                                        <td className="td-staff">{staff.diachi}</td>
                                        <td className="td-staff">
                                            <span
                                                className={`badge rounded-pill-staff ${staff.trangThai === "Đang làm việc"
                                                    ? "text-bg-warning"
                                                    : "text-bg-danger"
                                                    }`}
                                            >
                                                {staff.trangThai}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "staff2" && (
                    <div className="tab-pane-staff fade show active-staff">
                        <h2 className="font-staff1 m-3">
                            Danh sách nhân viên đang làm việc
                        </h2>
                        <table className="table-staff1">
                            <thead className="thead-staff">
                                <tr className="tr-staff">
                                    <th className="th-staff">Email</th>
                                    <th className="th-staff">Họ tên</th>
                                    <th className="th-staff">Số điện thoại</th>
                                    <th className="th-staff">Giới tính</th>
                                    <th className="th-staff">Địa chỉ</th>
                                    <th className="th-staff">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffs
                                    .filter((staff) => staff.trangThai === "Đang làm việc")
                                    .map((staff) => (
                                        <tr
                                            className="tr-staff"
                                            key={staff.email}
                                            onClick={() => handleRowClick(staff)}
                                        >
                                            <td className="td-staff">{staff.email}</td>
                                            <td className="td-staff">{staff.ten}</td>
                                            <td className="td-staff">{staff.sdt}</td>
                                            <td className="td-staff">{staff.gioiTinh}</td>
                                            <td className="td-staff">{staff.diachi}</td>
                                            <td className="td-staff"><span class="badge rounded-pill-staff text-bg-warning">{staff.trangThai}</span></td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


            {showModal && selectedStaff && (
                <Modal show={showModal} onHide={closeModal} className="model-detailedStaff" size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><h5>Nhân viên chi tiết</h5></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-detailedStaff">
                        <form className="form-detailedStaff">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Email:<span style={{ color: "red" }}></span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control-detailedStaff"
                                            value={newStaff.email}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, email: e.target.value })
                                            }
                                            required
                                            disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"} // Vô hiệu hóa nếu đã nghỉ việc và không chọn lại
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Tên:<span style={{ color: "red" }}></span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control-detailedStaff"
                                            value={newStaff.ten}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, ten: e.target.value })
                                            }
                                            required
                                            disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Số điện thoại:<span style={{ color: "red" }}></span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control-detailedStaff"
                                            value={newStaff.sdt}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, sdt: e.target.value })
                                            }
                                            required
                                            disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Giới tính:<span style={{ color: "red" }}></span>
                                        </label>
                                        <div className="form-check-detailedStaff">
                                            <input
                                                type="radio"
                                                className="form-check-input-detailedStaff"
                                                id="male"
                                                name="gioiTinh"
                                                value="Nam"
                                                checked={newStaff.gioiTinh === "Nam"}
                                                onChange={(e) =>
                                                    setNewStaff({ ...newStaff, gioiTinh: e.target.value })
                                                }
                                                disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                            />
                                            <label className="form-check-label-detailedStaff" htmlFor="male">
                                                Nam
                                            </label>
                                            <input
                                                type="radio"
                                                className="form-check-input-detailedStaff"
                                                id="female"
                                                name="gioiTinh"
                                                value="Nữ"
                                                checked={newStaff.gioiTinh === "Nữ"}
                                                onChange={(e) =>
                                                    setNewStaff({ ...newStaff, gioiTinh: e.target.value })
                                                }
                                                disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                            />
                                            <label className="form-check-label-detailedStaff" htmlFor="female">
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Ngày sinh:<span style={{ color: "red" }}></span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control-detailedStaff"
                                            value={newStaff.ngaysinh}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, ngaysinh: e.target.value })
                                            }
                                            required
                                            disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Địa chỉ:<span style={{ color: "red" }}></span>
                                        </label>
                                        <textarea
                                            value={newStaff.diachi}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, diachi: e.target.value })
                                            }
                                            required
                                            rows="3"
                                            disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label-detailedStaff">
                                            Trạng thái:<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <div>
                                            <div className="form-check-detailedStaff">
                                                <input
                                                    type="radio"
                                                    className="form-check-input-detailedStaff"
                                                    id="working"
                                                    name="trangThai"
                                                    value="Đang làm việc"
                                                    checked={newStaff.trangThai === "Đang làm việc"}
                                                    onChange={(e) =>
                                                        setNewStaff({ ...newStaff, trangThai: e.target.value })
                                                    }
                                                />
                                                <label className="form-check-label-detailedStaff" htmlFor="working">
                                                    Đang làm việc
                                                </label>
                                            </div>
                                            <div className="form-check-detailedStaff">
                                                <input
                                                    type="radio"
                                                    className="form-check-input-detailedStaff"
                                                    id="resigned"
                                                    name="trangThai"
                                                    value="Đã nghỉ việc"
                                                    checked={newStaff.trangThai === "Đã nghỉ việc"}
                                                    onChange={(e) =>
                                                        setNewStaff({ ...newStaff, trangThai: e.target.value })
                                                    }
                                                />
                                                <label className="form-check-label-detailedStaff" htmlFor="resigned">
                                                    Đã nghỉ việc
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-edit-detailedStaff me-2"
                                    onClick={handleEdit}
                                    disabled={selectedStaff.trangThai === "Đã nghỉ việc" && newStaff.trangThai !== "Đang làm việc"}
                                >
                                    Sửa
                                </button>
                                <button type="button" className="btn btn-delete-detailedStaff" onClick={handleDelete} >
                                    Xóa
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            )}



            {/* Thêm nhân viên */}
            <Modal
                show={showModal && !selectedStaff}
                onHide={() => setShowModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title><h5>Thêm nhân viên mới</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-staff">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Email:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control-staff"
                                        value={newStaff.email}
                                        onChange={(e) =>
                                            setNewStaff({ ...newStaff, email: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Tên:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control-staff"
                                        value={newStaff.ten}
                                        onChange={(e) =>
                                            setNewStaff({ ...newStaff, ten: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Số điện thoại:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control-staff"
                                        value={newStaff.sdt}
                                        onChange={(e) =>
                                            setNewStaff({ ...newStaff, sdt: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Giới tính:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div className="form-check-staff">
                                        <input
                                            type="radio"
                                            className="form-check-input-staff"
                                            id="male"
                                            name="gioiTinh"
                                            value="Nam"
                                            checked={newStaff.gioiTinh === "Nam"}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, gioiTinh: e.target.value })
                                            }
                                        />
                                        <label className="form-check-label-staff" htmlFor="male">
                                            Nam
                                        </label>
                                        <input
                                            type="radio"
                                            className="form-check-input-staff"
                                            id="female"
                                            name="gioiTinh"
                                            value="Nữ"
                                            checked={newStaff.gioiTinh === "Nữ"}
                                            onChange={(e) =>
                                                setNewStaff({ ...newStaff, gioiTinh: e.target.value })
                                            }
                                        />
                                        <label className="form-check-label-staff" htmlFor="female">
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Ngày sinh:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control-staff"
                                        value={newStaff.ngaysinh}
                                        onChange={(e) =>
                                            setNewStaff({ ...newStaff, ngaysinh: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Địa chỉ:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <textarea
                                        // className="form-control-staff"
                                        value={newStaff.diachi}
                                        onChange={(e) =>
                                            setNewStaff({ ...newStaff, diachi: e.target.value })
                                        }
                                        required
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label-staff">
                                        Trạng thái:<span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div>
                                        <div className="form-check-staff">
                                            <input
                                                type="radio"
                                                className="form-check-input-staff"
                                                id="working"
                                                name="trangThai"
                                                value="Đang làm việc"
                                                checked={newStaff.trangThai === "Đang làm việc"}
                                                onChange={(e) =>
                                                    setNewStaff({ ...newStaff, trangThai: e.target.value })
                                                }
                                            />
                                            <label className="form-check-label-staff" htmlFor="working">
                                                Đang làm việc
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-save-staff"
                                onClick={handleAddStaff}
                            >
                                Thêm nhân viên
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>



            {/* Thông báo */}
            {/* <div className={`toast-container position-static ${showToast ? 'd-block' : 'd-none'}`}>
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Notification</strong>
                        <small className="text-body-secondary">just now</small>
                        <button type="button" className="btn-close" onClick={() => setShowToast(false)} aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {toastMessage}
                    </div>
                </div>
            </div> */}

        </div>
    );
};

export default Staff;
