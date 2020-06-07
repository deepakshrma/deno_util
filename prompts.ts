import { rgb8 } from "https://deno.land/std/fmt/colors.ts";

type Colors = "cyan" | "green" | "grey";

interface PasswordPromptOptions {
  ast?: string | false;
  color?: Colors;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const getColor = (color: Colors | undefined): number => {
  if (!color) return 8;
  return {
    cyan: 14,
    green: 2,
    grey: 8,
  }[color];
};

const defaultOptions: PasswordPromptOptions = {
  ast: "*",
  color: "grey",
};

class Prompts {
  static password = async (
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
}

export { Prompts, PasswordPromptOptions };
