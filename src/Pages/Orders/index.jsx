import { useAuth } from "../../context/AuthProvider";
import useFetchOrders from "../../hooks/useFetchOrders";
import { formatCurrency, formatOrderDate } from "../../utils/formatters";

const Orders = () => {
  const { isLoggedIn, userId } = useAuth();
  const { orders, loading } = useFetchOrders(userId);

  return (
    <section className="container mx-auto mt-36">
      {!orders ? (
        <div className="text-center flex flex-col gap-8">
          <h2 className="text-[2.5rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
            No Orders Yet
          </h2>
          <p className="font-semibold text-xl">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="text-center flex flex-col gap-8 mb-16">
          <h2 className="text-[2.5rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
            My Orders
          </h2>
          {orders.map((order) => {
            return (
              <div
                className="flex bg-rose-100 p-5 rounded-lg justify-between"
                key={order.id}
              >
                <p className="font-semibold">
                  {formatOrderDate(order.createdAt)}
                </p>
                <p>{`Name: ${order.firstName} ${order.lastName}`}</p>
                <p>Email: {order.email}</p>
                <p>Total Amount: {formatCurrency(order.totalAmount)}</p>
                <a
                  href="#"
                  className="underline text-rose-900 font-semibold text-lg"
                >
                  More
                </a>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Orders;
