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

test("Base64 with incorrect action throws error", async () =>
  expect(async () =>
    base64({
      action: UNKNOWN,
      input: ENCODED_VALUE,
    })
  ).rejects.toThrow(`Invalid action [${UNKNOWN}] detected.`));

test("Base64 decode with incorrect encoded string throws error", async () => {
  const RANDOM_TEXT = "this is just some text";
  return expect(async () =>
    base64({
      action: "DECODE",
      input: RANDOM_TEXT,
    })
  ).rejects.toThrow(`Invalid Base64 string detected.`);
});
