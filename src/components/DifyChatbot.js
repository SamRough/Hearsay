import React from 'react';
import './DifyChatbot.css';

const DifyChatbot = () => {
  return (
    <div className="dify-chatbot-container">
      <div className="chatbot-header">
        <h3>鉴别小道消息</h3>
        <p>输入要验证的小道消息：</p>
      </div>
      <div className="chatbot-iframe-wrapper">
        <iframe
          src="https://udify.app/chatbot/7tUaVoPkL1eIeYND"
          style={{ width: '100%', height: '100%', minHeight: '700px' }}
          frameBorder="0"
          allow="microphone"
          title="Dify智能助手"
        />
      </div>
    </div>
  );
};

export default DifyChatbot;
