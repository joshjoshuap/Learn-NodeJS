const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // middleware to parse incoming json

// app.get('/', (req, res) => {
//   // res.status(200).send('Hello World!');
//   res.status(200).json({ message: 'Hello World!', app: 'Express' });
// });

// app.post('/', (req, res) => {
//   res.send('Post request');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// READ
app.get('/api/v1/tours/:id', (req, res) => {
  // console.log(req.params); // parameters of url
  const id = req.params.id;

  if (id > tours.length) {
    console.log('Invalid ID');
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id == id);

  // console.log(tours);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// CREATE
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1; // get the last id and add 1 to create a new id
  const newTour = Object.assign({ id: newId }, req.body); // create a new object with the new id and the body of the request

  tours.push(newTour); // add the new tour to the tours array
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  ); // write the new tour to the file and send the response with the new tour object and status 201 (created) and the new id in the response body
});

// UPDATE
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length) {
    console.log('Invalid ID');
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
});

// DELETE
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length) {
    console.log('Invalid ID');
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
