const fs = require("fs");
const path = require("path");
const Table = require("cli-table");
const ora = require("ora");
const { promisify } = require("util");
const chalk = require("chalk");

const readDirPromise = promisify(fs.readdir);
const readFilePromise = promisify(fs.readFile);

const NOTE_DIR_PATH = path.resolve(__dirname, "notes");

const listNotes = () => {
  const spinner = ora().start();

  const head = ["名称", "用户", "类型", "截止时间"].map((item) =>
    chalk.cyan(item)
  );

  const table = new Table({
    head,
  });

  readDirPromise(NOTE_DIR_PATH)
    .then((data) => {
      let readPromiseGroup = [];

      if (!data.length) {
        console.log(chalk.yellow("看起来你还没有写过备忘录~"));
        process.exit(0);
      }

      for (const file of data) {
        const filePath = path.resolve(NOTE_DIR_PATH, file);
        readPromiseGroup.push(readFilePromise(filePath, { encoding: "utf-8" }));
      }
      spinner.succeed("读取目录完成~");

      return Promise.all(readPromiseGroup);
    })
    .then((res) => {
      for (const data of res) {
        const tmp = JSON.parse(data);
        table.push([tmp.title, tmp.user, tmp.type, tmp.ddl]);
      }
      spinner.succeed("读取文件完成~");

      console.log(chalk.green(table.toString()));
    });
};

module.exports = listNotes;
