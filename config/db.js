const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Backend", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected to the database!') })
    .catch((error) => { console.error('Error connecting to the database', error); });