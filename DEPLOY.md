# GitHub Pages Deployment

This project is configured to deploy to GitHub Pages using `npm run deploy`.

## Deployment Steps

1. Make sure you have a GitHub repository set up
2. Run the deployment command:
   ```bash
   npm run deploy
   ```

This will:
- Build the project (`npm run build`)
- Deploy the `dist` folder to the `gh-pages` branch
- Make your site available at `https://[username].github.io/[repository-name]`

## Configuration

If your repository is not at the root of GitHub Pages (e.g., `username.github.io/repo-name`), you may need to update the `base` path in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/repository-name/',
  // ... rest of config
});
```

## Notes

- The `dist` folder is in `.gitignore` and will be generated during build
- The `gh-pages` branch will be created/updated automatically
- Make sure to enable GitHub Pages in your repository settings to point to the `gh-pages` branch
