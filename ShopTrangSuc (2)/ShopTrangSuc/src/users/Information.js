import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Information = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu ở đây
    console.log({ name, email, address, gender });
  };

  return (
    <div className="information-container">
      <div className="information-card">
        <div className="information-card-title d-flex">
          <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
          <h4>Thông Tin Cá Nhân</h4>
        </div>
        <div className="information-card-body">
          <form className="formInformation" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Họ Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Giới Tính</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="male"
                        value="male"
                        checked={gender === 'male'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="male">Nam</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        checked={gender === 'female'}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="female">Nữ</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Địa Chỉ</label>
                  <textarea
                    className="form-control mb-4"
                    id="address"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end"> 
            <button type="submit" className="btn save-btn">Lưu</button>
          </div>

              </div>              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Information;