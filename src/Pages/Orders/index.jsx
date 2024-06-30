import { useAuth } from "../../context/AuthProvider";

const Orders = () => {
  const { userId } = useAuth();
  return (
    <section className="container mx-auto mt-36">
      <div className="text-center flex flex-col gap-8">
        <h2 className="text-[2.5rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
          No Orders Yet
        </h2>
        <p className="font-semibold text-xl">
          You haven't placed any orders yet.
        </p>
      </div>
    </section>
  );
};

export default Orders;
