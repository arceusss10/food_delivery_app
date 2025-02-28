const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://mernapp:098765%40Aks@cluster0.cfw0ghv.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

module.exports = async function () {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        const foodCollection = mongoose.connection.db.collection('foodcollections');
        const foodItems = await foodCollection.find({}).toArray();

        const categoryCollection = mongoose.connection.db.collection("foodcategories");
        const categories = await categoryCollection.find({}).toArray();

        global.food_items = foodItems;
        global.foodCategory = categories;

        console.log(foodItems);
        console.log(categories);

        return { foodItems, categories };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
