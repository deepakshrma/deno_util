import { rgb8 } from "https://deno.land/std/fmt/colors.ts";
import { readLines } from "https://deno.land/std/io/mod.ts";

// Copyright 2018-2020 https://github.com/deepakshrma. All rights reserved. MIT license.

/**
 * Supported colors for
 */
export type Colors = "cyan" | "green" | "grey";

/**
 * PasswordPromptOptions: Options for Password prompt
 * 
 * ast: Asterisk symbol, false for disable
 * @default "*"
 * 
 * color: Color for Asterisk
 * 
 * Options: Colors
 * @default "grey"
 */
export interface PasswordPromptOptions {
  /**
   * ast: Asterisk symbol, false for disable
   *
   * @default "*"
   */
  ast?: string | false;
  /**
   * color: Color for Asterisk
   * Options: Colors
   *
   * @default "grey"
   */
  color?: Colors;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * getColor: Get supported colors
 *
 * @param color
 */
const getColor = (color: Colors | undefined): number => {
  if (!color) return 8;
  return {
    cyan: 14,
    green: 2,
    grey: 8,
  }[color];
};

/**
 * Default options
 */
const defaultOptions: PasswordPromptOptions = {
  ast: "*",
  color: "grey",
};

/**
 * Prompts
 */
/**
 * input: take input from user
 *
 * @param {string} message
 */
export const input = async (message?: string): Promise<string> => {
  if (message) {
    await Deno.write(Deno.stdout.rid, new TextEncoder().encode(message));
  }
  const line = await readLines(Deno.stdin).next();
  const { value = "" } = await line;
  return value.trim();
};
/**
 * password: take input from user as passwd, hide user entered value show asterisk instead
 *
 * @param {string} message message to display, while taking input
 * @param {PasswordPromptOptions} options options for more control.
 */
export const password = async (
  message: string,
  options: PasswordPromptOptions = defaultOptions,
) => {
  options = { ...defaultOptions, ...options };
  Deno.setRaw(0, true);
  Deno.stdout.write(encoder.encode(message));
  let password = "";
  outer:
  while (true) {
    const data = new Uint8Array(1);
    const num = await Deno.stdin.read(data);
    if (!num) break;
    let char = decoder.decode(data);
    switch (char.charCodeAt(0)) {
      case 13:
        break outer;
      case 3:
      case 4:
        Deno.exit(1);
      default:
        password += char;
        Deno.stdout.write(
          encoder.encode(
            `\r${message}${
              typeof options.ast === "string"
                ? rgb8(
                  Array(Math.min(password.length, 5))
                    .fill(options.ast)
                    .join(""),
                  getColor(options.color),
                )
                : ""
            }`,
          ),
        );
        continue;
    }
  }
  console.log("");
  Deno.setRaw(0, false);
  return password;
};
