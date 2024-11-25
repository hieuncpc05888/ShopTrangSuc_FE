import React, { useState, useEffect } from "react";
import "../css/address.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button, notification } from "antd";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    district: "",
    isDefault: false,
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetch addresses from API
  const fetchAddresses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/address/all");
      setAddresses(response.data);
    } catch (error) {
      showNotification("error", "Lỗi khi lấy danh sách địa chỉ.");
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchCities();
  }, []);

  // Fetch list of cities
  const fetchCities = async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find((city) => city.name === e.target.value);
    setNewAddress({ ...newAddress, city: e.target.value, district: "" });
    setDistricts(selectedCity ? selectedCity.districts : []);
  };

  const handleDistrictChange = (e) => {
    setNewAddress({ ...newAddress, district: e.target.value });
  };

  // Validation function
  const validateAddress = () => {
    if (!newAddress.city) {
      showNotification("error", "Vui lòng chọn tỉnh/thành phố.");
      return false;
    }
    if (!newAddress.district) {
      showNotification("error", "Vui lòng chọn quận/huyện.");
      return false;
    }
    if (!newAddress.address) {
      showNotification("error", "Vui lòng nhập địa chỉ cụ thể.");
      return false;
    }
    if (newAddress.address.length < 6 || newAddress.address.length > 250) {
      showNotification("error", "Địa chỉ cụ thể phải có từ 6 đến 250 ký tự.");
      return false;
    }
    return true;
  };

  // Save new address or update existing address
  const saveAddress = async () => {
    if (!validateAddress()) {
      return;
    }
    try {
      const response = editId
        ? await axios.put(`http://localhost:8080/api/address/update/${editId}`, newAddress)
        : await axios.post("http://localhost:8080/api/address/save", newAddress);

      if (editId) {
        setAddresses(addresses.map((addr) => (addr.id === editId ? response.data : addr)));
        showNotification("success", "Cập nhật địa chỉ thành công!");
      } else {
        setAddresses([...addresses, response.data]);
        showNotification("success", "Lưu địa chỉ thành công!");
      }

      setIsAdding(false);
      setNewAddress({ address: "", city: "", district: "", isDefault: false });
      setEditId(null);
    } catch (error) {
      showNotification("error", "Lỗi khi lưu địa chỉ.");
      console.error("Error saving address:", error);
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/address/set-default/${id}`);
      setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })));
      showNotification("success", "Đã đặt địa chỉ mặc định.");
    } catch (error) {
      showNotification("error", "Lỗi khi đặt địa chỉ mặc định.");
      console.error("Error setting default address:", error);
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/address/delete/${id}`);
      setAddresses(addresses.filter((addr) => addr.id !== id));
      showNotification("success", "Đã xóa địa chỉ.");
    } catch (error) {
      showNotification("error", "Lỗi khi xóa địa chỉ.");
      console.error("Error deleting address:", error);
    }
  };

  const startEditing = (address) => {
    setIsAdding(true);
    setEditId(address.id);
    setNewAddress(address);
    const selectedCity = cities.find((city) => city.name === address.city);
    setDistricts(selectedCity ? selectedCity.districts : []);
  };

  const openAddModal = () => {
    setIsAdding(true);
    setNewAddress({ address: "", city: "", district: "", isDefault: false });
    setEditId(null);
    setDistricts([]);
  };

  const closeAddModal = () => {
    setIsAdding(false);
    setNewAddress({ address: "", city: "", district: "", isDefault: false });
    setEditId(null);
    setDistricts([]);
  };

  const showNotification = (type, message) => {
    notification[type]({
      message: type === "error" ? "Lỗi" : "Thông báo",
      description: message,
      duration: 3,
    });
  };

  return (
    <div className="address-container">
      <div className="address-title">
        <h4>Thông Tin Địa Chỉ</h4>
        <Button onClick={openAddModal} type="primary">
          + Thêm Địa Chỉ
        </Button>
      </div>
      <hr />
      <div className="address-body">
        {addresses.map((address) => (
          <div key={address.id} className="address-item">
            <div className="address-details">
              <p className="address-content">
                {address.address}, {address.district}, {address.city}
              </p>
              {address.isDefault && <span className="badge">Mặc Định</span>}
            </div>
            <div className="address-actions">
              <Button 
                onClick={() => startEditing(address)} 
                type="primary" 
                size="small" 
                style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
              >
                Sửa
              </Button>
              <Button 
                onClick={() => deleteAddress(address.id)} 
                type="danger" 
                size="small" 
                style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
              >
                Xóa
              </Button>
              <Button 
                onClick={() => setDefaultAddress(address.id)} 
                type="default" 
                size="small" 
                style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", color: "#fff" }}
              >
                Đặt Mặc Định
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={editId ? "Chỉnh Sửa Địa Chỉ" : "Thêm Địa Chỉ"}
        visible={isAdding}
        onCancel={closeAddModal}
        footer={[
          <Button key="cancel" onClick={closeAddModal}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={saveAddress}>
            Lưu
          </Button>,
        ]}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ cụ thể"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
          />
        </div>
        <select className="form-select mb-3" value={newAddress.city} onChange={handleCityChange}>
          <option value="">Chọn tỉnh/thành phố</option>
          {cities.map((city) => (
            <option key={city.code} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <select className="form-select mb-3" value={newAddress.district} onChange={handleDistrictChange}>
          <option value="">Chọn quận/huyện</option>
          {districts.map((district) => (
            <option key={district.code} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </Modal>
    </div>
  );
};

export default Address;
