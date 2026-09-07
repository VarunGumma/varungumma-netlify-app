---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 2
_styles: >
  /* al-folio marks the site author with <em> (italic). Make it bold and
     theme-coloured so it stands out in a long author list. */
  .publications .author em {
    font-style: normal;
    font-weight: 700;
    color: var(--global-theme-color);
  }

  /* Icons inside the link buttons: align to the label and keep an even gap,
     so buttons with and without an icon share the same visual rhythm. */
  .publications .links .btn i {
    margin-right: 0.4em;
    font-size: 0.95em;
    vertical-align: -0.05em;
  }
---

<div class="publications">

{% bibliography %}

</div>
