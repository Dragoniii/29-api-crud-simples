import express from "express";
const app = express();
app.use(express.json());

const cars = [
];

app.get("/cars", (req, res) => {
  return res.json(cars);
});

app.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  const car = cars.find((car) => Number(car.id) === Number(id));

  if (!car) {
    return res.status(404).json("Car with specified ID not found");
  }

  return res.status(200).json(car);
});

app.post("/newcar", (req, res) => {
  const infoNewCar = req.body;

  let id = 0;
  let idExist;
  do {
    idExist = cars.findIndex((car) => car.id === id);
    if (idExist !== -1) {
      id++;
    }
  } while (idExist !== -1);

  const newCar = {
    id,
    model: infoNewCar.model,
    brand: infoNewCar.brand,
    color: infoNewCar.color,
    year: infoNewCar.year,
    price: infoNewCar.price 
  }

  cars.splice(id, 1, newCar);
  return res.status(201).json(newCar)

});
app.listen(8080, () => console.log("Servidor iniciado"));
