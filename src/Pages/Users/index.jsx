import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import UsersTable from "./UsersTable";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const users = await response.json();
        setUsers(users);
        setLoading(false);
      } catch (error) {}
    };

    getUsers();
  }, []);

  return (
    <section className="mt-36 container mx-auto">
      <h2 className="text-[2.5rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
        Users
      </h2>
      {loading ? <Loading /> : <UsersTable users={users} />}
    </section>
  );
};

export default Users;
