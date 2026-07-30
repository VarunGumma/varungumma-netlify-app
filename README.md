# varungumma.netlify.app

Personal academic website — built with [Jekyll](https://jekyllrb.com/) and the
[al-folio](https://github.com/alshedivat/al-folio) theme, deployed on Netlify.

## Content

| Path | What lives there |
| --- | --- |
| `_pages/about.md` | Bio and the about page front matter |
| `_news/` | News items (one file per entry, `inline: true`) |
| `_bibliography/papers.bib` | Publications — entries taken verbatim from the publisher of record |
| `_posts/` | Blog posts |
| `_data/socials.yml` | Social links shown in the navbar |
| `assets/pdf/CV.pdf` | CV, served at `/cv/` |

## Local development

The theme ships as the `al_folio_core` gem, so `_layouts`, `_includes` and
`_sass` live inside the gem rather than in this repo.

```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"   # Homebrew Ruby; system Ruby is too old
bundle install
bundle exec jekyll serve
```

## Local overrides of theme files

These shadow the gem's versions and will **not** pick up upstream changes when
al-folio is updated — re-sync them by hand after a theme bump:

- `_layouts/bib.liquid` — publication buttons: a single `Paper` link driven by
  each entry's `url` (with a venue-specific icon), plus `Code` and `HF`.
  The upstream DOI, Abs, HTML, PDF and Bib buttons are removed.
- `assets/js/theme.js` — two-state light/dark toggle; upstream also cycles
  through a third "system" setting.

Page-scoped CSS lives in `<style>` blocks in `_pages/about.md`,
`_pages/publications.md` and the blog post, because the gem exposes no
custom-stylesheet hook.

## Deployment

Netlify builds with `bundle exec jekyll build` and publishes `_site`
(see `netlify.toml`).
