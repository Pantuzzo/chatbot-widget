# Developer Guide

This guide is for developers contributing to the Hello CLI Chatbot Widget project.

## Project Structure

```
hello-cli-chatbot-widget/
├── app/                    # Demo Next.js app
├── components/             # Core React components
│   ├── chatbot/            # Main chatbot components
│   ├── message/            # Message display components 
│   └── ui/                 # UI components from shadcn/ui
├── dist/                   # Built library output
├── dist-webview/           # WebView build output
├── hooks/                  # React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets
├── scripts/                # Build & deployment scripts
├── stories/                # Storybook stories
├── styles/                 # Global CSS styles
├── types/                  # TypeScript type definitions
└── webview/                # WebView implementation files
```

## Development Workflow

### Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm dev`

### Building

- Library build: `pnpm build`
- WebView build: `pnpm build:webview`

### Testing

- Run tests: `pnpm test`
- Test with coverage: `pnpm test:coverage`
- Run linting: `pnpm lint`

### Documentation

- Storybook: `pnpm storybook`

## CSS Styling

This project uses Tailwind CSS with a custom prefix `hello-cli-` to avoid conflicts. All CSS classes should use this prefix.

### CSS Variables

Core styles are defined as CSS variables in `components/index.css`:

```css
:root {
  --hello-cli-primary: 222.2 47.4% 11.2%;
  --hello-cli-background: 0 0% 100%;
  --hello-cli-foreground: 222.2 47.4% 11.2%;
  /* ... additional variables */
}
```

## WebView Development

When developing for WebView:

1. Make changes to the component
2. Build the WebView version: `pnpm build:webview`
3. Test using the demo HTML in `dist-webview/index.html`

See [WebView Implementation Guide](./docs/WEBVIEW_IMPLEMENTATION.md) for details.

## Commit Guidelines

Follow conventional commits format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc)
- `refactor:` Code changes that neither fix bugs nor add features
- `test:` Adding or updating tests
- `chore:` Changes to the build process or auxiliary tools

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a release commit: `git commit -m "chore: release v1.x.x"`
4. Create a git tag: `git tag v1.x.x`
5. Push changes: `git push && git push --tags`
6. Build and publish: `pnpm build && pnpm publish`

## Additional Resources

- [Contributing Guidelines](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
