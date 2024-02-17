import { useState } from 'react';
import FileInput from '../Components/FileInput';

const UploadContainer = () => {
  const [files, setFiles] = useState<[]>([]);

  console.log('files', files);

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
    </div>
  );
};

export default UploadContainer;
