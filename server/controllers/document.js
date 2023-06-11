const _ = require('lodash');
const Document = require('../models/document');

exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let doc = await Document.findById(id);
    let allIds = new Array(doc.size).fill(0).map((_, ind) => (doc.indexKey + '_' + ind));
    const splitIds = _.chunk(allIds, 1000);
    for (const ids of splitIds) {
      await global.index.delete1({ids, namespace: doc.sourceId});
    }
    await doc.delete();
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