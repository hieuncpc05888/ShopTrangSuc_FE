import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contact.css';

const Contact = () => {
  const account = {
    dia_chi: "123 Đường ABC, Thành phố XYZ",
    sdt: "0123456789",
    email: "example@example.com",
    ho_ten: "Nguyễn Văn A"
  };

  const message = "Vui lòng điền thông tin liên hệ của bạn.";

  return (
    <div className="contact-container my-5">
      <main>
        <div className="row">
          <h1 className="contact-heading">Liên hệ</h1>
        </div>

        <div className="row mb-4">
          <div className="col-lg-12">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15716.102315191523!2d105.76568493955078!3d10.014745700000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a089cb87ab7abf%3A0x8ded7457828a8ddb!2zUGjhu5UgdGjDtG5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYyBD4bqnbiBUaMah!5e0!3m2!1sen!2s!4v1716190336155!5m2!1sen!2s"
                    width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy">
                  </iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="card shadow-sm contact-card">
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-md-4">
                    <h5>Địa chỉ</h5>
                    <p>{account.dia_chi}</p>
                  </div>
                  <div className="col-md-4">
                    <h5>Số điện thoại</h5>
                    <p>{account.sdt}</p>
                  </div>
                  <div className="col-md-4">
                    <h5>Email</h5>
                    <p>{account.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="contact-heading">Gửi Thông Tin Liên hệ</h1>
        <h3 className="text-danger">{message}</h3>

        <form className="row g-3" action="/home/lienhe" method="post">
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name" defaultValue={account.ho_ten} />
          </div>
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Your Email" defaultValue={account.email} />
          </div>
          <div className="col-md-4">
            <label htmlFor="dienthoai" className="form-label">Số điện thoại</label>
            <input type="text" className="form-control" id="dienthoai" placeholder="Your Phone" defaultValue={account.sdt} />
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="5" name="message" placeholder="Your Message"></textarea>
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="contact-button">Gửi ngay</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Contact;