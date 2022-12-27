const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Failed to MongoDB')
    }

}

module.exports = { connect };
