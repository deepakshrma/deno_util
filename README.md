# DENO UTIL

A util module for `Deno language`. Supporting logger and password prompt.

## How to use

All examples can be found in [examples](/examples/)

### logger.ts

**Import:**

```ts
import { Logger } from "https://raw.githubusercontent.com/deepakshrma/deno_util/master/logger.ts";
```

**Create Instance:**

```ts
const options = {
  level: 1,
  format: "Logger: %s",
  newLine: false,
};
const logger = new Logger(options);
```

**NOTE:** `options` is optional. It will merge with default value. The default value is

`const initialOptions = { level: 0, format: "%s", newLine: true };`

**Interfaces:**

```ts
interface LoggerOptions {
  level?: LogLevel;
  format?: string;
  newLine?: boolean;
}

type LogLevel = 0 | 1 | 2 | 3;
```

**Full Uses:**

```ts
const logger = new Logger({ format: "Logger: %s" });
logger.log("This is log message");
logger.info("This is info message");

logger.error("This is error message");

/// Custom formatter
logger.info("My name is %s and my salary is: %d", "Deepak", 2000);
logger.warn("My name is %s and my salary is: %d", "Deepak", 2000);
logger.error("My name is %s and my salary is: %d", "Deepak", 2000);

// Change level
logger.level = 2;

// This will not print
logger.info("My name is %s and my salary is: %d", "Deepak", 2000);

// This will print
logger.warn("My name is %s and my salary is: %d", "Deepak", 2000);

// inverse message
logger.inverse("This is inverse!!");

// print line
logger.line();

// print line with message
logger.line("This will print inside line");

// Set logger.level to not accepted value, // Error

// logger.level = 5; // Error

// Change default format
logger.level = 1;
logger.format = "This is something new version: %s";

logger.info("1.0.1");
logger.warn("1.0.2");

logger.raw("This is something new raw");

// Overridden print
logger.raw("This is something new version", 2, false);

console.log("\n=======================\n");
// Using De-Structure
logger.format = "De-Structure: %s";
const { inverse, error: logError } = logger;
inverse("This is inverse");

logError("This is Error.");
```

![Output](assets/logger-sample.png?raw=true "Logger output")

#### Example: Loading message

```ts
const delay = (ms = 5000) => new Promise((r) => setTimeout(r, ms));

const logger = new Logger();
const cancel = logger.loading("Loading..."); // start loader

delay().then(cancel);
```

## prompt.ts

`Prompts.password` API using `Deno.setRaw`, Which is unsupported till now `[deno v1.0.5]`. You have to use flag `--unstable` with run command.

**Import:**

```ts
import {
  Prompts,
  PasswordPromptOptions,
} from "https://raw.githubusercontent.com/deepakshrma/deno_util/master/prompts.ts";
```

**Interfaces:**

```ts
type Colors = "cyan" | "green" | "grey";

interface PasswordPromptOptions {
  ast?: string | false;
  color?: Colors;
}
```

**Full Uses:**

```ts
(async function () {
  const passwd = await Prompts.password("Enter Password Here: ");
  console.log(`You have enter password: ` + passwd);

  // Custom Asterisk[-]
  const passwd1 = await Prompts.password("Enter Password Here[-]: ", {
    ast: "-",
  });
  console.log(`You have enter password: ` + passwd1);

  // Disable Asterisk
  const passwd2 = await Prompts.password("Enter Password Here[-]: ", {
    ast: false,
  });
  console.log(`You have enter password: ` + passwd2);

  // Custom color for Asterisk ast[-]
  const passwd3 = await Prompts.password("Enter Password Here[-]: ", {
    color: "cyan",
  });
  console.log(`You have enter password: ` + passwd2);
})();
```

**Take username and password:**

```ts
(async function () {
  const username = await Prompts.input("username: ");
  const passwd = await Prompts.password("password: ");
  console.log({ username, passwd });
})();
```

**Output:**
![Output](assets/user_input.png?raw=true "Logger output")

**How to run:**

```bash
deno run --unstable examples/prompt_demo.ts
```
