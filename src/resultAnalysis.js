import mongoose from "mongoose";
import { mongoUri } from "./data.js";
import News from './models/News.js';

const connectOpt = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Realizamos la conexion a la db
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
          // Creamos un objeto modelado con la data
          const newNews = new News(dataObj);
          // Retornamos el objeto y lo almacenamos
          return newNews.save().catch(e => console.log(e));
        }

        const { amount, publishedNews } = dataObj;

        const dbId = newsList[0]._id;
        const dbAmount = newsList[0].amount;
        const dbNews = newsList[0].publishedNews;

        let catchDifference = false;

        // Chequeamos si la cantidad de notas en la db o alguna nota es diferente a las actuales
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
