After 2 redesigns and 3 rebuilds I think I’ve finally got a portfolio that I’m content with… for now.  Its true how designers says they’re their own worst clients. Here’s some information about what lies under the hood.

## Build
This portfolio is built in Jekyll. I’m using a gulp workflow for browser sync, compiling the css, and concatenating/minifying the JS. You can view it here.

## Framework
The site is built with [Tachyons](http://tachyons.io/)  - an atomic CSS framework that enables for fast prototyping and writing as little CSS as possible.  

## Typography
Headings are typeset in Lyon Display from the [Commercial Type Foundry](https://commercialtype.com/catalog/lyon/lyon_display)  and hosted locally.

Paragraph text is set in system fonts so the typeface you see will depend on what platform you’re viewing this on. I’m on a mac, so I see Apple’s system font, San Francisco.

Why system fonts? Well, for speed mostly, but they also look great so I don’t think  I’m sacrificing design for performance.

## Hosting
The site is hosted for free on Github pages. SSL cert is provided via Cloudflare.

## Assets
Images are hosted locally and loaded dynamically using [lazysizes.js](https://github.com/aFarkas/lazysizes).  Icons are loaded via an SVG sprite in the document header.  The font face is also hosted locally and loaded dynamically using [FontFaceObserver](https://github.com/bramstein/fontfaceobserver) and uses `localstorage` to cache the font call.
