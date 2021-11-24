//Write the http requests in create, update and delete crud functions

const express = require("express");
const refunds = require("../models/refunds");
const Refunds = require("../models/refunds"); // import user model
const router = express.Router();

//Save refund form data

router.post("/refunds/save", (req, res) => {
  let newRefunds = new Refunds(req.body);

  newRefunds.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Refund details are saved successfully",
    });
  });
});

//Get refund requests
router.get("/refunds/get", (req, res) => {
  Refunds.find().exec((err, refunds) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingRefunds: refunds,
    });
  });
});

//Get a specific Return request
router.get("/refund/:id", (req, res) => {
  let refundId = req.params.id;
  refunds.findById(refundId, (err, refunds) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      refunds,
    });
  });
});

//Update Refunds Requests
router.put("/refunds/update/:id", (req, res) => {
  Refunds.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

//Delete Refunds Requests
router.delete("/refunds/delete/:id", (req, res) => {
  Refunds.findByIdAndRemove(req.params.id).exec((err, deleteRefund) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessfull",
        err,
      });
    return res.json({
      message: "Delete Successful",
      deleteRefund,
    });
  });
});

module.exports = router;
