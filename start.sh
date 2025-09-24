#!/bin/bash

echo "🚀 启动小道消息验证器..."

# 检查是否存在node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
fi

# 检查是否存在.env文件
if [ ! -f ".env" ]; then
    echo "⚙️  创建环境配置文件..."
    cp env.example .env
    echo "📝 请编辑 .env 文件，填入你的Dify API配置"
    echo "   REACT_APP_DIFY_API_KEY=your_dify_api_key_here"
    echo ""
    echo "按任意键继续启动开发服务器..."
    read -n 1
fi

echo "🌟 启动开发服务器..."
npm start
