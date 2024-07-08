import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../utils/formatters";

const UsersTable = ({ users, handleDelete }) => {
  return (
    <table className="table-auto w-full border border-collapse text-center mt-8 text-sm">
      <thead>
        <tr className="border">
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">E-mail</th>
          <th className="border p-2">Phone</th>
          <th className="border p-2">Zip</th>
          <th className="border p-2">City</th>
          <th className="border p-2">Address</th>
          <th className="border p-2">Registered</th>
          <th className="border p-2">Edit & Delete</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => {
            return (
              <tr className="border odd:bg-rose-50" key={user.id}>
                <td className="border p-3">{user.firstName}</td>
                <td className="border p-3">{user.lastName}</td>
                <td className="border p-3">{user["e-mail"]}</td>
                <td className="border p-3">{user.phone || "-"}</td>
                <td className="border p-3">{user.zip || "-"}</td>
                <td className="border p-3">{user.city || "-"}</td>
                <td className="border p-3">{user.address || "-"}</td>
                <td className="border p-3">{formatDate(user.createdAt)}</td>
                <td className="p-4 flex justify-center gap-6 text-lg">
                  <FaEdit className="cursor-pointer text-rose-600" />
                  <FaRegTrashAlt
                    onClick={() => handleDelete(user.id)}
                    className="cursor-pointer "
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UsersTable;
