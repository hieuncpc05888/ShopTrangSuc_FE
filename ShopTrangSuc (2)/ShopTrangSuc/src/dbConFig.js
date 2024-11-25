// dbConfig.js
const sql = require('mssql');

const dbConfig = {
  user: 'sa',                  // Tên người dùng SQL Server
  password: '098098',          // Mật khẩu của người dùng
  server: 'localhost',         // Địa chỉ của SQL Server (sử dụng 'localhost' nếu server chạy trên cùng máy)
  port: 1433,                  // Cổng mặc định của SQL Server là 1433, điều chỉnh nếu cần
  database: 'WebTrangSuc',     // Tên cơ sở dữ liệu
  options: {
    encrypt: false,            // Chỉ bật khi sử dụng Azure SQL
    trustServerCertificate: true // Cần thiết trong môi trường phát triển không có SSL
  }
};

async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = { connectToDatabase, sql };
