import { useState } from 'react';
import FileInput from '../Components/FileInput';
import FileInput2 from '../Components/FileInput2';

const UploadContainer = () => {
  const [files, setFiles] = useState<[]>([]);
  const [files2, setFiles2] = useState<[]>([]);

  return (
    <div>
      <FileInput
        value={files}
        name={'file_upload'}
        placeholder={'이미지를 첨부하거나 드래그 해주세요.'}
        accept={'image/*'}
        fullWidth={false}
        errors={undefined}
        onChange={(e) => setFiles(e)}
      />
      <div style={{ margin: '20px 0' }} />
      <FileInput2
        value={files2}
        name={'file_upload'}
        placeholder={'Drag & Drop \n or browse'}
        accept={'image/*'}
        fullWidth={false}
        errors={undefined}
        onChange={(e) => setFiles2(e)}
      />
    </div>
  );
};

export default UploadContainer;
