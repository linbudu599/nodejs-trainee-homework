const inquirer = require("inquirer");
const chalk = require("chalk");
const boxen = require("boxen");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "同学好~ 请输入你的姓名：",
    },
    {
      type: "list",
      name: "favor",
      choices: ["JavaScript", "TypeScript", "Java", "Python", "Golang"],
      message: "请选择你感兴趣的语言",
      default: "TypeScript",
    },
    {
      type: "password",
      name: "password",
      message: "请输入你的密码(假的就行)",
    },
    {
      type: "confirm",
      name: "confirmed",
      message: "准备好学习Node.js了吗~",
      default: true,
    },
  ])
  .then(({ name, favor, confirmed }) => {
    console.log(
      boxen("Node.js练习生已获得你的答案~", {
        borderColor: "green",
        padding: { left: 1, right: 1 },
      })
    );
    console.log(
      chalk.cyanBright(
        `Hi, 对 ${favor} 感兴趣的 ${name} 同学， ${
          confirmed ? "欢迎来到Node.js练习生" : "可要快点准备好奥~"
        }`
      )
    );
  });
