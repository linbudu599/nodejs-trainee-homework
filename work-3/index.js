const createNote = require("./create");
const listNotes = require("./list");
const clearNotes = require("./clear");

const chalk = require("chalk");

const { _: args } = require("minimist")(process.argv.slice(2));

if (args.length > 1) {
  console.log(chalk.red("现在还只支持一个命令哦，欢迎你继续完善~"));
  process.exit(1);
}

switch (args[0]) {
  case "create":
    createNote();
    break;
  case "list":
    listNotes();
    break;
  case "clear":
    clearNotes();
    break;
  default:
    console.log("command not support yet, use create/list/clear");
}
