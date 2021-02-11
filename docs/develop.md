# Develop Ku-nya Unofficial

You can develop and test `Ku-nya` on your computer by following these steps.

> Note: `Ku-nya` uses TypeScript to provide autocompletion and liting when developing. Use an IDE like **Visual Sudio Code** for TypeScript autocompletion.

## Setup

- Fork the `Ku-nya` repository
- Clone it to your device

```bash
git clone https://github.com/<your-github-username>/Ku-nya.git
cd Ku-nya
```

- Install dependencies: `yarn install`

## After making a change

Run `yarn build` and load `release/` directory from `Load Unpacked` in Chrome.

For trial and error, it is convenient to use `yarn dev` to automatically rebuild.

## Lint

- Use `yarn typecheck` to find type errors.
- Use `yarn lint` to find common style errors.
- Use `yarn fix` to fix errors that can be fixed automatically.
