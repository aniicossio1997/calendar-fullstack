import mongoose from "mongoose";
import config from "./config/config";

// export const dbConnection = () => {
//   (async () => {
//     try {
//       const db = await mongoose.connect(
//         `mongodb://${config.DB.MONGO_HOST}/${config.DB.MONGO_DATABASE}`,
//         {
//           user: config.DB.MONGO_USER,
//           pass: config.DB.MONGO_PASSWORD,
//         }
//       );
//       db.connection
//         .on("error", (err) => {
//           console.log(`There was an error connecting to the database: ${err}`);
//         })
//         .once("open", () => {
//           console.log(
//             `You have successfully connected to your mongo database: ${config.DB.MONGO_DATABASE}`
//           );
//         });
//       console.log("Databse is connected to: ", config.DB.MONGO_DATABASE);
//     } catch (error) {
//       console.error(
//         "[ERROR:] No se pudo establecer la conexion co la base de datos"
//       );
//     }
//   })();
// };
(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb://${config.DB.MONGO_HOST}/${config.DB.MONGO_DATABASE}`,
      {
        user: config.DB.MONGO_USER,
        pass: config.DB.MONGO_PASSWORD,
      }
    );
    db.connection
      .on("error", (err) => {
        console.log(`There was an error connecting to the database: ${err}`);
      })
      .once("open", () => {
        console.log(
          `You have successfully connected to your mongo database: ${config.DB.MONGO_DATABASE}`
        );
      });
    console.log("Databse is connected to: ", config.DB.MONGO_DATABASE);
  } catch (error) {
    console.error(
      "[ERROR:] No se pudo establecer la conexion co la base de datos"
    );
  }
})();
