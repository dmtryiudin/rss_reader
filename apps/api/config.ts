export const config = () => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  port: process.env.PORT,
  dbConnectionUrl: process.env.DB_CONNECTION_URL,
  rssFeedUrl: process.env.RSS_FEED_URL,
});
