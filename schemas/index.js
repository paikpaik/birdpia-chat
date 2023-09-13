const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NOED_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@birdpia-chat.ztm3jhu.mongodb.net/BirdpiaChat`,
    {
      dbName: "birdpia-chat",
      useNewUrlParser: true,
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};
