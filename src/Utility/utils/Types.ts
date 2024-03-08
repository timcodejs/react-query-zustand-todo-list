export interface IData {
  id: number;
  title: string | undefined;
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
