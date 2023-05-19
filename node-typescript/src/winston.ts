import { StreamOptions } from "morgan";
import { inspect } from "util";
import { createLogger, format, transports } from "winston";
import { Environment } from "./environment";

const defaultLevel = process.env.LOG_LEVEL || "debug";

const formatter = (info: any) => {
  if (Object.keys(info.metadata).length) {
    if (info.metadata.cause) {
      return `${info.timestamp ? info.timestamp + " |" : ""} [${
        info.level
      }] | ${info.message} | ${inspect(info.metadata.context)} | ${inspect(
        info.metadata.cause,
        undefined,
        5,
        true
      )}`;
    }
    return `${info.timestamp ? info.timestamp + " |" : ""} [${info.level}] | ${
      info.message
    } | ${inspect(
      info.metadata,
      undefined,
      5,
      true
    )}`;
  }

  return `${info.timestamp ? info.timestamp + " |" : ""} [${info.level}] | ${
    info.message
  } `;
};

const timezone = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Calcutta",
});

const jsonFormat = format.combine(
  format.timestamp({ format: timezone }),
  format.splat(),
  format.metadata({
    fillExcept: ["message", "level", "timestamp", "label", "dd"],
  }),
  format.json()
);

const stringFormat = format.combine(
  format.timestamp(),
  format.simple(),
  format.metadata({
    fillExcept: ["message", "level", "timestamp", "label", "dd"],
  }),
  format.printf(formatter)
);

// const stringFormat = format.combine(format.timestamp(), format.prettyPrint());

const logger = createLogger({
  transports: [
    new transports.Console({
      level: defaultLevel,
      handleExceptions: true,
      format:
        Environment.isDevelopment() || Environment.isTest()
          ? stringFormat
          : jsonFormat,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const stream: StreamOptions = {
  write: function (message: string) {
    logger.info(message.trim());
  },
};

export { logger, stream };
