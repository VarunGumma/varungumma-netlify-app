---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 3
description:
# `title` is still needed for the navbar label and the browser tab, but the
# layout also prints it as an <h1>; hide that so the page is just the PDF.
_styles: >
  .post-header {
    display: none;
  }
---

<object data="{{ '/assets/pdf/CV.pdf' | relative_url }}" type="application/pdf" width="100%" height="1000px" style="border: 1px solid var(--global-divider-color); border-radius: 6px;">
  <p>
    Your browser cannot display embedded PDFs.
    <a href="{{ '/assets/pdf/CV.pdf' | relative_url }}" target="_blank" rel="noopener">Open the CV in a new tab</a>.
  </p>
</object>
