export default function CarDetails({ car }) {
  console.log(car);
  return <img src={car.img} alt={car.description} />;
}
