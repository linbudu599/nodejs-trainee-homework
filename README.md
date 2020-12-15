# nodejs-trainee-homework

阿里巴巴前端练习生-NodeJS 方向第一讲 课后作业代码参考仓库

## 代码中使用到的 npm 包

- [inquirer](https://www.npmjs.com/package/inquirer) 用于命令行交互，参考 Vue-CLI 的创建项目过程
- [chalk](https://www.npmjs.com/package/chalk) 改变命令行输出的颜色
- [boxen](https://www.npmjs.com/package/boxen) 在命令行打印盒子
- [ora](https://www.npmjs.com/package/ora) 命令行的加载指示
- [minimist](https://www.npmjs.com/package/minimist) 解析命令行参数，如`vue create`命令
- [cli-table](https://www.npmjs.com/package/cli-table) 在命令行打印表格

## 第一节

见 [work-1.js](work-1.js)

本节涉及：

- `inquirer`的输入、列表选择、密码、确认 API
- 使用`chalk`改变输出文字颜色
- 使用`boxen`在命令行打印盒子

## 第二节

见 [work-2.js](work-2.js)

本节涉及：

- 使用`inquirer`，下一个出现的问题由上一个问题的答案觉得
- 使用`ora`指示进度
- 使用`path`模块：解析路径
- 使用`fs`模块：查看文件夹是否存在、创建文件夹、创建并写入内容到文件

## 第三节

见[work-3](work-3/)

在开始前，首先运行`npm link`命令，这个命令能够将本地文件链接到系统路径中，使你能够在命令行调试自己的 npm 包。

在`package.json`中：

```json
{
  "bin": {
    "note": "./work-3/bin/note"
  }
}
```

所以在执行此命令后，你可以在命令行通过`note <command>`的方式来执行相关文件，你也可以把这个命令换成任意你喜欢的。

支持的命令：

- `note create`： 创建新备忘，包括 标题-用户-类型-截止时间，并写入到文件夹中
- `note list`：读取所有的备忘，并以表格方式呈现
- `note clean`：删除所有的备忘录（需要经过确认）

你可以根据自己的兴趣扩展更多命令和功能，如：

- `note version` 查看版本号
- 备忘的完成状态和编号
- `note finish <id>` 完成备忘
- `note list --user linbudu` 只展示由`linbudu`创建的备忘
- `note ddl -t 1d` 列出到期时间在 1 天内的备忘，可以使用[ms](https://github.com/vercel/ms)来进行类似`1d`这样时间的处理
- ...

当然，你也可以把它发布在 npm 仓库里，然后邀请你的朋友使用~

如果你有什么问题，可以在钉钉群里和大家讨论，我也会在群里答疑，感谢你的参加~
