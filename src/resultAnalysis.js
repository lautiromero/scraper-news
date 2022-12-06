import mongoose from "mongoose";
import { mongoUri } from "./data.js";
import News from './models/News.js';

const connectOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// DB connection
mongoose
  .connect(mongoUri, connectOpt)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export const compareAndSaveResults = dataObj => {
  try {
    News.find({})    
      .then(newsList => {
        if (newsList == '') {
          console.log(`A new data was created:\n${JSON.stringify(dataObj)}`)
          // Create a Model Object
          const newNews = new News(dataObj);
          // Return the objet and store it
          return newNews.save().catch(e => console.log(e));
        }

        const { amount, publishedNews } = dataObj;

        const dbId = newsList[0]._id;
        const dbAmount = newsList[0].amount;
        const dbNews = newsList[0].publishedNews;

        let catchDifference = false;

        // Check the news amount and check if the news are the same
        if (dbAmount !== amount) {
          catchDifference = true;
        } else {
          dbNews.forEach((news, i) => {
            if (news !== publishedNews[i]) catchDifference = true;
          })
        }

        if (catchDifference) {
          console.log('A new evidence was found, updating database...');
          // notifyUser(email, publishedNews)
          
          mongoose.set('useFindAndModify', false);
          return News.findOneAndUpdate({ _id: dbId }, dataObj);
        } else {
          console.log('File is equal to page, no news to report.');
        }
      })
      .then(() => mongoose.disconnect())
      .catch(e => console.log(e));
  } catch (err) {
    console.log(err); 
  }
}
