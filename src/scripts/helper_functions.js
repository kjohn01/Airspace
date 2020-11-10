/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
import { downloadFile } from './database';

const uploadFiles = (uid, dispatch, files) => {
  if (uid && dispatch && files && files.length > 0) {
    // Time stamp and check for existing files or updated version
    const newFiles = files.map((f) => {
      f.uploadedAt = Date.now();
      return f;
    });

    if (newFiles.length > 0) dispatch({ type: 'UPLOAD_FILES_TO_CLOUD', files: newFiles, uid });

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  }
};

const deleteFile = (uid, dispatch, fileName) => {
  if (uid && dispatch && fileName) {
    dispatch({ type: 'DELETE_FILE_FROM_CLOUD', fileName, uid });
    console.log(`Deleted file: ${fileName}`);
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  }
};

const sortFiles = (sortBy, order, files) => {
  let sortedFiles = [];
  if (files && files.length > 0) {
    sortedFiles = files.sort((a, b) => {
      if (!a.hasOwnProperty(sortBy) || !b.hasOwnProperty(sortBy)) {
        // property doesn't exist on either object
        console.error(`Missing ${sortBy}`);
        return 0;
      }

      let varA;
      let varB;
      switch (sortBy) {
        case 'size':
          varA = parseInt(a[sortBy], 10);
          varB = parseInt(b[sortBy], 10);
          break;
        case 'lastModified':
          varA = Date.parse(a[sortBy]);
          varB = Date.parse(b[sortBy]);
          break;
        default:
          // sort by name
          varA = a[sortBy];
          varB = b[sortBy];
          break;
      }

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    });
  }
  return sortedFiles;
};

export {
  uploadFiles, deleteFile, sortFiles, downloadFile,
};
