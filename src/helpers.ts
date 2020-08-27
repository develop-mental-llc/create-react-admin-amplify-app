import { Interface } from "readline";
import { inspect } from "util";
import { spawnSync, spawn } from "child_process";

export const isDebug = () => process.env.CRAAA_DEBUG;
export const debuglog = (obj: any) => {
  if (!isDebug()) {
    return;
  }
  // eslint-disable-next-line
  console.log("*debug*: ", inspect(obj));
};
export const printLine = (message: string) => {
  process.stdout.write(message + "\n");
};
export const die = (message: string) => {
  printLine(message);
  process.exit(1);
};

export function questionUser(reader: Interface, question: string) {
  return new Promise<string>((re, reject) => {
    try {
      reader.question(question + "\n", answer => {
        re(answer);
        reader.pause();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function spawnAndPrintLine(message: string, info: string[]) {
  printLine(message);
  return spawnSync(info[0], info.slice(1));
}

export function spawnAsyncAndPrintLine(message: string, info: string[]) {
  printLine(message);
  return spawn(info[0], info.slice(1));
}
