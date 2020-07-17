/* eslint-disable no-param-reassign */
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

export default uploadFiles;
