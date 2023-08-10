export default async function (): Promise<string> {
  return new Promise((resolve) => {
    let stdinResolvedString = "";

    process.stdin.on("data", (buffer) => {
      stdinResolvedString += buffer.toString("utf-8");
    });

    process.stdin.on("end", () => {
      resolve(stdinResolvedString);
    });
  });
}