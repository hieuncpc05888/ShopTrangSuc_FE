import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { notification, Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/register.css';

const Register = () => {
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [errorHoTen, setErrorHoTen] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorSdt, setErrorSdt] = useState('');
  const [errorMatKhau, setErrorMatKhau] = useState('');
  const [errorGioiTinh, setErrorGioiTinh] = useState('');
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    let isValid = true;
    setErrorHoTen('');
    setErrorEmail('');
    setErrorSdt('');
    setErrorMatKhau('');
    setErrorGioiTinh('');

    // Kiểm tra các trường bị bỏ trống
    if (!hoTen) {
      setErrorHoTen('Họ và tên không được bỏ trống!');
      isValid = false;
    } else if (hoTen.length < 3 || hoTen.length > 50) {
      setErrorHoTen('Họ và tên phải từ 3 đến 50 ký tự!');
      isValid = false;
    }

    if (!email) {
      setErrorEmail('Email không được bỏ trống!');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorEmail('Email không hợp lệ!');
      isValid = false;
    }

    if (!sdt) {
      setErrorSdt('Số điện thoại không được bỏ trống!');
      isValid = false;
    } else if (!/^\d{10}$/.test(sdt)) {
      setErrorSdt('Số điện thoại phải có 10 chữ số!');
      isValid = false;
    }

    if (!matKhau) {
      setErrorMatKhau('Mật khẩu không được bỏ trống!');
      isValid = false;
    } else if (matKhau.length < 6) {
      setErrorMatKhau('Mật khẩu phải có ít nhất 6 ký tự!');
      isValid = false;
    }

    // Kiểm tra giới tính
    if (!gioiTinh) {
      setErrorGioiTinh('Giới tính không được bỏ trống!');
      isValid = false;
    }

    // Hiển thị thông báo lỗi chung nếu có
    if (!isValid) {
      notification.error({
        message: 'Thông tin chưa hợp lệ!',
        description: 'Vui lòng kiểm tra lại các trường đã nhập!',
        duration: 3,
      });
    }

    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const accountData = {
      fullname: hoTen,
      email: email,
      phone: sdt,
      password: matKhau,
      gender: gioiTinh,
    };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      const result = await response.json();

      if (response.ok) {
        notification.success({
          message: 'Đăng ký thành công!',
          description: 'Bạn có thể đăng nhập ngay bây giờ!',
          duration: 5,
        });
      } else {
        if (result.error) {
          if (result.error.includes("Email")) setErrorEmail(result.error);
          else if (result.error.includes("Số điện thoại")) setErrorSdt(result.error);
          else if (result.error.includes("Mật khẩu")) setErrorMatKhau(result.error);
        }
      }
    } catch (error) {
      notification.error({
        message: 'Có lỗi xảy ra!',
        description: 'Vui lòng thử lại sau!',
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementsByName('matKhau')[0];
    // if (passwordInput.type === 'password') {
    //   passwordInput.type = 'text';
    // } 
    // else {
    //   passwordInput.type = 'password';
    // }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="register-card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Đăng ký</h2>
        <p className="text-center">
          <Link to="/login" className="text-danger">Đã có tài khoản? Đăng nhập tại đây</Link>
        </p>
        {loading && <Spin size="large" />}
        <form onSubmit={handleRegister}>
          <div className="text-start mb-3">
            <input type="text" className="form-control" name="hoTen" placeholder="Họ tên" value={hoTen} onChange={(e) => setHoTen(e.target.value)} />
            {errorHoTen && <span className="error-message text-danger fst-italic">{errorHoTen}</span>}
          </div>
          <div className="text-start mb-3">
            <input type="email" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errorEmail && <span className="error-message text-danger fst-italic">{errorEmail}</span>}
          </div>
          <div className="text-start mb-3">
            <input type="tel" className="form-control" name="sdt" placeholder="Số điện thoại" value={sdt} onChange={(e) => setSdt(e.target.value)} />
            {errorSdt && <span className="error-message text-danger fst-italic">{errorSdt}</span>}
          </div>
          <div className="text-start mb-3">
            <div className="input-group">
              <input type="password" className="form-control" name="matKhau" placeholder="Mật khẩu" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} />
              <span className="input-group-text password-toggle-icon" onClick={togglePasswordVisibility}>
                <i className="bi bi-lightbulb"></i>
              </span>
            </div>
            {errorMatKhau && <span className="error-message text-danger fst-italic">{errorMatKhau}</span>}
          </div>
          <div className="text-start mb-3">
        <label className="me-3">Giới tính:</label>
        <div className="d-flex">
          <div className="form-check-custom me-4">
            <input className="radio-input" value="true" type="radio" name="gioitinh" onChange={() => setGioiTinh('true')} />
            <label className="radio-label">Nam</label>
          </div>
          <div className="form-check-custom">
            <input className="radio-input" value="false" type="radio" name="gioitinh" onChange={() => setGioiTinh('false')} />
            <label className="radio-label">Nữ</label>
          </div>
        </div>
        {errorGioiTinh && <span className="error-message text-danger fst-italic">{errorGioiTinh}</span>}
      </div>

          <button type="submit" className="btn register-btn btn-block">Đăng ký</button>
          <hr className="hr-custom" />
        </form>
      </div>
    </div>
  );
};

export default Register;
