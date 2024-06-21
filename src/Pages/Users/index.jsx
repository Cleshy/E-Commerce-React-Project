import { useAuth } from "../../context/AuthProvider";

const Users = () => {
  const { userId } = useAuth();

  return (
    <section className="mt-56">
      <h1>Users id: {userId}</h1>
    </section>
  );
};

export default Users;
