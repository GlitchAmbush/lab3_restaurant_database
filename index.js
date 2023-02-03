const express = require('express');
const mongoose = require('mongoose');
const restrauntRouter = require('./routes/RestaurantRoutes.js');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://scrungle:pwxTTNE0tpv8pwZS@cluster0.mfenz3g.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

app.use(restrauntRouter);

app.listen(3000, () => { console.log('Server is running...') });