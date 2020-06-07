import { sprintf, printf } from "https://deno.land/std/fmt/printf.ts";
import { rgb8, bgRgb8 } from "https://deno.land/std/fmt/colors.ts";

// Copyright 2018-2020 https://github.com/deepakshrma. All rights reserved. MIT license.

/**
 * LogLevel: Enum => 0 | 1 | 2 | 3
 */
type LogLevel = 0 | 1 | 2 | 3;

interface LoggerOptions {
  level?: LogLevel;
  format?: string;
  newLine?: boolean;
}

/**
 * Default option:
 * initialOptions = { level: 0, format: "%s\n" };
 */

const initialOptions = { level: 0, format: "%s", newLine: true };

/**
 * Logger
 *
 */
class Logger {
  static COLORS = {
    BLACK: 0,
    MAROON: 1,
    GREEN: 2,
    BLUE: 4,
    PURPLE: 5,
    LIGHT_GREY: 7,
    GREY: 8,
    RED: 9,
    LIGHT_GREEN: 10,
    YELLOW: 11,
    CYAN: 14,
    WHITE: 15,
  };
  /**
   * #_level: LogLevel
   */
  private _level: LogLevel;
  /**
   * #_format: string
   */
  private _format: string;
  /**
   * #_appendNewLine: boolean
   */
  private _nl: boolean;
  /**
   * constructor() // Default value { level: 0, format: "%s\n" }
   *
   * @param options : LoggerOptions
   */
  constructor(options: LoggerOptions = initialOptions as LoggerOptions) {
    const { level, format, newLine } = { ...initialOptions, ...options };
    this._level = level as LogLevel;
    this._format = format;
    this._nl = newLine;
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.inverse = this.inverse.bind(this);
    this.raw = this.raw.bind(this);
  }
  /**
   * getter for _level
   */
  get level(): LogLevel {
    return this._level;
  }
  /**
   * setter for _level
   */
  set level(_l: LogLevel) {
    this._level = _l;
  }
  /**
   * getter for _format
   */
  get format(): string {
    return this._format;
  }
  /**
   * setter for _format
   */
  set format(_f: string) {
    this._format = _f;
  }
  /**
   * log: Prints log when log level is 0 with gray color
   *
   * @param format override default format or use as message
   * @param messages accepts vargs any as printf/scanf
   */
  log(format: string, ...messages: unknown[]) {
    if (this.level > 0) return;
    if (messages.length === 0) {
      messages = [format];
      format = this.format;
    }
    this.raw(sprintf(format, ...messages), Logger.COLORS.GREY);
  }
  /**
   * info: Prints log when log level is 0 with cyan color
   *
   * @param format override default format or use as message
   * @param messages accepts vargs any as printf/scanf
   */
  info(format: string, ...messages: unknown[]) {
    if (this.level > 1) return;
    if (messages.length === 0) {
      messages = [format];
      format = this.format;
    }
    this.raw(sprintf(format, ...messages), Logger.COLORS.CYAN); //
  }
  /**
   * warn: Prints log when log level is 0 with yellow color
   *
   * @param format override default format or use as message
   * @param messages accepts vargs any as printf/scanf
   */
  warn(format: string, ...messages: unknown[]) {
    if (this.level > 2) return;
    if (messages.length === 0) {
      messages = [format];
      format = this.format;
    }
    this.raw(sprintf(format, ...messages), Logger.COLORS.YELLOW); //
  }
  /**
   * error: Prints log when log level is 0 with red color
   *
   * @param format override default format or use as message
   * @param messages accepts vargs any as printf/scanf
   */
  error(format: string, ...messages: unknown[]) {
    if (messages.length === 0) {
      messages = [format];
      format = this.format;
    }
    this.raw(sprintf(format, ...messages), Logger.COLORS.RED); //
  }
  /**
   * inverse:
   *
   * @param format override default format or use as message
   * @param messages accepts vargs any as printf/scanf
   */
  inverse(format: string, ...messages: unknown[]) {
    if (messages.length === 0) {
      messages = [format];
      format = this.format;
    }
    this.raw(
      bgRgb8(sprintf(format, ...messages), Logger.COLORS.WHITE),
      Logger.COLORS.GREY
    );
  }

  /**
   *
   * @param message : message to print
   * @param color : color to print. {default 15}
   * @param nl : add or remove newline
   */
  raw(message: string, color: number = 15, nl: boolean = this._nl) {
    printf(rgb8(message, color) + (nl ? "\n" : ""));
  }

  /**
   * line: print line with or without message
   *
   * @param message? message to print inside line
   */
  line(message?: string) {
    const line = "==========================================================";
    const messages = message ? [line, `||\t${message}`, line] : [line];
    this.raw(messages.join("\n"));
  }
}

export { Logger, LogLevel, LoggerOptions };

/**
 * Example: How to use
 *
 *
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
 */
