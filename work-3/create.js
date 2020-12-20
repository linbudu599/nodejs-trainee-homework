const fs = require("fs");
const path = require("path");

const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");

const RECORD_DIR_PATH = path.resolve(__dirname, "notes");

const spinner = ora();

const getFilePath = (timestamp) =>
  path.resolve(__dirname, RECORD_DIR_PATH, `${timestamp}.json`);

const createNote = () => {
  if (!fs.existsSync(RECORD_DIR_PATH)) {
    fs.mkdirSync(RECORD_DIR_PATH);
  }

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "准备记点啥？",
      },
      {
        type: "input",
        name: "user",
        message: "用啥名字？",
        default: "同学",
      },
      {
        type: "list",
        name: "type",
        choices: ["生活", "工作", "娱乐", "其他"],
        message: "这件事属于啥类型？",
        default: "生活",
      },
      {
        type: "input",
        name: "ddl",
        message: "啥时候截止？（YYYY-MM-DD格式，如2021-10-24）",
        default: "2021-10-24",
      },
      {
        type: "confirm",
        name: "confirmed",
        message: "确认保存？",
        default: true,
      },
    ])
    .then(({ title, user, type, ddl, confirmed }) => {
      if (!confirmed) {
        return spinner.succeed(chalk.greenBright("取消保存"));
      }
      const result = `要在 ${ddl} 前 完成 ${title}哦，${user}`;
      spinner.start(`正在写入文件...`);
      const current = Date.now();

      fs.writeFile(
        getFilePath(current),
        JSON.stringify({ title, user, type, ddl, result }),
        { encoding: "utf-8" },
        (err) => {
          return err
            ? spinner.fail(chalk.redBright("写入失败啦..."))
            : spinner.succeed(
                chalk.cyan(
                  `你的备忘事项 ${title} 已保存至 ${RECORD_DIR_PATH}/${current}.json`
                )
              );
        }
      );
    });
};

module.exports = createNote;
