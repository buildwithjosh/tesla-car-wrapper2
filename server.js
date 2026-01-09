// server.js - Backend server for Tesla Wrap Creator with Multi-AI support
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Tesla Wrap Creator Multi-AI API is running',
        providers: ['pollinations', 'huggingface', 'openai']
    });
});

// Main generation endpoint - handles all providers
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt, provider, apiKey } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log(`Generating with ${provider}: ${prompt.substring(0, 50)}...`);

        let imageData;

        switch (provider) {
            case 'pollinations':
                imageData = await generateWithPollinations(prompt);
                break;
            
            case 'huggingface':
                if (!apiKey) {
                    return res.status(400).json({ error: 'Hugging Face API key required' });
                }
                imageData = await generateWithHuggingFace(prompt, apiKey);
                break;
            
            case 'openai':
                if (!apiKey) {
                    return res.status(400).json({ error: 'OpenAI API key required' });
                }
                imageData = await generateWithOpenAI(prompt, apiKey);
                break;
            
            default:
                return res.status(400).json({ error: 'Unknown provider' });
        }

        res.json({
            success: true,
            imageData: imageData,
            provider: provider,
            message: 'Image generated successfully'
        });

    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({
            error: 'Failed to generate image',
            message: error.message,
            provider: req.body.provider
        });
    }
});

// Provider-specific generation functions

async function generateWithPollinations(prompt) {
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${Date.now()}`;
    
    // Fetch the image and convert to base64
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Pollinations API error: ${response.status}`);
    }
    
    const buffer = await response.buffer();
    const base64 = buffer.toString('base64');
    return `data:image/png;base64,${base64}`;
}

async function generateWithHuggingFace(prompt, apiKey) {
    // Using Hugging Face Inference Providers
    // FLUX.1-schnell is available through multiple providers
    // We'll use it through the default provider routing
    
    const response = await fetch(
        "https://router.huggingface.co/v1/images/generations",
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                model: "black-forest-labs/FLUX.1-schnell",
                prompt: prompt,
                n: 1,
                size: "1024x1024"
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // The new API returns URLs or base64 data
    if (data.data && data.data[0]) {
        const imageData = data.data[0];
        
        // If it's a URL, fetch and convert to base64
        if (imageData.url) {
            const imageResponse = await fetch(imageData.url);
            const buffer = await imageResponse.buffer();
            const base64 = buffer.toString('base64');
            return `data:image/png;base64,${base64}`;
        }
        
        // If it's already base64
        if (imageData.b64_json) {
            return `data:image/png;base64,${imageData.b64_json}`;
        }
    }
    
    throw new Error('Unexpected response format from Hugging Face API');
}

async function generateWithOpenAI(prompt, apiKey) {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard"
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    
    // Fetch the image from OpenAI's URL and convert to base64
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.buffer();
    const base64 = buffer.toString('base64');
    return `data:image/png;base64,${base64}`;
}

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚗 Tesla Wrap Creator Multi-AI Backend running on port ${PORT}`);
    console.log(`📝 API Endpoints:`);
    console.log(`   GET  /api/health - Health check`);
    console.log(`   POST /api/generate - Generate AI wrap`);
    console.log(`\n🌐 Local: http://localhost:${PORT}`);
});

module.exports = app;
