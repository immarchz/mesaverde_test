const FormOne = require("../models/form");
const nodemailer = require("nodemailer");

exports.list = async (req, res) => {
  try {
    const forms = await FormOne.find();
    res.json(forms);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Send Error");
  }
};

exports.create = async (req, res) => {
  try {
    const newForm = new FormOne(req.body);
    await newForm.save();

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "marcharissawat@gmail.com",
        pass: "piwl vydo sgul baco",
      },
    });

    const mailOptions = {
      from: "arissawat.tre@gmail.com",
      to: req.body.email,
      subject: "Form Submission",
      html: `<p>Thank you for submitting the form. Here are the details:</p>
    <ul>
      <li><strong>Pet Name:</strong> ${req.body.petName}</li>
      <li><strong>Pet ID:</strong> ${req.body.petId}</li>
      <li><strong>Pet Age:</strong> ${req.body.petAge}</li>
      <li><strong>Owner Name:</strong> ${req.body.name}</li>
      <li><strong>Phone Number:</strong> ${req.body.phone}</li>
      <li><strong>Emaile:</strong> ${req.body.email}</li>
       <li><strong>ID Card:</strong> ${req.body.id}</li>
       <li><strong>Address:</strong> ${req.body.address}</li>

      
    </ul>
    
      `,
      attachments: [
        {
          filename: "image.jpg",
          path: req.body.petPic,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(newForm);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Send Error");
  }
};
