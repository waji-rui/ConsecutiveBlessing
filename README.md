# 2026 新年祈福连击

一个纯前端、零后端状态的春节互动祈福小游戏。点击祈福按钮累计福气值，目标是连击 **2026** 次，迎接新年烟花的祝福。

> 谨供纪念 · 新年快乐 · 万事如意

---

## 项目简介

本项目是一个轻量的单页互动网页游戏，适合在春节期间分享给朋友一起“祈福”。玩家每次点击祈福按钮，都会随机展示一条祝福语，并累计 1 点福气值；当福气值达到 2026 时，页面进入圆满状态，触发烟花动画，并显示“新年快乐”。

项目提供了两种使用方式：

1. **直接部署静态 HTML**：使用 [`index.html`](./index.html) 即可部署到任何静态托管服务（如 GitHub Pages、Vercel、Netlify、Cloudflare Pages）。
2. **Cloudflare Workers 部署**：使用 [`worker.js`](./worker.js) 作为 Worker 脚本，由服务端动态返回完整页面。

两种版本玩法、样式与逻辑完全一致，区别在于：

- `index.html` 是完整自包含的单文件，内嵌了全部代码与祝福数据。
- `worker.js` 将祝福数组统一维护在服务端，并通过 `JSON.stringify` 注入到客户端脚本中，避免前后端重复维护数据。

---

## 功能特性

- 🧧 **新年祈福主题**：金色+深红配色，营造喜庆氛围。
- 🎆 **烟花庆祝动画**：达成目标后自动播放烟花粒子效果。
- ✨ **背景金色粒子**：全屏飘动的金色粒子背景，增强沉浸感。
- 🖱️ **按钮随机漂移**：每次点击后祈福按钮会随机移动位置，并轻微旋转，增加趣味性。
- 💾 **本地 Cookie 保存进度**：刷新页面或关闭浏览器后，福气值不会丢失（有效期 365 天）。
- 📱 **移动端适配**：禁止缩放、适配小屏、支持触摸点击。
- 🌐 **多语言祝福**：包含中文古诗词、现代励志语、英文名言、日韩法德拉丁等多语种短句。
- 🔄 **一键重置**：达成目标后可点击“清零再来”重新开始。

---

## 文件结构

```
.
├── index.html      # 可直接部署的完整前端单页
├── worker.js       # Cloudflare Workers 版本
├── LICENSE         # MIT 许可证
└── README.md       # 本说明文件
```

### 文件说明

#### `index.html`

- 包含完整的 HTML 结构、CSS 样式与 JavaScript 逻辑。
- 内置约 670 条祝福语的 `BLESSINGS` 数组。
- 不依赖任何外部构建工具，可直接在浏览器中打开或部署到静态托管服务。
- 通过 Google Fonts 加载“马善政”毛笔字体与 Noto Serif SC 衬线字体。

#### `worker.js`

- 标准的 Cloudflare Workers ES Module 入口，导出 `fetch` 处理器。
- 服务端维护一份 `BLESSINGS` 数组，并注入到返回的 HTML 中。
- 适合希望统一维护祝福数据、通过 Worker 直接返回页面的场景。

---

## 快速开始

### 方式一：直接打开

1. 下载或克隆本仓库。
2. 双击 [`index.html`](./index.html) 在浏览器中打开。
3. 点击“开启祈福之旅”，开始点击祈福按钮。

### 方式二：部署到 GitHub Pages

1. 将仓库推送到 GitHub。
2. 进入仓库 **Settings → Pages**。
3. Source 选择 **Deploy from a branch**，Branch 选择 `main` / `root`。
4. 等待几分钟后，即可通过 `https://<你的用户名>.github.io/<仓库名>/` 访问。

### 方式三：部署到 Cloudflare Workers

#### 准备工作

- 注册 [Cloudflare](https://dash.cloudflare.com/) 账号。
- 安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)。

#### 部署步骤

1. 确认项目根目录存在 [`worker.js`](./worker.js)。
2. 在项目根目录创建 `wrangler.toml`：

```toml
name = "new-year-blessing-2026"
main = "worker.js"
compatibility_date = "2026-01-01"
```

3. 登录 Wrangler：

