import React from 'react';
import File from './File';

const FileList = (data) => <div>
{ 
  data.fileList && 
  data.fileList.length > 0 && 
  data.fileList.map((f) => f && 
    <File key={f.lastModified} fileName={f.name} uploadDate={f.uploadedAt} />
  )}
</div>

export default FileList;
