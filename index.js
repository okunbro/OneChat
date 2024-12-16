const crypto = require('node:crypto');
const encMethod = 'aes-256-cbc';
const secretIV = 'aifjaoeifjo';
const encIv = crypto.createHash('sha512').update(secretIV).digest('hex').substring(0,16)
function encryptData (data) {
    const cipher = crypto.createCipheriv(encMethod, key, encIv)
    const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    return Buffer.from(encrypted).toString('base64')
}
function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    encryptedData = buff.toString('utf-8')
    const decipher = crypto.createDecipheriv(encryptionMethod, key, encIv)
    return decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8')
}
const express = require('express');
const path = require('path');

const app = express();

// Налаштування статичної папки
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для головної сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});