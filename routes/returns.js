//Write the http requests in create, update and delete crud functions

const express = require("express");
const returns = require("../models/returns");
const Returns = require("../models/returns"); // import user model
const router = express.Router();

//Save return form data

router.post("/returns/save", (req, res) => {
  let newReturns = new Returns(req.body);

  newReturns.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Return details are saved successfully",
    });
  });
});

//Get Return requests
router.get("/returns/get", (req, res) => {
  Returns.find().exec((err, returns) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingReturns: returns,
    });
  });
});

//Get a specific Return request
router.get("/return/:id", (req, res) => {
  let returnId = req.params.id;
  returns.findById(returnId, (err, returns) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      returns,
    });
  });
});

//Update Return Requests
router.put("/returns/update/:id", (req, res) => {
  Returns.findByIdAndUpdate(
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

//Delete Return Requests
router.delete("/returns/delete/:id", (req, res) => {
  Returns.findByIdAndRemove(req.params.id).exec((err, deleteReturn) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessfull",
        err,
      });
    return res.json({
      message: "Delete Successfully !!!",
      deleteReturn,
    });
  });
});

module.exports = router;
