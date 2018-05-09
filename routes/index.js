var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

router.post('/api/form', function(req, res, next) {
  if(req.body.name !== '' && req.body.email !== '' && req.body.message !== '') {
    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAILER_USER_EMAIL,
        pass: process.env.MAILER_PASSWORD
      }
    }));


    let mailOptions = {
        from: `"Portfolio Mailer 👻"<appemailssender@gmail.com>" "<${req.body.email}>" `,
        to: 'vonhattin@gmail.com',
        subject: `New Message from ${req.body.name}`,
        text: req.body.message,
        html: `
          <div>${req.body.message}</div>
        `
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
});

module.exports = router;
