# time-tracking backend

## Methods

- POST users - sign up
- `POST login` - get a JWT token
- `POST services` - create a new time-tracking session
- `GET services` - list all your time-tracking session
- `PATCH services/{id}` - updates an existing time-tracking session
- `DELETE services/{id}` -  deletes an existing time-tracking session

## Setup

```bash
yarn # or npm install
yarn dev # or npm run dev
```

## Run service offline

```bash
serverless offline start
```
or just use the shorthand
```bash
yarn dev
```

## Deployment

run `sls deploy` at the root the `back` folder
