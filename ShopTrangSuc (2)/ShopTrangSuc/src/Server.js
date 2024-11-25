// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // sửa 'cookies-parser' thành 'cookie-parser'
const { connectToDatabase, sql } = require('./dbConFig');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

// Endpoint đăng ký
app.post('/register', async (req, res) => {
  const { hoTen, email, sdt, matKhau, gioiTinh } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(matKhau, 10);

    const request = new sql.Request();
    request.input('hoTen', sql.NVarChar, hoTen);
    request.input('email', sql.NVarChar, email);
    request.input('sdt', sql.NVarChar, sdt);
    request.input('matKhau', sql.NVarChar, hashedPassword);
    request.input('gioiTinh', sql.NVarChar, gioiTinh);

    const query = `
      INSERT INTO users (hoTen, email, sdt, matKhau, gioiTinh) 
      VALUES (@hoTen, @email, @sdt, @matKhau, @gioiTinh)
    `;
    await request.query(query);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Endpoint đăng nhập
app.post('/login', async (req, res) => {
  const { email, matKhau } = req.body;

  try {
    const request = new sql.Request();
    request.input('email', sql.NVarChar, email);

    const query = `SELECT * FROM users WHERE email = @email`;
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.recordset[0];
    const passwordIsValid = bcrypt.compareSync(matKhau, user.matKhau);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      'secret_key',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;
