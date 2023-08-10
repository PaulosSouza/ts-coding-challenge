import { error, log } from "console";
import { FileHandle, open, readFile } from "fs/promises";
import countWords from "../helpers/countWords";
import { IFilePathOrStdin } from "../interfaces";
import resolveFilePathOrText from "../transforms/resolveFilePathOrText";

export class Commands {
  async default(fileNameOrText: string) {
    try {
      const filePathOrStdin = await resolveFilePathOrText(fileNameOrText);

      const lines = await this.lines(filePathOrStdin, false);
      const words = await this.words(filePathOrStdin, false);
      const chars = await this.chars(filePathOrStdin, false);

      if (!lines && !words && !chars) {
        throw new Error("Something goes wrong");
      }

      this.logByTexts([
        String(lines),
        String(words),
        String(chars),
        fileNameOrText,
      ]);
    } catch (err) {
      if (err) {
        error(err);
        process.exit(1);
      }

      error(`wc-ph: No such file or directory`);
      process.exit(1);
    }
  }

  async bytes(filePathOrStdin: IFilePathOrStdin, shouldLog = true) {
    let fileHandle: FileHandle | null = null;

    if (filePathOrStdin.stdin) {
      const bytes = Buffer.byteLength(filePathOrStdin.stdin, "utf-8");

      this.logByTexts([String(bytes)], shouldLog);

      return bytes;
    }

    const { file } = filePathOrStdin;

    try {
      fileHandle = await open(file.path);
      const fileBuffer = await fileHandle.readFile();

      const bytes = fileBuffer.length;

      this.logByTexts([String(bytes), file.name], shouldLog);

      return bytes;
    } catch {
      error(`wc-ph: No such file or directory`);
      process.exit();
    }
  }

  async lines(
    filePathOrStdin: IFilePathOrStdin,
    shouldLog = true
  ): Promise<number | undefined> {
    if (filePathOrStdin.stdin) {
      const stdinString = filePathOrStdin.stdin;

      const matchedStrings = stdinString.split(/\r?\n/);
      const lines = matchedStrings?.length;

      this.logByTexts([String(lines)]);

      return lines;
    }

    const { file } = filePathOrStdin;

    try {
      const fileHandle = await open(file.path);
      const fileStream = fileHandle.readLines({ autoClose: true });

      let lines = 0;

      return new Promise((resolve) => {
        fileStream.on("line", () => (lines += 1));
        fileStream.on("close", () => {
          this.logByTexts([String(lines), file.name], shouldLog);
          return resolve(lines);
        });
      });
    } catch {
      error(`wc-ph: No such file or directory`);
      process.exit(1);
    }
  }

  async words(filePathOrStdin: IFilePathOrStdin, shouldLog = true) {
    let wordCount: number;

    if (filePathOrStdin.stdin) {
      wordCount = countWords(filePathOrStdin.stdin);

      this.logByTexts([String(wordCount)]);

      return wordCount;
    }

    const { file } = filePathOrStdin;

    try {
      const fileContent = await readFile(file.path, { encoding: "utf8" });

      wordCount = countWords(fileContent);

      this.logByTexts([String(wordCount), file.name], shouldLog);

      return wordCount;
    } catch {
      error(`wc-ph: No such file or directory`);
      process.exit(1);
    }
  }

  async chars(filePathOrStdin: IFilePathOrStdin, shouldLog = true) {
    const regexUTF = /(?:utf|utf-8)/gi;
    const currentLanguage =
      process.env.LANG?.split(".").toString().toLowerCase() ?? "";

    const isUTF = regexUTF.test(currentLanguage);

    if (!isUTF) {
      await this.bytes(filePathOrStdin, shouldLog);
      return;
    }

    let charactersLength: number;

    if (filePathOrStdin.stdin) {
      charactersLength = filePathOrStdin.stdin.length;

      this.logByTexts([String(charactersLength)]);

      return charactersLength;
    }

    let fileHandle: FileHandle | null = null;
    const { file } = filePathOrStdin;

    try {
      fileHandle = await open(file.path);

      const utfFile = await fileHandle.readFile({ encoding: "utf-8" });

      charactersLength = utfFile.length;

      this.logByTexts([String(charactersLength), file.name], shouldLog);

      return charactersLength;
    } catch {
      error(`wc-ph: No such file or directory`);
      process.exit(1);
    }
  }

  private logByTexts(texts: string[], shouldLog = true) {
    if (!shouldLog) {
      return;
    }

    const optionsSeparatedBySpace = Array.isArray(texts)
      ? texts.join(" ")
      : texts;

    log(optionsSeparatedBySpace);
    return;
  }

  [key: string]: any;
}
