# Operations and Automation

This project does not include a product dashboard or authentication layer. It is a static, content-first site.

## Automation
- App metadata refresh runs biweekly via GitHub Actions.
- n8n publishes new blog posts by committing Markdown into `src/content/blog/`.

## Monitoring
- Cloudflare Pages builds on every push to `main`.
- Check Actions logs for scheduled data updates and failures.
