# 参与贡献

对梗图很感兴趣？欢迎参与到项目的贡献中来！接下来是一些参与贡献的指南。

## 环境需求

- [Node.js](https://nodejs.org/) 16.0.0 或更高版本
- [Yarn](https://yarnpkg.com/) 1.22.10 或更高版本
- [Git](https://git-scm.com/)

## 开发

### 目录结构

```text
- memes
  #id-0
  - [issue-id][title]
    - title.[ext]
  - [repo|org]
    - 同 #id-0
    - [repo]
      - 同 #id-0
- pages
  : 很正常的一个 vue 仓库，目标设计为 multiple pages
- rules
  : 自定义的一些 lint 规则
```

### 一些规范

在开发前，需要声明几个事项。

1. 遵循 commit message 规则，请参考 [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)。

    目前暂时支持的 subject 为 `['pages-index', 'cicd', '']`

2. 遵循分支命名规则，请参考 [git flow](https://nvie.com/posts/a-successful-git-branching-model/)。
    
    目前暂时支持的分支为 `['master', 'develop', 'feature/*', 'release/*', 'hotfix/*', 'support/*']`

3. 确保你的代码能通过 lint 规则校验。

### 如何开发

该贡献指南要求你对 Git、Node.js、Vue 与 Vite 具备一定的了解。

* 复制项目下的 .env.example 为 .env 到你的 project root 目录下
* 修改其中的内容为你需要的配置
* 安装依赖，`yarn`。
* 启动项目，`yarn serve`。
* 访问终端显示的 url 链接。
* Coding...
* 提交你的代码，并创建相关的功能 PR，PR 的标题格式如 `[FEATURE] some description #issue-number`。
