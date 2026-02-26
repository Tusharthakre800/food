const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
  localAddress: '0.0.0.0', // Force IPv4 binding
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Food Application" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



async function sendRegisterationeEmail (useEmail , name){
    const subject = 'Welcome to Food Application';
    const text = `Hello ${name}, \n\nWelcome to Food Application! We are glad to have you on board. \n\nBest regards, \nFood Application Team`;
    const html = `<p>Hello ${name},</p>
    <p>Welcome to Food Application! We are glad to have you on board.</p>
    <p>Best regards,</p>
    <p>Food Application Team</p>`;

    await sendEmail(useEmail, subject, text, html);
}

async function sendLoginEmail (useEmail , name){
    const subject = 'Welcome to Food Application';
    const text = `Hello ${name}, \n\nWelcome to Food Application! We are glad to have you on board. \n\nBest regards, \nFood Application Team`;
    const html = `<p>Hello ${name},</p>
    <p>Welcome to Food Application! We are glad to have you on board. hope you like our food.</p>
    <p>Best regards,</p>
    <p> if you have any questions, please feel free to contact us.+919834509178</p>
    <p> portfolio : https://www.tusharwebdev.online/</p>
    <p>Food Application Team</p>
    `;

    await sendEmail(useEmail, subject, text, html);
}

module.exports = {
    // sendRegisterationeEmail,
    // sendLoginEmail,
    
};

