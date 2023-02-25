const nodemailer = require('nodemailer');

const signup = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();
    


    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo " <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "sUCCESS REGISTER WITH US", // plain text body
    html: "<b>REGISTER WITH US is success</b>", // html body
    }

    transporter.sendMail(message).then((info)=>{
        return res.status(201).json({msg:"you  should receive an email",
    info:info.messageId,
    preview:nodemailer.getTestMessageUrl(info)
})
    }).catch(err=>{
        return res.status(500).json({err})
    })
    // res.status(201).json("signup success"); 
}

const getbill = (req, res) => {
    res.status(201).json("getbill success");
}

module.exports = {
    signup, getbill
}