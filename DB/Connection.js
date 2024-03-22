import mongoose from "mongoose";
export const Connection = async () => {
    await mongoose.connect(process.env.Url).then(() => {
        console.log((`DataBase connected`));
    }).catch((err) => {
        console.log({ message:("fail connect to db"), err });
    })
}