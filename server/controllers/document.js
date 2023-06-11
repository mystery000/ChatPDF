const Document = require('../models/document');

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    await Document.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (error) {
    console.log('document delete error', error);
    return res.status(500).json({ success: false });
  }
}

exports.update = async (req, res) => {
  try {
    let id = req.params.id;
    let documentName = req.body.documentName;
    let document = await Document.findByIdAndUpdate(id, {
      $set: { name: documentName },
    }, {new: true});
    return res.json({ success: true, document });
  } catch (error) {
    console.log('document update error', error);
    return res.status(500).json({ success: false });
  }
};