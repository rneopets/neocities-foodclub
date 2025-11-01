# NeoFoodClub Deployment

Static website deployment to Neocities with automatic minification via GitHub Actions.

## Setup

1. **Get your Neocities API Key:**
   - Log in to your Neocities account
   - Go to your site settings: `https://neocities.org/settings/your-site-name#api_key`
   - Generate or copy your API key

2. **Add GitHub Secret:**
   - Go to your repository on GitHub
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NEOCITIES_API_TOKEN`
   - Value: Your Neocities API key
   - Click "Add secret"

3. **Push to main branch:**
   - The workflow will automatically build, minify, and deploy on every push to `main`
   - You can also manually trigger it via the Actions tab → "Deploy to Neocities" → "Run workflow"

## Local Development

```bash
# Install dependencies
npm install

# Build and minify files locally
npm run build
```

## Build Output

The build script creates a `public/` directory with:
- Minified JavaScript files (`.js` files)
- Minified CSS files (`.css` files)
- Minified HTML files (`.html` files)
- Preserves directory structure (e.g., `15/` subdirectory)

## Files

- `build.js` - Build script that minifies all assets
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automated deployment
- `package.json` - Dependencies and npm scripts
