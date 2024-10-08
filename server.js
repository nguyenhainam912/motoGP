
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');

const RiderRoute = require('./routes/rider');
const TeamRoute = require('./routes/team');
const CountryRoute = require('./routes/country');
const CalendarRoute = require('./routes/calendar');
const CalendarRiderRoute = require('./routes/calendarRider');


dotenv.config();

mongoose.connect(process.env.DBURL).then(() => {
    console.log('success')
}).catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use("/api/riders", RiderRoute)
app.use("/api/teams", TeamRoute)
app.use("/api/countries", CountryRoute)
app.use("/api/calendars", CalendarRoute)
app.use("/api/calendarRider", CalendarRiderRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})