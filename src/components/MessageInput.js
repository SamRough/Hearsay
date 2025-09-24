import React, { useState } from 'react';
import './MessageInput.css';

const MessageInput = ({ onAnalyze, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onAnalyze(message.trim());
    }
  };

  const handleClear = () => {
    setMessage('');
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-group">
          <label htmlFor="message" className="input-label">
            请输入要验证的小道消息：
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="在此输入您听到的小道消息..."
            className="message-textarea"
            rows="6"
            disabled={isLoading}
            maxLength={1000}
          />
          <div className="input-footer">
            <span className="char-count">{message.length}/1000</span>
            <div className="button-group">
              <button
                type="button"
                onClick={handleClear}
                className="clear-button"
                disabled={isLoading || !message.trim()}
              >
                清空
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading || !message.trim()}
              >
                {isLoading ? '分析中...' : '开始分析'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
