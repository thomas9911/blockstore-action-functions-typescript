import { IResultString } from "../../interfaces/IResult";

const BASE64_CHARS = /^([a-z]|[A-Z]|[0-9]|-|_|=)*$/;

const base64 = async ({ input, action }): Promise<IResultString> => {
  let result: string;
  switch (action) {
    case "ENCODE":
      return {
        result: Buffer.from(input).toString("base64"),
      };
    case "DECODE":
      if (!BASE64_CHARS.test(input)) {
        throw Error("Invalid Base64 string detected.");
      }

      result = Buffer.from(input, "base64").toString();
      if (result) {
        return { result };
      }
      throw Error("Invalid Base64 string detected.");

    default:
      throw Error(`Invalid action [${action}] detected.`);
  }
};

export default base64;
