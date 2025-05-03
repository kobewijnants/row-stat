# Row Stat

A web application for tracking and analyzing rowing statistics.

## Features

- View rowing statistics in a dashboard format
- Filter activities by various metrics
- Visualize data through interactive charts
- Responsive design for mobile and desktop

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

## Deployment

This application is automatically deployed to GitHub Pages using GitHub Actions. The deployment process:

1. Builds the application with production settings
2. Deploys to the `gh-pages` branch
3. Makes the application available at `https://[your-username].github.io/row-stat/`

### Manual Deployment

To deploy manually:

1. Build the application:
   ```bash
   npm run build -- --configuration production --base-href="/row-stat/"
   ```
2. Deploy to GitHub Pages using the `gh-pages` package:
   ```bash
   npx angular-cli-ghpages --dir=dist/row-stat
   ```

## License

MIT
