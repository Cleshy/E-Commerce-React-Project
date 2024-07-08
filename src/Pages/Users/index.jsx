import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import UsersTable from "./UsersTable";
import { useMessage } from "../../context/MessageProvider";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const { showMessage } = useMessage();

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showMessage(true, "success", "User deleted successfully!");
        getUsers();
      } else {
        showMessage(true, "error", "Something went wrong!");
      }
    } catch (error) {
      showMessage(true, "error", `Error deleting user: ${error}`);
    }
  };

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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="my-36 container mx-auto">
      <h2 className="text-[2.5rem] font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-rose-700">
        Users
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <UsersTable users={users} handleDelete={handleDelete} />
      )}
    </section>
  );
};

export default Users;
