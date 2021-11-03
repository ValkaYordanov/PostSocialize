import mongoose from "mongoose";
import Post from "./models/post.js";

async function connectDatabase() {
  const connectionString = process.env.MONGODB_URL;

  if (!connectionString) {
    throw new Error(
      "MONGODB_URL not set as environment variable. Please configure it in an .env file."
    );
  }

  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function seedData() {
  const numberOfPosts = await Post.countDocuments();

  if (numberOfPosts == 0) {
    const someData = [{
      'content': 'description1',
      'owner': 'Esperaldo',
      'authorName': 'Valentin',
      'likes': 10,
      'comments':
        [{
          'userName': 'reni',
          'content': 'how are you'
        },
        {
          'userName': 'reni',
          'content': 'how are you'
        }],
      'date': new Date('2014-03-01T08:00:00Z')
    },
    {
      'content': 'description1',
      'owner': 'Esperaldo',
      'authorName': 'Valentin',
      'likes': 20,
      'comments':
        [{
          'userName': 'reni',
          'content': 'how are you'
        },
        {
          'userName': 'reni',
          'content': 'how are you'
        }],
      'date': new Date('2014-03-01T09:00:00Z')
    }];
    Post.insertMany(someData);
  } else {
    console.log("There is data!");
  }
}
export { connectDatabase, seedData };
