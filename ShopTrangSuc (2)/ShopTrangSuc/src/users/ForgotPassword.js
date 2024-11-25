import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { notification } from 'antd'; // Import notification từ antd
import '../css/forgotpassword.css';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Thêm state để xử lý trạng thái loading
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu trạng thái loading

    // Kiểm tra trường hợp bỏ trống
    if (!phone || !email) {
      notification.error({
        message: 'Lỗi',
        description: 'Số điện thoại và email không được để trống.',
      });
      setIsLoading(false);
      return;
    }

    // Kiểm tra độ dài của phone và email
    if (phone.length > 15) {
      notification.error({
        message: 'Lỗi',
        description: 'Số điện thoại quá dài, tối đa 15 ký tự.',
      });
      setIsLoading(false);
      return;
    }

    if (email.length > 50) {
      notification.error({
        message: 'Lỗi',
        description: 'Email quá dài, tối đa 50 ký tự.',
      });
      setIsLoading(false);
      return;
    }

    // Kiểm tra số điện thoại có đúng định dạng 10 số
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      notification.error({
        message: 'Lỗi',
        description: 'Số điện thoại phải gồm 10 chữ số.',
      });
      setIsLoading(false);
      return;
    }

    try {
      // Gửi yêu cầu đến backend
      const response = await axios.post('http://localhost:3000/forgotpassword', { email });

      if (response.data.Status === 'Success') {
        notification.success({
          message: 'Thành công',
          description: 'Link đặt lại mật khẩu đã được gửi.',
        });
        navigate('/login');
      } else {
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: error.response?.data?.message || 'Không thể gửi yêu cầu, vui lòng thử lại',
      });
    } finally {
      setIsLoading(false); // Dừng trạng thái loading
    }
  };

  return (
    <div className="forgotPasword-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="forgot-password-card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-3">Quên mật khẩu</h2>
        <p className="text-center mb-4">
          <Link to="/login" className="text-danger">Lấy lại được mật khẩu? Đăng nhập tại đây</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group-custom mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Số điện thoại"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group-custom mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn submit-btn btn-block" disabled={isLoading}>
            {isLoading ? 'Đang gửi...' : 'Gửi'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

