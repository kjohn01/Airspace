import { uploadFile } from './database';

const reducer = (state, action) => {
  let { fileList } = state;
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      // console.log(action.type);
      return { ...state, dropDepth: action.dropDepth };
    case 'SET_IN_DROP_ZONE':
      // console.log(action.type);
      return { ...state, inDropZone: action.inDropZone };
    case 'UPLOAD_FILES_TO_CLOUD':
      // console.log(action.type);
      action.files.forEach((file) => {
        uploadFile(action.uid, file);
      });
      return state;
    case 'ADD_FILE_TO_LIST':
      // console.log(action.type);
      fileList = action.files.map((file) => file.data());
      return { ...state, fileList };
    default:
      // console.log(action.type);
      return state;
  }
};

export default reducer;
