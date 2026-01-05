import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const toggleBlock = async (userId) => {
    await axios.put(
      `http://localhost:5000/api/admin/users/${userId}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setUsers((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => toggleBlock(user._id)}
                  className={`px-3 py-1 rounded text-white ${
                    user.isBlocked ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
              <td className="border p-2">
                {user.isBlocked ? "🚫 Blocked" : "✅ Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
