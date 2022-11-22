import webScrapper from "./webScraper.js";
import { pageUrl } from "./data.js"
import { compareAndSaveResults } from "./resultAnalysis.js";


webScrapper(pageUrl)
  .then(dataObj => compareAndSaveResults(dataObj))
  .catch(console.error)