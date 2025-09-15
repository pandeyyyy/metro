require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/authRoute')
const stationRoute = require('./routes/stationRoute')
const adminRoute = require('./routes/adminRoute')

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'metro-rf.vercel.app'],
  credentials: true
}));

// app.use((req, res, next) => {
//     req.adjacencyList = g.adjacencyList;
//     req.stations = g.stations;
//     req.root = root;
//     next();
// });

app.get('/', (req, res) => {
    res.send("Hello from the backend");
});

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/', stationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});