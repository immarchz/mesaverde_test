const FormOne = require("../models/form");

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
    res.json(newForm);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Send Error");
  }
};
