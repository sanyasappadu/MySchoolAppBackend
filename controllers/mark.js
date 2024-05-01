const Mark = require('../models/Mark');

exports.createMark = async (req, res) => {
  try {
    const mark = await Mark.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        mark
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
exports.createMarks = async (req, res) => {
  try {
    const marks = await Promise.all(req.body.map(async (markData) => {
      const mark = await Mark.create(markData);
      return mark;
    }));

    res.status(201).json({
      status: 'success',
      data: {
        marks
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateMark = async (req, res) => {
  try {
    const mark = await Mark.findOneAndUpdate(
      { idnumber: req.params.idnumber, class: req.params.class, unitTest: req.params.unitTest },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: 'success',
      data: {
        mark
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getMark = async (req, res) => {
  try {
    const mark = await Mark.findOne({
      idnumber: req.params.idnumber,
      class: req.params.class,
      unitTest: req.params.unitTest
    });
    res.status(200).json({
      status: 'success',
      data: {
        mark
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
