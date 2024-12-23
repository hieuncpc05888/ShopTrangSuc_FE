import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/admin/dashboard.css';
import Product from "./Product";
import ProductDelete from "./ProductDelete";
import HomeAdmin from "./HomeAdmin";
import Order_admin from "./Order_admin";
import CreateOrders from "./CreateOrders";
import Customers from "./Customers";
import Management from "./Management";
import Staff from "./Staff";
import DetailedRevenue from "./DetailedRevenue";
import SalesRevenue from "./SalesRevenue";
const Dashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
    const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
    const [isOrderMenuOpen, setOrderMenuOpen] = useState(false);
    const [isProductMenuOpen, setProductMenuOpen] = useState(false);


    const handleMenuClick = (component) => {
        setSelectedComponent(component);
    };

    const toggleAdminMenu = () => {
        setAdminMenuOpen(!isAdminMenuOpen);
        setAccountMenuOpen(false);
        setOrderMenuOpen(false);
        setProductMenuOpen(false);
    };

    const toggleAccountMenu = () => {
        setAccountMenuOpen(!isAccountMenuOpen);
        setAdminMenuOpen(false);
        setOrderMenuOpen(false);
        setProductMenuOpen(false);
    };

    const toggleOrderMenu = () => {
        setOrderMenuOpen(!isOrderMenuOpen);
        setAdminMenuOpen(false);
        setAccountMenuOpen(false);
        setProductMenuOpen(false);
    };

    const toggleProductMenu = () => {
        setProductMenuOpen(!isProductMenuOpen);
        setAdminMenuOpen(false);
        setAccountMenuOpen(false);
        setOrderMenuOpen(false);
    };


    return (
        <div className="dashboard-container">
            <div className="dashboard-menu-admin">
                <div className="logo fs-2">MARNI.Store</div>
                <hr className="hr"></hr>
                <div className="menu">
                    <div className="font">
                        <p>Quản lý <i className="bi bi-bookmarks-fill"></i> </p>
                    </div>
                    <div className={`menu-item ${selectedComponent === 'home' ? 'active' : ''}`} onClick={() => handleMenuClick('home')}>
                        <i className="bi bi-houses-fill"></i> Trang chủ
                    </div>
                    <div className={`menu-item ${selectedComponent === 'product' ? 'active' : ''}`} onClick={toggleProductMenu}>
                        <i className="bi bi-flower3"></i> Sản phẩm
                        <span className="caret-icon">
                            {isProductMenuOpen ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down-fill"></i>}
                        </span>
                    </div>
                    {isProductMenuOpen && (
                        <div className="submenu">
                            <div className={`submenu-item ${selectedComponent === 'list-product' ? 'active' : ''}`} onClick={() => handleMenuClick('list-product')}>
                                <i className="bi bi-journal-check"></i>  Danh sách
                            </div>
                            <div className={`submenu-item ${selectedComponent === 'list-product-delete' ? 'active' : ''}`} onClick={() => handleMenuClick('list-product-delete')}>
                                <i className="bi bi-journal-x"></i> Khôi phục sản phẩm
                            </div>
                        </div>
                    )}
                    <div className={`menu-item ${selectedComponent === 'account' ? 'active' : ''}`} onClick={toggleAccountMenu}>
                        <i className="bi bi-people-fill"></i> Tài khoản
                        <span className="caret-icon">
                            {isAccountMenuOpen ? <i class="bi bi-caret-up-fill"></i> : <i class="bi bi-caret-down-fill"></i>}
                        </span>
                    </div>
                    {isAccountMenuOpen && (
                        <div className="submenu">
                            <div className={`submenu-item ${selectedComponent === 'customer' ? 'active' : ''}`} onClick={() => handleMenuClick('customer')}>
                                <i className="bi bi-person-fill-check"></i>  Khách hàng
                            </div>
                            <div className={`submenu-item ${selectedComponent === 'admin' ? 'active' : ''}`} onClick={() => handleMenuClick('admin')}>
                                <i className="bi bi-person-vcard-fill"></i>  Quản Lý
                            </div>
                            <div className={`submenu-item ${selectedComponent === 'staff' ? 'active' : ''}`} onClick={() => handleMenuClick('staff')}>
                                <i className="bi bi-person-lines-fill"></i> Nhân viên
                            </div>
                        </div>
                    )}
                    <div className={`menu-item ${selectedComponent === 'order' ? 'active' : ''}`} onClick={toggleOrderMenu}>
                        <i className="bi bi-clipboard-check-fill"></i> Đơn hàng
                        <span className="caret-icon">
                            {isOrderMenuOpen ? <i className="bi bi-caret-up-fill"></i> : <i className="bi bi-caret-down-fill"></i>}
                        </span>
                    </div>
                    {isOrderMenuOpen && (
                        <div className="submenu">
                            <div className={`submenu-item ${selectedComponent === 'create-order' ? 'active' : ''}`} onClick={() => handleMenuClick('create-order')}>
                                <i className="bi bi-journal-check"></i>  Tạo đơn hàng
                            </div>
                            <div className={`submenu-item ${selectedComponent === 'list-order' ? 'active' : ''}`} onClick={() => handleMenuClick('list-order')}>
                                <i className="bi bi-journal-check"></i>  Danh sách
                            </div>
                            <div className={`submenu-item ${selectedComponent === 'cancellation_list' ? 'active' : ''}`} onClick={() => handleMenuClick('secancellation_listrvice')}>
                                <i className="bi bi-journal-x"></i> Danh sách đơn hàng hủy
                            </div>
                        </div>
                    )}
                    <hr className="hr"></hr>
                    <div className="font">
                        <p>Thống kê <i className="bi bi-bar-chart-fill"></i></p>
                    </div>
                    <div className={`menu-item ${selectedComponent === 'DetailedRevenue' ? 'active' : ''}`} onClick={() => handleMenuClick('DetailedRevenue')}>
                        <i className="bi bi-receipt-cutoff"></i> Doanh thu
                    </div>
                    <div className={`menu-item ${selectedComponent === 'SalesRevenue' ? 'active' : ''}`} onClick={() => handleMenuClick('SalesRevenue')}>
                        <i className="bi bi-inboxes-fill"></i> Bán hàng
                    </div>
                    <hr className="hr"></hr>
                    <div className="font">
                        <p>Cài đặt <i className="bi bi-gear-fill"></i></p>
                    </div>
                    <div className={`menu-item ${selectedComponent === 'background_color' ? 'active' : ''}`} onClick={() => handleMenuClick('background_color')}>
                        <i className="bi bi-palette-fill"></i> Màu nền
                    </div>
                    <div className={`menu-item ${selectedComponent === 'language' ? 'active' : ''}`} onClick={() => handleMenuClick('language')}>
                        <i className="bi bi-globe2"></i> Ngôn ngữ
                    </div>
                    <div className={`menu-item ${selectedComponent === 'log_out' ? 'active' : ''}`} onClick={() => handleMenuClick('log_out')}>
                        <i className="bi bi-arrow-bar-left"></i> Đăng xuất
                    </div>
                </div>
            </div>
            <div className="content">
                {/* * {selectedComponent === 'positionmanagement' && <PositionManagement/> */}
                {selectedComponent === 'home' && <HomeAdmin />}
                {selectedComponent === 'list-product' && <Product />}
                {selectedComponent === 'list-product-delete' && <ProductDelete />}
                {selectedComponent === 'list-order' && <Order_admin />}
                {selectedComponent === 'create-order' && <CreateOrders />}
                {selectedComponent === 'customer' && <Customers />}
                {selectedComponent === 'admin' && <Management />}
                {selectedComponent === 'staff' && <Staff />}
                {selectedComponent === 'DetailedRevenue' && <DetailedRevenue />}
                {selectedComponent === 'SalesRevenue' && <SalesRevenue />}
                {/* {selectedComponent === 'technician' && <Account />}  */}
                {/* {selectedComponent === 'serviceType' && <Service />}  */}
                {/* {selectedComponent === 'service' && <Service />} */}
                {/* {selectedComponent === 'product' && <ProductTable />} */}
                {/* {selectedComponent === 'bookingSchedule' && <BookingSchedule />} */}
                {/* {selectedComponent === 'statistics' && < />}  */}
            </div>
        </div>
    );
};

export default Dashboard;

