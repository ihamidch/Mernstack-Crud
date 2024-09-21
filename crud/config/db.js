import mongoose from "mongoose";


const connectDB = async ()=>
{
    try
    {
      const conc = await mongoose.connect("mongodb://localhost:27017/cruds");
      console.log(`connected to Mongo DB ${conc.connection.host}`);

    }
    catch(error)
    {
        console.log(`Mongo db connection Error ${error} `);

    }
}
export default connectDB