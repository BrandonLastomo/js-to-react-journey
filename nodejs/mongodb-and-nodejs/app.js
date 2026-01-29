const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "student-datas";

async function run() {
  const client = new MongoClient(url);

  try {
    // crud
    await client.connect();
    const db = client.db(dbName);

    // // create
    // const result = await db.collection("student").insertOne({
    //   name: "baron forger",
    //   phone: "085699998888",
    // });

    // read all
    const result = await db
      .collection("student")
      .find()
      .toArray((error, result) => {
        console.log(result);
      });

    // // read with condition
    // const result = await db
    //   .collection("student")
    //   .find({ name: "baron forger" })
    //   .toArray((error, result) => {
    //     console.log(result);
    //   });

    // update
    // await db.collection("student").updateOne(
    //   {
    //     name: "baron forger",
    //   },
    //   {
    //     $set: {
    //       name: "baronFL",
    //     },
    //   },
    // );

    // // delete
    await db.collection("student").deleteOne({
      name: "baronFL",
    });

    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
