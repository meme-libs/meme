# Meme

利用 github page 发布你的梗图（入典！！！）。

## 投稿

1. fork 本项目
2. 在 `memes` 目录下创建一个文件夹，格式为 `[issue-id][title]`，例如 `[1][梦 开 始 的 地 方]`
3. 在该文件夹下放入你的梗图，格式为 `title.[ext]`，例如 `第 一 张 梗 图.png`
4. ~~在 `memes` 目录下创建一个 `issue-id.md` 文件，格式为 `[issue-id].md`，例如 `1.md`~~

   （copilot 教的，不知道对不对）

   （上一句也是 copilot 教的）
5. 创建一个 PR，等待合并

## 如何构建你的梗图 page

* fork 仓库到你的 org 或者个人下
* 打开 Actions 页面，点击 `I understand my workflows, go ahead and enable them`
* 按照投稿流程，发起一个 pr 触发 workflow，等待构建完成
* 在 Settings 找到 pages，将 source 选择为 `gh-pages` 分支
* 等待几分钟，访问 `https://[your-username].github.io/meme/` 即可访问你的梗图

## 贡献

想加入新的功能但是无从下手？参考 [CONTRIBUTING.md](CONTRIBUTING.md)。
