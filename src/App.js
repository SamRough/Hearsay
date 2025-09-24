import React, { useState } from 'react';
import './App.css';
import MessageInput from './components/MessageInput';
import AnalysisResult from './components/AnalysisResult';
import Header from './components/Header';
import { analyzeMessageCredibility } from './services/difyApi';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (message) => {
    setIsLoading(true);
    setAnalysisResult(null);
    
    try {
      // 调用Dify API进行消息分析
      const result = await analyzeMessageCredibility(message);
      setAnalysisResult(result);
    } catch (error) {
      console.error('分析失败:', error);
      setAnalysisResult({
        error: error.message || '分析过程中出现错误，请稍后重试。'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <MessageInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        {analysisResult && (
          <AnalysisResult result={analysisResult} />
        )}
      </div>
    </div>
  );
}


export default App;
