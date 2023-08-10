export interface IFilePathOrStdin {
  file: {
    path: string;
    name: string;
  };
  stdin?: string;
}