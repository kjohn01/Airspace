const reducer = (state, action) => {
  let { fileList } = state;
  let newFileNames = '';
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      // console.log(action.type);
      return { ...state, dropDepth: action.dropDepth };
    case 'SET_IN_DROP_ZONE':
      // console.log(action.type);
      return { ...state, inDropZone: action.inDropZone };
    case 'ADD_FILE_TO_LIST':
      // console.log(action.type);
      // update the file with new the version if already exist

      newFileNames = action.files.map((nf) => nf.name);
      fileList = fileList.filter((f) => !newFileNames.includes(f.name));
      return { ...state, fileList: fileList.concat(action.files) };
    default:
      // console.log(action.type);
      return state;
  }
};

export default reducer;
