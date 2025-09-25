import React from 'react';
import './Header.css';

const Header = ({ onToggleView, showChatbot }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">小道消息验证器</h1>
        <p className="header-subtitle">智能分析消息可信度，助您辨别真假</p>
        <button 
          className="toggle-button"
          onClick={onToggleView}
        >
          {showChatbot ? '切换到分析模式' : '切换到对话模式'}
        </button>
      </div>
    </header>
  );
};

export default Header;
