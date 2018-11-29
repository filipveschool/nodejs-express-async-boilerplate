const nodemailer = require('nodemailer');
const config = require('../../config/config');

const smtpGmailTransport = nodemailer.createTransport('SMTP', {
  service: 'GMAIL',
  secure: false,
  port: 587,
  host: '',
  auth: {
    user: config.mail.gmail.auth.user,
    pass: config.mail.gmail.auth.password,
  },
});

const mail = async(from, email, subject, mailbody, callback) => {
  const mailOptions = {
    from: from, // sender address
    to: email, // list of receivers
    subject: subject, // subject line
    html: mailbody, // html body
  };

  smtpGmailTransport.sendMail(mailOptions, function(error, response) {
    if(error) {callback(error, null);}
    else {callback(null, response);}

    smtpGmailTransport.close(); // shut down the connection pool, no more messages

  })
};

const sentMailVerificationLink = async(user, token, callback) => {
  const textLink = `http://${config.server.host}:${config.server.port}/${config.mail.verifyEmailUrl}/${token}`;
  const from = `FVE TEAM<${config.email.username}>`;
  const mailBody = `<p>Thanks for Registering</p><p>Please verify your email by clicking on the verification link below.<br/>
<a href=${textLink.toString()}>Verification Link</a></p>`;
  mail(from, user.username, 'Account Verification', mailBody, function(error, succes) {
    callback(error,succes);

  })
}

const sentMailForgotPassword = async(user, token, callback) => {
  const textLink = `http://${config.server.host}:${config.server.port}/${config.mail.verifyEmailUrl}/${token}`;
  const from = `FVE TEAM<${config.email.username}>`;
  const mailBody = `<p>Please reset your password by clicking on the link below.</p><br/>
<a href=${textLink.toString()}>Reset Password Link</a></p>`;
  mail(from, user.username, 'Account New Password', mailBody, function(error, succes) {
    callback(error,succes);

  })
}

