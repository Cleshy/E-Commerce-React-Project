import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const UsersTable = ({ users }) => {
  return (
    <table className="table-auto w-full border border-collapse text-center mt-8">
      <thead>
        <tr className="border">
          <th className="border p-2">Name</th>
          <th className="border p-2">E-mail</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Zip</th>
          <th className="border p-2">City</th>
          <th className="border p-2">Address</th>
          <th className="border p-2">Edit & Delete</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => {
            return (
              <tr className="border odd:bg-gray-200" key={user.id}>
                <td className="border p-3">{user.name}</td>
                <td className="border p-3">{user["e-mail"]}</td>
                <td className="border p-3">{user.phone || "-"}</td>
                <td className="border p-3">{user.zip || "-"}</td>
                <td className="border p-3">{user.city || "-"}</td>
                <td className="border p-3">{user.address || "-"}</td>
                <td className="p-4 flex justify-evenly text-2xl">
                  <FaEdit className="cursor-pointer text-rose-600" />
                  <FaRegTrashAlt className="cursor-pointer " />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UsersTable;
