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
