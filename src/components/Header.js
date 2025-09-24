import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">小道消息验证器</h1>
        <p className="header-subtitle">智能分析消息可信度，助您辨别真假</p>
      </div>
    </header>
  );
};

export default Header;
