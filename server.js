import express from 'express';
// import routers
// import middleware

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.use(express.static('public')); // middleware per static files
app.use(express.json()); // middleware interprete

// inserire il router 

//inserire altri middleware es. errorHandler, notFound

app.listen(port, (error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`server attivo alla porta ${port}`);
    

});