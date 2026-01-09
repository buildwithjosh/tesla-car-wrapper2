# Tesla Custom Wrap Creator - Multi-AI Backend Version

AI-powered Tesla custom wrap creator with support for multiple AI providers: Pollinations.ai, Hugging Face FLUX, and OpenAI DALL-E.

## 🚀 Quick Deploy to Vercel (5 Minutes)

### Prerequisites
- GitHub account
- Vercel account (free) - sign up at https://vercel.com

### Deployment Steps

#### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Upload all files from this project
   - Commit and push

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect the configuration
   - Click "Deploy"

3. **Done!**
   - Your app will be live at `https://your-project.vercel.app`
   - All AI providers will work!

#### Method 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project folder
cd tesla-wrap-creator-backend

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? tesla-wrap-creator (or your choice)
# - Directory? ./
# - Override settings? No

# Your app is now live!
```

## 📁 Project Structure

```
tesla-wrap-creator-backend/
├── server.js              # Express backend with AI providers
├── package.json           # Dependencies
├── vercel.json           # Vercel configuration
├── public/
│   └── index.html        # Frontend app
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## 🔧 Local Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

The app will be available at `http://localhost:3000`

### Testing Locally

1. Start the server: `npm start`
2. Open browser: `http://localhost:3000`
3. Select an AI provider
4. Enter API keys (if required)
5. Generate wraps!

## 🎨 AI Providers

### 1. Pollinations.ai (Free, No Setup)
- **API Key**: Not required
- **Cost**: Free
- **Quality**: Good
- **Setup**: None!

### 2. Hugging Face FLUX (Free)
- **API Key**: Required (free)
- **Cost**: Free with rate limits
- **Quality**: Excellent
- **Get Key**: https://huggingface.co/settings/tokens
  1. Sign up at Hugging Face
  2. Go to Settings → Access Tokens
  3. Create new token (Read access)
  4. Copy and paste into app

### 3. OpenAI DALL-E 3 (Paid)
- **API Key**: Required
- **Cost**: ~$0.04 per image
- **Quality**: Excellent
- **Get Key**: https://platform.openai.com/api-keys
  1. Sign up at OpenAI
  2. Add payment method
  3. Create API key
  4. Copy and paste into app

## 🔐 Security Notes

### API Keys
- API keys are sent to YOUR backend (not stored anywhere)
- Keys are NOT saved in browser
- Keys are NOT logged on the server
- Use environment variables for any preset keys

### Environment Variables (Optional)
If you want to provide default API keys, add to Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add:
   - `HUGGINGFACE_API_KEY` (optional)
   - `OPENAI_API_KEY` (optional)

Update server.js to use them:
```javascript
const HF_KEY = process.env.HUGGINGFACE_API_KEY || apiKey;
```

## 🌐 Deployment Platforms

### Vercel (Recommended)
- **Pros**: Easiest, auto-deploys from GitHub, free SSL
- **Free Tier**: Very generous
- **Deploy**: Connect GitHub repo

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Railway
- Connect GitHub repo
- Auto-deploys on push
- Free tier available

### Render
- Connect GitHub repo
- Set build command: `npm install`
- Set start command: `npm start`

## 📋 GitHub File Names

When uploading to GitHub, use these exact names:

```
server.js          (the backend server)
package.json       (dependencies)
vercel.json        (Vercel config)
README.md          (this file)
.gitignore         (Git ignore)
public/
  └── index.html   (the frontend app)
```

## 🐛 Troubleshooting

### "Failed to fetch" error
- **Cause**: Backend not running or wrong API endpoint
- **Fix**: Check that server is running and API_BASE url is correct

### "API key required" error
- **Cause**: Missing API key for Hugging Face or OpenAI
- **Fix**: Enter your API key in the app

### "CORS error"
- **Cause**: Usually only in local development
- **Fix**: Make sure CORS is enabled in server.js (it is by default)

### "Module not found" error
- **Cause**: Dependencies not installed
- **Fix**: Run `npm install`

### Vercel deployment fails
- **Cause**: Missing vercel.json or incorrect Node version
- **Fix**: Ensure vercel.json exists and Node >= 14

## 🎯 Features

- ✨ **Multi-Provider AI**: Choose between 3 AI services
- 🚗 **All Tesla Models**: Model 3, Y, Cybertruck, etc.
- 🎨 **Smart Prompts**: Auto-optimized for vehicle wraps
- 📏 **Spec Compliant**: Meets all Tesla requirements
- 🔄 **Adjustable**: Scale and position your design
- ⬇️ **Download Ready**: PNG under 1MB, ready for Tesla

## 📞 Support

### Common Questions

**Q: Do I need to pay for hosting?**
A: No! Vercel's free tier is more than enough for personal use.

**Q: Which AI provider should I use?**
A: Start with Pollinations (free, no setup). Upgrade to Hugging Face for better quality (still free!).

**Q: Can I use this commercially?**
A: Check each AI provider's terms. Hugging Face and Pollinations are fine for commercial use.

**Q: How do I update the app?**
A: Push changes to GitHub - Vercel auto-deploys!

## 📝 License

MIT License - Feel free to use and modify!

## 🙏 Credits

- Tesla for custom wrap templates
- Pollinations.ai for free AI generation
- Hugging Face for FLUX model
- OpenAI for DALL-E

---

**Happy Wrapping! 🚗✨**
