const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DROP_DEPTH':
      // console.log(action.type);
      return { ...state, dropDepth: action.dropDepth }
    case 'SET_IN_DROP_ZONE':
      // console.log(action.type);
      return { ...state, inDropZone: action.inDropZone };
    case 'ADD_FILE_TO_LIST':
      // console.log(action.type);
      return { ...state, fileList: state.fileList.concat(action.files) };
    default:
      // console.log(action.type);
      return state;
  }
};

export default reducer;
