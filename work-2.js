const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

const spinner = ora();

const RECORD_DIR_PATH = path.resolve(__dirname, "work-2-dir");

const getFilePath = (timestamp) =>
  path.resolve(__dirname, RECORD_DIR_PATH, `${timestamp}.json`);

if (!fs.existsSync(RECORD_DIR_PATH)) {
  fs.mkdirSync(RECORD_DIR_PATH);
}

inquirer
  .prompt([
    {
      type: "list",
      name: "end",
      choices: ["前端", "后端"],
      message: "这次想写前端还是后端？",
      default: "前端",
    },
  ])
  .then(({ end }) => {
    const isFe = end === "前端";

    inquirer
      .prompt([
        {
          type: "list",
          name: "framework",
          choices: isFe
            ? ["React", "Vue", "Angular", "Svelte"]
            : ["Express", "Koa", "Egg", "Midway"],
          message: "想用哪个框架写？",
          default: isFe ? "React" : "Koa",
        },
      ])
      .then(({ framework }) => {
        const result = `当然是用 ${framework} 写 ${end} 啦~`;
        spinner.start(`已经收到你的回答: ${result}，正在写入文件...`);
        const current = Date.now();
        fs.writeFile(
          getFilePath(current),
          JSON.stringify({ framework, end, result }),
          { encoding: "utf-8" },
          (err) => {
            return err
              ? spinner.fail(chalk.redBright("写入失败啦..."))
              : spinner.succeed(
                  chalk.cyanBright(
                    `收到你的回答~ 已保存至 ${RECORD_DIR_PATH}/${current}.json`
                  )
                );
          }
        );
      });
  });
