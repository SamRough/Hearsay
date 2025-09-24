# 小道消息验证器

一个基于React和Dify AI的智能小道消息可信度分析工具。

## 功能特性

- 🔍 智能分析小道消息的可信度
- 📊 提供详细的可信度评分和分析说明
- 🎯 识别关键因素和风险点
- 📱 响应式设计，支持移动端
- 🚀 现代化的用户界面

## 技术栈

- **前端**: React 18
- **样式**: CSS3 (渐变背景、毛玻璃效果)
- **AI服务**: Dify API
- **HTTP客户端**: Axios

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 文件为 `.env`：

```bash
cp env.example .env
```

编辑 `.env` 文件，填入你的Dify API配置：

```env
REACT_APP_DIFY_API_URL=https://api.dify.ai/v1
REACT_APP_DIFY_API_KEY=your_dify_api_key_here
```

### 3. 启动开发服务器

```bash
npm start
```

应用将在 http://localhost:3000 启动。

## Dify Agent配置

为了获得最佳的分析效果，建议在Dify中配置一个专门用于消息可信度分析的Agent，包含以下功能：

### 建议的Agent提示词模板

```
你是一个专业的消息可信度分析专家。请分析用户提供的小道消息，并给出可信度评估。

分析要求：
1. 评估消息的可信度（可信/不可信/存疑）
2. 给出0-100的置信度分数
3. 提供详细的分析说明
4. 列出关键因素（支持或质疑消息可信度的要点）

输出格式：
可信度：[可信/不可信/存疑]
置信度：[0-100]%
分析：[详细分析说明]
关键因素：[列出3-5个关键因素，用逗号分隔]

请基于以下维度进行分析：
- 信息来源的可靠性
- 内容的逻辑性和一致性
- 时间线的合理性
- 细节的完整性和准确性
- 与其他已知信息的对比
```

### API端点配置

确保你的Dify Agent配置了正确的API端点：
- 使用 `chat-messages` 端点
- 设置 `response_mode` 为 `blocking`
- 配置适当的输入参数

## 项目结构

```
src/
├── components/          # React组件
│   ├── Header.js       # 页面头部
│   ├── MessageInput.js # 消息输入组件
│   └── AnalysisResult.js # 分析结果展示
├── services/           # API服务
│   └── difyApi.js     # Dify API集成
├── App.js             # 主应用组件
├── App.css            # 主应用样式
├── index.js           # 应用入口
└── index.css          # 全局样式
```

## 部署

### 构建生产版本

```bash
npm run build
```

### 部署到静态托管服务

构建完成后，`build` 文件夹包含了所有静态文件，可以部署到：

- Vercel
- Netlify
- GitHub Pages
- 任何静态文件服务器

## 自定义配置

### 修改样式主题

在 `src/index.css` 中修改渐变背景：

```css
body {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### 调整API响应解析

在 `src/services/difyApi.js` 中的 `parseDifyResponse` 函数中修改解析逻辑，以适应你的Dify Agent的输出格式。

## 故障排除

### 常见问题

1. **API调用失败**
   - 检查Dify API密钥是否正确
   - 确认API URL是否正确
   - 检查网络连接

2. **分析结果解析错误**
   - 检查Dify Agent的输出格式
   - 调整 `parseDifyResponse` 函数中的正则表达式

3. **样式显示异常**
   - 清除浏览器缓存
   - 检查CSS文件是否正确加载

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License
