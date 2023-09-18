import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://dishantmrt02:pass1122@cluster4.ofuwlfw.mongodb.net/'
        );

        console.log('mongodb is connected')
    } catch (e) {
        console.log(e);
    }
};

export default connectToDB;
