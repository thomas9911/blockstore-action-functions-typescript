import { IResultString } from "../typescript/interfaces/IResult";
import base64 from "../typescript/base64/1.0";

const UNKNOWN = "UNKNOWN";
const DECODED_VALUE = "This is a decoded value";
const ENCODED_VALUE = "VGhpcyBpcyBhIGRlY29kZWQgdmFsdWU=";

test("Base64 encoding returns correctly encoded value", async () => {
  const response: IResultString = await base64({
    action: "ENCODE",
    input: DECODED_VALUE,
  });
  expect(response.result).toBe(ENCODED_VALUE);
});

test("Base64 decoding returns correctly decoded value", async () => {
  const response: IResultString = await base64({
    action: "DECODE",
    input: ENCODED_VALUE,
  });
  expect(response.result).toBe(DECODED_VALUE);
});

test("Base64 with incorrect action throws error", async () => {
  try {
    await base64({
      action: UNKNOWN,
      input: ENCODED_VALUE,
    });
  } catch (e) {
    expect(e).toStrictEqual({
      error: `Invalid action [${UNKNOWN}] detected.`,
    });
  }
});

test("Base64 decode with incorrect encoded string throws error", async () => {
  const RANDOM_TEXT = (Math.random() + 1).toString(36);
  try {
    await base64({
      action: "DECODE",
      input: RANDOM_TEXT,
    });
  } catch (e) {
    expect(e).toStrictEqual({
      error: "Invalid Base64 string detected.",
    });
  }
});
