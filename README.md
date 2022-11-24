# Microservices

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/remirex/microservices2023.git
cd microservices2023
npx rimraf ./.git
```

Install the dependencies:

```bash
yarn install
```
Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn local
```