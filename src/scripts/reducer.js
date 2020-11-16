/* eslint-disable max-len */
import { uploadFile, deleteFile } from './database';
import { sortFiles } from './helper_functions';

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
    case 'DELETE_FILE_FROM_CLOUD':
      // Check if the file exist locally;
      target = fileList.findIndex((f) => f.name === action.fileName);
      if (target >= 0) {
        // Delete on cloud
        deleteFile(action.uid, action.fileName);
        // Delete local
        fileList.splice(target, 1);
      } else console.error('File not exist!!');
      return { ...state, fileList };
    case 'ADD_FILE_TO_LIST':
      // console.log(action.type);
      fileList = action.files.map((file) => file.data());
      return { ...state, fileList };
    case 'SORT_FILES':
      console.log(action.type);
      return {
        ...state, fileList: sortFiles(action.sortedBy, action.order, fileList), sortedBy: action.sortedBy, order: action.order,
      };
    case 'SEARCH_FILES':
      console.log(action.type);
      return {
        ...state, searchBy: action.searchBy,
      };
    default:
      // console.log(action.type);
      return state;
  }
};

export default reducer;
