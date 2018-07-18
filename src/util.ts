export interface IFileInput {
  data: Buffer;
  extension: string;
}

export function decodeBase64(
  input: string, fileType = "image"): IFileInput {
  const data = input.replace(/^data:/, "");
  const regex = new RegExp(`${fileType}\/[^;]+`);

  const type = data.match(regex);
  const base64 = data.replace(/^[^,]+,/, "");
  const extension = type ? type[0] : undefined;

  return {
    extension,
    data: Buffer.from(base64, "base64"),
  };
}

export function encodeBase64(input: ArrayBuffer, extension: string): string {
  const metadata = extension ? `data:${extension};base64,` : "";

  return metadata + Buffer.from(input).toString("base64");
}