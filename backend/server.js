const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Настроить Nodemailer - ЗАМЕНИТЕ НА СВОИ ДАННЫЕ
const transporter = nodemailer.createTransporter({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
        user: 'your_yandex_email@yandex.com', // ЗАМЕНИТЕ: ваш Yandex email
        pass: 'your_yandex_password'           // ЗАМЕНИТЕ: пароль от Yandex почты
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'your_yandex_email@yandex.com', // ЗАМЕНИТЕ: тот же email что выше
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
        res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