```bash
npx wrangler login
```

4. 部署：

```bash
npx wrangler deploy
```

5. 部署完成后，Wrangler 会输出一个 `.workers.dev` 域名，打开即可游玩。

---

## 游戏玩法

1. 打开页面，点击“开启祈福之旅”进入主界面。
2. 点击红色祈福按钮，每次点击：
   - 福气值 +1；
   - 按钮随机移动到新位置；
   - 随机展示一条祝福语。
3. 持续点击，直到福气值达到 **2026**。
4. 达成目标后：
   - 页面中央显示“新年快乐”；
   - 触发全屏烟花动画；
   - 按钮变为“清零再来”，点击后清空进度并重新开始。

> 进度会自动保存在浏览器 Cookie 中，刷新页面后将继续累计。

---

## 技术实现

### 前端技术栈

- 纯原生 HTML5 + CSS3 + JavaScript，无框架依赖。
- 使用 `Canvas 2D` 实现背景粒子与烟花动画。
- 使用 CSS 动画实现淡入、脉冲、文字发光等效果。
- 使用 `Cookie` 存储用户进度。

### 核心变量

```javascript
const TARGET_COUNT = 2026;      // 目标福气值
const COOKIE_NAME = 'blessingCount'; // 保存进度的 Cookie 名称
let currentCount = 0;           // 当前福气值
```

### 关键函数

| 函数 | 作用 |
|------|------|
| `startJourney()` | 隐藏欢迎页，进入主界面，读取 Cookie 中的进度 |
| `handleBtnClick(e)` | 处理按钮点击，更新计数、保存 Cookie、随机切换祝福 |
| `moveButtonRandomly()` | 随机移动祈福按钮，并避开文字区域 |
| `showFinishState()` | 达成 2026 后进入完成状态，启动烟花 |
| `resetJourney()` | 删除 Cookie 并刷新页面 |
| `startFireworks()` | 启动烟花 Canvas 动画 |
| `initBackground()` | 初始化背景金色粒子 |

### 服务端逻辑（Worker）

```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response(generateHTML(), {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  }
};
```

Worker 仅负责返回渲染后的 HTML 字符串，所有状态仍保存在客户端 Cookie 中。

---

## 自定义与扩展

### 修改目标点击次数

在 [`index.html`](./index.html) 或 [`worker.js`](./worker.js) 中搜索：

```javascript
const TARGET_COUNT = 2026;
```

将其改为想要的数字即可，例如 `100`、`666`、`2027` 等。

### 修改祝福语

- **`index.html`**：编辑 `<script>` 标签内的 `BLESSINGS` 数组。
- **`worker.js`**：编辑文件顶部的 `BLESSINGS` 数组，客户端会自动同步。

建议去除重复条目以减小文件体积。

### 修改主题配色

CSS 变量集中在 `:root` 中：

```css
:root {
  --primary: #FFD700;       /* 金色 */
  --accent: #FF4500;        /* 红色 */
  --bg-dark: #1a0505;       /* 深色背景 */
  --glass: rgba(255,255,255,0.05);
  --glass-border: rgba(255,215,0,0.3);
}
```

### 适配其他年份

将页面标题、目标数字、文案中的“2026”替换为新年的年份即可。

---

## 注意事项

1. **Cookie 的局限性**：
   - 清除浏览器数据会导致进度丢失。
   - 不同设备或浏览器之间进度不同步。
   - 如果需要多端同步，需要额外接入后端数据库。

3. **祝福语重复**：
   `BLESSINGS` 数组末尾存在大量重复的“愿你一生有…”系列句子，建议去重后使用。

4. **外部字体依赖**：
   页面通过 Google Fonts 加载字体，如果访问者网络无法访问 Google Fonts，字体会回退到系统默认字体。

---

## 许可证

本项目基于 [MIT License](./LICENSE) 开源。

版权所有 (c) 2026 瓦吉rui

---

## 致谢

- 灵感与代码贡献：Gemini、ChatGPT、Deepseek
- 字体：Google Fonts（Ma Shan Zheng、Noto Serif SC）
- 托管方案：Cloudflare Workers / GitHub Pages

---

> 愿你 2026 福气满满，万事顺遂，新年快乐！
