// AWS Lambda Function for SpotifAI - StreamSmart AI Backend
// Deploy this to AWS Lambda for serverless AI processing

exports.handler = async (event) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse request body
        const { userContent, options = {} } = JSON.parse(event.body || '{}');
        const { temperature = 0.7, max_tokens = 150 } = options;

        // Get Gemini API key from environment variables
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        
        if (!GEMINI_API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API key not configured' })
            };
        }

        // Call Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userContent }]
                }],
                generationConfig: {
                    temperature: temperature,
                    maxOutputTokens: max_tokens,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: errorData.error?.message || 'AI API error' })
            };
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text.trim();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ content: aiResponse })
        };

    } catch (error) {
        console.error('Lambda error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};