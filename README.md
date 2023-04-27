# Alba Typescript starter

A generative token project on the Alba platform

Features:

- Live reload
- Forced hash/seed value
- Typescript support
- Exports to a single file like Alba expects
- Exports it straight to your clipboard if you're on MacOS!

## Installation

Clone/copy/download this repo. Then:

`yarn` or `npm install`

## Development

`yarn start` or `npm start`

A live preview will appear at [http://localhost:8080/](http://localhost:8080/). It reloads automatically when you save your script.

The entry point is `src/index` (`.js` and `.ts` will both work) – it gets compiled and added to a preview webpage.

### Using a fixed seed

You can specify a seed to be used by indicating it as a URL parameter:

`http://localhost:8080/?seed=0x29d9e4fe94da514aaaf5c006669b4acfce4c05dff4369c17dd94ee83dee37d60`

## Build/usage

`yarn build` or `npm build` will output a single `bundle.js` file to `/dist`. You can copy its content in Alba's script input.

If you're on Mac, you can use `yarn clipboard` to build the script and copy it directly to your clipboard.
