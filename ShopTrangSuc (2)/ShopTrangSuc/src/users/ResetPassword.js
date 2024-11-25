import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { id, token } = useParams();
  const otp = searchParams.get('otp');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Gửi yêu cầu đặt lại mật khẩu đến backend
      const response = await axios.post(`http://localhost:3000/resetpassword/${id}/${token}`, {
        otp,
        newPassword,
      });

      if (response.data.Status === 'Success') {
        setSuccessMessage('Mật khẩu đã được đặt lại thành công.');
        setTimeout(() => navigate('/login'), 2000); // Điều hướng sau khi thành công
      } else {
        setErrorMessage('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data || 'Không thể đặt lại mật khẩu, vui lòng thử lại.');
    }
  };

  return (
    <div className="reset-password-container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="reset-password-card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-3">Đặt lại mật khẩu</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group-custom mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mật khẩu mới"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn submit-btn btn-block">
            Đặt lại mật khẩu
          </button>
        </form>
        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
