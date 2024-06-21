import { useAuth } from "../../context/AuthProvider";

const Orders = () => {
  const { userId } = useAuth();
  return (
    <section className="mt-56">
      <h1>Orders id:{userId}</h1>
    </section>
  );
};

export default Orders;
