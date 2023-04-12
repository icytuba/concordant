const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/concordant_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log("Established a connection to the database") )
    .catch( err => console.log("Error connecting to the database: ", err) );

