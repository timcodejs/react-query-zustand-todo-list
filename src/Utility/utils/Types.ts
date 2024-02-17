export interface IData {
  id: number;
  title: string | undefined;
}

export interface MainViewModelData {
  btnRef: any;
  inputRef: any;
  setIsEditObject: (e: IData | undefined) => void;
  setIsEdit: (e: boolean) => void;
  refetch: any;
}

export interface FileInputProps {
  w?: string;
  idx?: number;
  value: any;
  name: string;
  filename?: string;
  placeholder: string;
  accept: string;
  fullWidth: boolean;
  errors: any;
  onChange: (e: any) => void;
}
