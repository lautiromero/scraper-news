import {} from "dotenv/config"

const pageUrl = 'https://www.hltv.org/';

const mongoUri = process.env.MONGOURI;

export {
  pageUrl,
  mongoUri
}