const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./database/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');

//import routes
const returnRoutes = require("./routes/returns");
const refundRoutes = require("./routes/refunds");

//Middelware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(returnRoutes);
app.use(refundRoutes);


connectDB();

app.get('/', (req, res) => {
  res.send('Inside server');
})


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
