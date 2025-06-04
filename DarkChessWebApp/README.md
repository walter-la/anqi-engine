# DarkChessWebApp

A web-based Chinese Dark Chess game built with Expo and React Native for Web.

Image and sound assets are not included in this repository. Add your own files
in the `assets/` directory (e.g. `icon.png`, `flip.wav`) when running locally.
Placeholder icons are provided in `assets/placeholders/` so the project can
build without additional images.

## Development

```bash
# install dependencies
yarn install

# run on web
yarn web
```

## Testing

```bash
yarn test
```

## Building

Generate a static build for deployment:

```bash
yarn build
```

The exported site appears in the `web-build/` folder and can be deployed to services like Cloudflare Pages.
