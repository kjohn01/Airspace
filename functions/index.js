const functions = require('firebase-functions');
const path = require('path');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.updateFile = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name; 
  const name = path.basename(filePath);
  const uid = path.dirname(filePath);
  const data = {
    name,
    type: object.contentType, 
    createdAt: object.timeCreated,
    lastModified: object.updated,
    size: object.size,
  };
  return await db.collection('users').doc(uid).collection('files').doc(name).set(data);
});
