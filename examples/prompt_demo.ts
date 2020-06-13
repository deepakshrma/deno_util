import { input, password } from "../prompts.ts";

/**
 * Example: Password
 */

(async function () {
  const passwd = await password("Enter Password Here: ");
  console.log(`You have enter password: ` + passwd);

  // Custom Asterisk[-]
  const passwd1 = await password("Enter Password Here[-]: ", {
    ast: "-",
  });
  console.log(`You have enter password: ` + passwd1);

  // Disable Asterisk
  const passwd2 = await password("Enter Password Here[-]: ", {
    ast: false,
  });
  console.log(`You have enter password: ` + passwd2);

  // Custom color for Asterisk ast[-]
  const passwd3 = await password("Enter Password Here[-]: ", {
    color: "cyan",
  });
  console.log(`You have enter password: ` + passwd2);
})();

(async function () {
  const username = await input("username: ");
  const passwd = await password("password: ", { color: "cyan" });
  console.log({ username, passwd });
})();
