## How to run project

Set .env variables for API

```bash
  JWT_SECRET_KEY
  PORT
  DB_CONNECTION_URL // For MongoDB
  RSS_FEED_URL
```

Run project in dev mode

```bash
  //From "/"
  npm i
  npm run dev /* Starts frontend and
              /* backend
```

## Additional info

Admin panel URL is /admin

To save time, you can utilize the configuration that was used during development. I have already created several articles in this DB.

```bash
JWT_SECRET_KEY=bggeggnntrnegvnyntnytnytyntntrn
PORT=3000
DB_CONNECTION_URL=mongodb+srv://dmtryiudin:HQ1JVuPLhCX3xXo8@cluster0.ab0qkix mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
RSS_FEED_URL=https://netflixtechblog.com/feed
```

There is a created admin account too.

Admin login:admin  
Admin password: $$AdMiN_12345$$
