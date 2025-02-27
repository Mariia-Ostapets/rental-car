export default function CarDetails({ car }) {
  return (
    <section>
      <img src={car.img} alt={car.description} />
    </section>
  );
}
