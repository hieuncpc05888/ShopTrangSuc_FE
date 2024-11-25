import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Hàm thông báo Ant Design
  const openNotification = (type, message, description = '', duration = 5) => {
    notification[type]({
      message: message,
      description: description,
      duration: duration,
      placement: 'topRight',
    });
  };

  // Hàm kiểm tra email và mật khẩu
  const validateFields = () => {
    let isValid = true;

    if (email.length > 50) {
      openNotification('error', 'Lỗi!', 'Email không được vượt quá 50 ký tự!', 5);
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      openNotification('error', 'Lỗi!', 'Email không hợp lệ!', 5);
      isValid = false;
    }

    if (password.length < 6) {
      openNotification('error', 'Lỗi!', 'Mật khẩu phải có ít nhất 6 ký tự!', 5);
      isValid = false;
    }

    return isValid;
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token, { expires: 7, secure: true });
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.fullname);

        const decodedPayload = JSON.parse(atob(data.token.split('.')[1]));
        const username = decodedPayload.sub;
        const roles = decodedPayload.roles || [];
        localStorage.setItem('username', username);

        openNotification('success', 'Đăng nhập thành công!', '', 5);

        if (roles.includes('ADMIN') || roles.includes('STAFF')) {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        const data = await response.json();
        if (data.error) {
          openNotification('error', 'Đăng nhập thất bại!', data.error, 5);
        } else {
          openNotification('error', 'Đăng nhập thất bại!', 'Vui lòng kiểm tra lại thông tin đăng nhập!', 5);
        }
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
      openNotification('error', 'Lỗi!', 'Tên đăng nhập và mật khẩu chưa chính xác!', 5);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="login-card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-3">Đăng nhập</h2>
        <p className="text-center mb-4">
          <Link to="/register" className="text-danger">Nếu chưa có tài khoản? Đăng ký tại đây</Link>
        </p>
        {loading && <Spin size="large" />}
        <form onSubmit={handleSubmit}>
          <div className="text-start mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-start mb-3">
            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                name="password"
                placeholder="Mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-end mt-2">
              <Link to="/forgotpassword" className="text-primary">Quên mật khẩu?</Link>
            </div>
          </div>
          <button type="submit" className="btn login-btn btn-block" disabled={loading}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
