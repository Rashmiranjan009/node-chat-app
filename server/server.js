const path= require('path');
const express= require('express');

var appPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

var app = express();


app.use(express.static(appPath));





app.listen(3000, ()=> {
    console.log(`app started on port ${port}`);
})