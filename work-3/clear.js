const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");

const rmDirPromise = promisify(fs.rmdir);

const NOTE_DIR_PATH = path.resolve(__dirname, "notes");

const deleteNotes = () => {
  const spinner = ora();

  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmed",
        message: chalk.redBright("确认删除所有备忘吗？"),
        default: true,
      },
    ])
    .then(({ confirmed }) => {
      if (!confirmed) {
        spinner.succeed("取消删除");
        process.exit(0);
      }

      return rmDirPromise(NOTE_DIR_PATH, { recursive: true });
    })
    // 得做点错误处理~
    .finally((res) => {
      spinner.succeed("删除完毕");
    });
};

module.exports = deleteNotes;
