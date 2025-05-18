const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'healthmedihub@gmail.com',
    pass: 'your-email-password', // Replace with your email password or use environment variables
  },
});

// Twilio setup
const client = twilio('your-twilio-account-sid', 'your-twilio-auth-token'); // Replace with your Twilio credentials

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  // Send email
  const mailOptions = {
    from: 'healthmedihub@gmail.com',
    to: 'healthmedihub@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    // Send SMS
    client.messages
      .create({
        body: `New Contact Form Submission\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        from: '+7838583810', // Replace with your Twilio phone number
        to: '+7838583810', // Replace with your target phone number
      })
      .then(() => {
        res.status(200).send('Message sent successfully');
      })
      .catch((err) => {
        res.status(500).send(err.toString());
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});