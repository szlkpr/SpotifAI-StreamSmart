// Test Gemini API connectivity
const GEMINI_API_KEY = 'AIzaSyDNCCKIAxKFds1g14yEvaKeMGuLc_nVlPE';

async function testGeminiAPI() {
    try {
        console.log('Testing Gemini API...');
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Say hello in a cheerful way" }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 50,
                }
            })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`Gemini API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Success! API Response:', data);
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            console.log('Generated text:', data.candidates[0].content.parts[0].text);
        }

    } catch (error) {
        console.error('Test failed:', error);
    }
}

testGeminiAPI();