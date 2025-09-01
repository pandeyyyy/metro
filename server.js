require('dotenv').config();

const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stationRoute = require('./routes/stationRoute.js');
const authRoute = require('./routes/authRoute.js');
const g=require('./makeGraph.js');
const root= require('./makeTrie.js');


const app = express();
const PORT = process.env.PORT || 8000;

// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    req.adjacencyList = g.adjacencyList;
    req.stations = g.stations;
    req.root=root;
    next();
});

app.get('/', (req,res) => {
    res.send("Hello from the backend");
});

app.use('api/v1/auth', authRoute)

app.use('/api/v1/', stationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
            
