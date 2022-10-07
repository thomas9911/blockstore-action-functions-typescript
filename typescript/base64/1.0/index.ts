import { IResultString } from "../../interfaces/IResult";

const base64 = async ({ input, action }): Promise<IResultString> => {
  let result: string;
  switch (action) {
    case "ENCODE":
      return {
        result: Buffer.from(input).toString("base64"),
      };
    case "DECODE":
      result = Buffer.from(input, "base64").toString();
      if (result) {
        return {
          result: Buffer.from(input, "base64").toString(),
        };
      } else {
        throw {
          error: "Invalid Base64 string detected.",
        };
      }
    default:
      throw {
        error: `Invalid action [${action}] detected.`,
      };
  }
};
export default base64;
