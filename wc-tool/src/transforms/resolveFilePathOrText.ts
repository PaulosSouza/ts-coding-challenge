import { lstat } from "fs/promises";
import path from "path";
import { IFilePathOrStdin } from "../interfaces";

export default async function (
  fileNameOrText: string
): Promise<IFilePathOrStdin> {
  const fileResolve = {
    file: {
      path: "",
      name: "",
    },
  };

  try {
    const filePath = path.join(process.cwd(), fileNameOrText);
    const fileStats = await lstat(filePath);

    if (!fileStats.isFile()) {
      return fileResolve;
    }

    fileResolve.file.name = fileNameOrText;
    fileResolve.file.path = filePath;

    return fileResolve;
  } catch {
    return fileResolve;
  }
}
