clindsey/advisor

Dependencies
---
* git
* npm and node

Local Dev
---
Install npm and bower packages:
* `make install`

Start the local development builder which will compile assets as they change:
* `make watch`

Generate a minified version of the css and javascripts
* `make build`

Generated content is placed into `public/` directory
* have your own webserver serve the content from `public/` (I use apache)
