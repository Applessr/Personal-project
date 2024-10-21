const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendResetEmail = async (email, token, username) => {
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'รีเซ็ตรหัสผ่านของคุณ',
    text: `สวัสดี ${username},

คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณที่ Spanify หากคุณไม่ได้ทำการขอรีเซ็ตรหัสผ่านนี้ กรุณาละเว้นอีเมลนี้
เพื่อรีเซ็ตรหัสผ่านของคุณ โปรดคลิกลิงค์ด้านล่าง:
${resetLink}
ลิงค์นี้จะหมดอายุใน 1 ชั่วโมง หากคุณไม่รีเซ็ตรหัสผ่านภายในเวลานี้ คุณจะต้องขอรีเซ็ตรหัสผ่านใหม่

ขอบคุณ,
Spanify`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
const sendConfirmEmail = async (email, username, plan, amount) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'ยืนยันการสมัครเป็นสมาชิก',
    text: `สวัสดี ${username},

ขอขอบคุณที่เลือกสมัครสมาชิกกับเรา! เรารู้สึกตื่นเต้นที่คุณเป็นส่วนหนึ่งของชุมชนของเรา

สถานะการสมัครสมาชิกของคุณเป็น ${plan} ราคา ${amount} เราหวังว่าคุณจะได้รับประสบการณ์ที่ดีจากบริการของเรา

หากคุณมีคำถามหรือข้อสงสัยใด ๆ สามารถติดต่อเราได้ตลอดเวลา เรายินดีที่จะช่วยเสมอ

ขอบคุณอีกครั้งที่เข้าร่วมกับเรา!

ด้วยความเคารพ,
Spanify`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendResetEmail,
  sendConfirmEmail
};