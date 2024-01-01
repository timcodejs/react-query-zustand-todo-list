export interface IData {
  id: number;
  title: string | undefined;
}

export interface MainViewModelData {
  inputRef: any;
  setIsEditObject: (e: IData | undefined) => void;
  setIsEdit: (e: boolean) => void;
  refetch: any;
}
