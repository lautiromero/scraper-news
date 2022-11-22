import puppeteer from "puppeteer";

const webScrapper = async url => {
  const browser = await puppeteer.launch({headless: true});

  const page = await browser.newPage();

  let dataObj = {};

  try {
    await page.goto(url);

    const publishedNews = await page.evaluate(() => {
      const newsDOM  = document.querySelectorAll(".standard-box.standard-list > a");

      let newsList = [];

      newsDOM.forEach(linkEl => {
        const currentNew = linkEl.querySelector('.newstext').innerText;
        newsList.push(currentNew);
      })
      
      return newsList;
    })

    dataObj = {
      amount: publishedNews.length,
      publishedNews
    }

  } catch(e) {
    console.log(e); 
  }

  console.log(dataObj);
  browser.close();
  return dataObj;
}

export default webScrapper