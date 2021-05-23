const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const sendMail = async (mail,code)=>{
    dotenv.config()
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'reactgraminfo@gmail.com',
            pass: 'born@2021'
        }
    })

   
    // mail options
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT, // sender address
        to: mail, // list of receivers
        subject: `${code} is your React gram code`, // Subject line
        html: `<div><div style="width:340px;padding:15px;box-shadow:0px 0px 10px rgba(0,0,0,.115);border-radius:10px;"> <h3 style="margin:10px 0px 10px 0px;font-size:18px;color:#565a5c;">Hi.</h3><p style="margin:10px 0px 10px 0px;font-size:18px;color:#565a5c;">Someone tried to sign up for an ReactGram account with ${mail}. If it was you, enter this confirmation code in the app</p><br><strong style="padding:10px;color:#565a5c;font-size:32px;font-wieght:700;text-align:center;padding-bottom:20px;">${code}</strong></div></div>`
        
        // plain text body
      };

      transporter.sendMail(mailOptions,(err,info) =>{
          console.log(err);
          console.log(info);
          if(err){
              return err;
          }
          else{
              return info;
          }
      })
}


module.exports = sendMail;