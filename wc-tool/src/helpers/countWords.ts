export default function (content: string): number {
  return content.split(/\s+/g).filter((word) => word !== "").length;
}