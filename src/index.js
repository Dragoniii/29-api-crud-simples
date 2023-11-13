import express from "express";
const app = express();
app.use(express.json());

const cars = [];

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
    price: infoNewCar.price,
  };

  cars.push(newCar);
  return res.status(201).json(newCar);
});

app.put("/updatecar/:id", (req, res) => {
  const infoUpdateCar = req.body;
  const params = req.params;

  const carToUpdate = cars.findIndex((car) => car.id === Number(params.id));

  const carUpdated = {
    id: Number(params.id),
    model: infoUpdateCar.model,
    brand: infoUpdateCar.brand,
    color: infoUpdateCar.color,
    year: infoUpdateCar.year,
    price: infoUpdateCar.price,
  };

  cars[carToUpdate] = carUpdated;
  return res.status(201).json(carUpdated);
});

app.delete("/delete/:id", (req, res) => {
  const params = req.params;

  const carToDelete = cars.findIndex((car) => car.id === Number(params.id));

  cars.splice(carToDelete, 1);

  return res.status(201).json("Car deleted successfully");
});

app.listen(8080, () => console.log("Servidor iniciado"));
