import { existsSync, mkdirSync } from "fs";

export default function (folderPath: string) {
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }
}
