import { forwardRef, useCallback, useRef, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import BtnXSVG from '../Assets/images/btn_x.svg';
import { FileInputProps } from '../Utility/utils/Types';

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const { placeholder, accept, errors, ...rest } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const root = rootCss(props);
  const label = labelCss(props);

  const fileRef = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (rest.value === '') {
      if (fileInput.current) fileInput.current.value = '';
      if (fileRef.current) fileRef.current.value = '';
    }
  }, [rest.value]);

  useEffect(() => {
    if (props.filename) {
      if (fileRef.current) fileRef.current.value = props.filename;
    }
  }, [props.filename]);

  const handleChange = useCallback((e: any) => {
    if (e.type === 'drop') {
      if (fileRef.current)
        fileRef.current.value = e.dataTransfer.files[0]?.name;
      rest.onChange(e.dataTransfer.files);
    } else {
      if (fileRef.current) fileRef.current.value = e.target.files[0]?.name;
      rest.onChange(e.target.files);
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    if (fileRef.current) fileRef.current.value = '';
    if (fileInput.current) fileInput.current.value = '';
    rest.onChange([]);
  }, []);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      handleChange(e);
      setIsDragging(false);
    },
    [handleChange]
  );

  const initDragEvents = useCallback((): void => {
    if (fileRef.current !== null) {
      fileRef.current.addEventListener('dragenter', handleDragIn);
      fileRef.current.addEventListener('dragleave', handleDragOut);
      fileRef.current.addEventListener('dragover', handleDragOver);
      fileRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (fileRef.current !== null) {
      fileRef.current.removeEventListener('dragenter', handleDragIn);
      fileRef.current.removeEventListener('dragleave', handleDragOut);
      fileRef.current.removeEventListener('dragover', handleDragOver);
      fileRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div css={root}>
      <div className='file-wrap'>
        <div className='file-inner'>
          <input
            type='file'
            id='files'
            ref={fileInput}
            accept={accept}
            onChange={(e: any) => handleChange(e)}
          />
          <label css={label} htmlFor='files'>
            <input
              type='text'
              id='file-submit'
              ref={fileRef}
              placeholder={placeholder}
              disabled
            />
          </label>
          <button
            type='button'
            className='file-delete'
            onClick={handleRemoveFile}
          >
            <img src={BtnXSVG} alt='삭제 버튼 아이콘' />
          </button>
        </div>
        <div className='file-btn'>
          <label htmlFor='files'>파일 첨부</label>
        </div>
      </div>
    </div>
  );
});

const rootCss = (props: FileInputProps) => {
  return css`
    .file-wrap {
      display: flex;
    }

    .file-inner {
      width: 400px;
      display: flex;
      justify-content: space-between;
    }

    #files {
      display: none;
    }

    .file-delete {
      display: flex;
      align-items: center;
      position: relative;
      left: -35px;
      margin-right: 13px;
      background: none;
      border: 0;
      font-size: 14px;
      color: #707070;
      font-weight: normal;
      cursor: pointer;
    }

    .file-btn label {
      width: 120px;
      height: 69px;
      color: #fff;
      margin-left: 35px;
      background-color: #1f1852;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `;
};

const labelCss = (props: FileInputProps) => {
  return css`
    #file-submit {
      width: 400px;
      height: 65px;
      background: transparent;
      font-size: 16px;
      color: #000;
      padding-left: 20px;
      border: solid 1px #ddd;
      background: #f9f9f9;

      &::placeholder {
        color: #b2b2b2;
      }
    }
  `;
};

export default FileInput;
