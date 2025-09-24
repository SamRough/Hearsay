import axios from 'axios';

// Dify API配置
const DIFY_API_URL = process.env.REACT_APP_DIFY_API_URL || 'https://api.dify.ai/v1';
const DIFY_API_KEY = process.env.REACT_APP_DIFY_API_KEY || '';

// 创建axios实例
const difyApi = axios.create({
  baseURL: DIFY_API_URL,
  headers: {
    'Authorization': `Bearer ${DIFY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 分析消息可信度的函数
export const analyzeMessageCredibility = async (message) => {
  try {
    if (!DIFY_API_KEY) {
      throw new Error('Dify API密钥未配置');
    }

    const response = await difyApi.post('/chat-messages', {
      inputs: {
        message: message
      },
      query: message,
      response_mode: 'blocking',
      user: 'anonymous_user',
    });

    // 解析Dify返回的结果
    const result = parseDifyResponse(response.data, message);
    return result;
  } catch (error) {
    console.error('Dify API调用失败:', error);
    
    // 如果是网络错误或API错误，返回错误信息
    if (error.response) {
      throw new Error(`API错误: ${error.response.data?.message || '未知错误'}`);
    } else if (error.request) {
      throw new Error('网络连接失败，请检查网络设置');
    } else {
      throw new Error('分析过程中出现错误');
    }
  }
};

// 解析Dify API响应
const parseDifyResponse = (response, originalMessage) => {
  try {
    // 从Dify的响应中提取分析结果
    const answer = response.answer || '';
    
    // 这里需要根据你的Dify Agent的具体输出格式来解析
    // 以下是一个示例解析逻辑，你需要根据实际情况调整
    
    // 尝试从回答中提取可信度信息
    const credibilityMatch = answer.match(/可信度[：:]\s*([^\n]+)/i) || 
                           answer.match(/可信[：:]\s*([^\n]+)/i) ||
                           answer.match(/结果[：:]\s*([^\n]+)/i);
    
    const credibility = credibilityMatch ? credibilityMatch[1].trim() : '未知';
    
    // 尝试提取置信度分数
    const confidenceMatch = answer.match(/(\d+)%/i) || 
                           answer.match(/置信度[：:]\s*(\d+)/i);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 75;
    
    // 尝试提取分析说明
    const analysisMatch = answer.match(/分析[：:]([^关键因素]+)/i) ||
                         answer.match(/说明[：:]([^关键因素]+)/i);
    const analysis = analysisMatch ? analysisMatch[1].trim() : 
                    answer.length > 100 ? answer.substring(0, 200) + '...' : answer;
    
    // 尝试提取关键因素
    const factorsMatch = answer.match(/关键因素[：:]([^原始消息]+)/i) ||
                        answer.match(/因素[：:]([^原始消息]+)/i);
    let factors = [];
    if (factorsMatch) {
      factors = factorsMatch[1]
        .split(/[，,、]/)
        .map(factor => factor.trim())
        .filter(factor => factor.length > 0)
        .slice(0, 5); // 最多显示5个因素
    }
    
    // 如果没有提取到因素，使用默认值
    if (factors.length === 0) {
      factors = credibility.includes('可信') || credibility.includes('真实') ? 
        ['信息来源可靠', '内容逻辑合理', '时间线一致'] :
        ['信息来源不明', '内容存在矛盾', '缺乏具体细节'];
    }
    
    return {
      message: originalMessage,
      credibility: credibility,
      confidence: Math.min(Math.max(confidence, 0), 100),
      analysis: analysis,
      factors: factors,
      rawResponse: answer // 保存原始响应用于调试
    };
  } catch (error) {
    console.error('解析Dify响应失败:', error);
    throw new Error('解析分析结果时出现错误');
  }
};

// 测试API连接
export const testDifyConnection = async () => {
  try {
    const response = await difyApi.get('/parameters');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default difyApi;
