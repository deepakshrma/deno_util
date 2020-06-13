import { Logger } from "../logger.ts";

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
