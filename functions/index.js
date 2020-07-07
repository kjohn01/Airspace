const functions = require('firebase-functions');
const path = require('path');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket();

// When a file is uploaded on the cloud storage, add/update the corresponding file entry on firestore
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

// When a file entry on firestore is deleted, delete the corresponding file on cloud storage
exports.deleteFile = functions.firestore.document('users/{uid}/files/{fileName}').onDelete(async (snap, context) => {
  const { uid, fileName } = context.params;
  // Delete file on cloud storage
  await bucket.file(`${uid}/${fileName}`).delete().then(() => console.log(`deleted ${fileName}`)).catch((err) => console.error(err));
});
