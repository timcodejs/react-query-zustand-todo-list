import { forwardRef, useCallback, useRef, useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import imagePNG from '../Assets/images/image.png';
import BtnXSVG from '../Assets/images/btn_x.svg';
import { FileInputProps } from '../Utility/utils/Types';

const FileInput2 = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const { placeholder, accept, errors, ...rest } = props;
    const fileRef = useRef<HTMLInputElement>(null);
    const fileInput = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const root = rootCss(props, isDragging);

    useEffect(() => {
      if (rest.value === '') {
        if (fileInput.current) fileInput.current.value = '';
        if (fileRef.current) fileRef.current.value = '';
      }
    }, [rest.value]);

    useEffect(() => {
      if (props.filename) {
        if (fileRef.current) {
          fileRef.current.value = props.filename;
        }
      }
    }, [props.filename]);

    const handleChange = useCallback((e: any) => {
      if (e.type === 'drop') {
        if (fileRef.current) {
          fileRef.current.value = e.dataTransfer.files[0]?.name;
          rest.onChange(e.dataTransfer.files);
        }
      } else {
        if (fileRef.current) {
          fileRef.current.value = e.target.files[0]?.name;
          rest.onChange(e.target.files);
        }
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
        <input
          type='file'
          id='files'
          style={{ display: 'none' }}
          ref={fileInput}
          accept={accept}
          onChange={(e: any) => handleChange(e)}
        />
        <div className='flex-box drag-container' ref={fileRef}>
          {fileRef?.current?.value ? (
            <div className='flex-box'>
              <div>{fileRef.current.value}</div>
              <button
                type='button'
                className='file-delete'
                onClick={handleRemoveFile}
              >
                <img src={BtnXSVG} alt='삭제 버튼 아이콘' />
              </button>
            </div>
          ) : (
            <div className='flex-box drag-inner'>
              <img className='drag-image' src={imagePNG} alt='이미지 아이콘' />
              <div className='drag-text'>{placeholder}</div>
              <div className='drag-text2'>Supports: JPEG, JPG, PNG</div>
            </div>
          )}
        </div>
        <div className='file-btn'>
          <label className='flex-box' htmlFor='files'>
            파일 첨부
          </label>
        </div>
      </div>
    );
  }
);

const rootCss = (props: FileInputProps, isDragging: boolean) => {
  return css`
    .drag-container {
      width: 400px;
      height: 300px;
      font-size: 16px;
      color: #000;
      box-sizing: border-box;
      border: dashed 2px #bcbcbc;
      background: ${isDragging ? '#373737' : '#f9f9f9'};
    }

    .flex-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .drag-inner {
      flex-direction: column;
    }

    .drag-image {
      width: 50px;
    }

    .drag-text {
      white-space: pre-wrap;
      margin: 10px 0;
      font-size: 20px;
      font-weight: bold;
    }

    .drag-text2 {
      font-size: 13px;
      color: #575757;
    }

    .file-btn label {
      width: 400px;
      height: 69px;
      margin-top: 10px;
      color: #fff;
      border-radius: 10px;
      background-color: #1f1852;
      cursor: pointer;
    }

    .file-delete {
      display: flex;
      background: none;
      border: 0;
      font-size: 14px;
      color: #707070;
      font-weight: normal;
      cursor: pointer;
    }
  `;
};

export default FileInput2;
