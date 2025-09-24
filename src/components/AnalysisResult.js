import React from 'react';
import './AnalysisResult.css';

const AnalysisResult = ({ result }) => {
  if (result.error) {
    return (
      <div className="analysis-result error">
        <div className="result-header">
          <h3>分析失败</h3>
        </div>
        <div className="error-message">
          {result.error}
        </div>
      </div>
    );
  }

  const isCredible = result.credibility === '可信';
  const confidenceColor = result.confidence >= 80 ? '#28a745' : result.confidence >= 60 ? '#ffc107' : '#dc3545';

  return (
    <div className="analysis-result">
      <div className="result-header">
        <h3>分析结果</h3>
        <div className={`credibility-badge ${isCredible ? 'credible' : 'not-credible'}`}>
          {result.credibility}
        </div>
      </div>
      
      <div className="result-content">
        <div className="confidence-section">
          <div className="confidence-label">可信度评分</div>
          <div className="confidence-bar">
            <div 
              className="confidence-fill"
              style={{ 
                width: `${result.confidence}%`,
                backgroundColor: confidenceColor
              }}
            />
          </div>
          <div className="confidence-value" style={{ color: confidenceColor }}>
            {result.confidence}%
          </div>
        </div>

        <div className="analysis-section">
          <h4>分析说明</h4>
          <p className="analysis-text">{result.analysis}</p>
        </div>

        <div className="factors-section">
          <h4>关键因素</h4>
          <div className="factors-list">
            {result.factors.map((factor, index) => (
              <div key={index} className={`factor-item ${isCredible ? 'positive' : 'negative'}`}>
                <span className="factor-icon">
                  {isCredible ? '✓' : '⚠'}
                </span>
                <span className="factor-text">{factor}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="original-message">
          <h4>原始消息</h4>
          <div className="message-content">
            "{result.message}"
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
