import { uploadFile, deleteFile } from './database';

const reducer = (state, action) => {
  let { fileList } = state || [];
  let target; // for updating & deleting files
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      // console.log(action.type);
      return { ...state, dropDepth: action.dropDepth };
    case 'SET_IN_DROP_ZONE':
      // console.log(action.type);
      return { ...state, inDropZone: action.inDropZone };
    case 'UPLOAD_FILES_TO_CLOUD':
      // console.log(action.type);
      action.files.forEach(async (file) => {
        // Update cloud
        await uploadFile(action.uid, file);
        // Update local
        target = fileList.findIndex((f) => f.name === file.name);
        // Handle existing files
        if (target >= 0) {
          fileList[target] = file;
          console.log(`Updated ${file.name}`);
        } else {
          fileList.push(file);
          console.log(`Added ${file.name}`);
        }
      });
      return state;
    case 'DELETE_FILES_FROM_CLOUD':
      // console.log(action.type);
      // Check if the file exist locally;
      target = fileList.findIndex((f) => f.name === action.file);
      if (target >= 0) {
        // Delete on cloud
        deleteFile(action.uid, action.file);
        // Delete local
        fileList.splice(target, 1);
      } else console.error('File not exist!!');
      return { ...state, fileList };
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
