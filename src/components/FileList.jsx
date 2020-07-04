import React from 'react';
import File from './File';

const FileList = (data) => {
  let list = null;
  if (data.fileList && data.fileList.length > 0) {
    list = data.fileList.map((f) => f
    && <File key={f.lastModified} fileName={f.name} uploadDate={f.uploadedAt} />);
  }
  // if (data.fileList) {
  //   console.log(`data.fileList: ${data.fileList}`);
  //   if (data.fileList.length > 0) {
  //     console.log(`data.fileList.length: ${data.fileList.length}`);
  //     list = data.fileList.map((f) => f
  //   && <p key={f.lastModified}>{f.name}</p>);
  //     console.log(`list: ${list}`);
  //   } else console.log('data.fileList.length <= 0');
  // } else console.log('no fileList');
  return list;
};

export default FileList;
