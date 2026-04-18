const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Generate 6-digit OTP
exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Email OTP service
exports.sendEmailOtp = async (email, otp) => {
  // For development/testing - just log the OTP
  console.log(`📧 OTP for ${email}: ${otp}`);
  
  // In production, uncomment the following code:
  /*
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'FarmQuest - Your OTP Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #22c55e;">FarmQuest</h2>
        <p>Your One-Time Password (OTP) for login is:</p>
        <h1 style="font-size: 32px; color: #22c55e; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  */
};

// SMS OTP service
exports.sendSmsOtp = async (phone, otp) => {
  // For development/testing - just log the OTP
  console.log(`📱 OTP for ${phone}: ${otp}`);
  
  // In production, uncomment the following code:
  /*
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  
  await client.messages.create({
    body: `Your FarmQuest OTP code is: ${otp}. Valid for 10 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  });
  */
};