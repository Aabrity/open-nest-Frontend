import { useState, useEffect } from "react";
import { Table, Button } from "flowbite-react";
import { HiTrash } from "react-icons/hi"; // Importing trash icon for delete button

const UsersTablePage = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/admin/Users`);
        const data = await res.json();
        console.log(data);
        setUsers(data);
        if (data.length < 9) setShowMore(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/admin/Users?startIndex=${startIndex}`);
      const data = await res.json();
      setUsers((prev) => [...prev, ...data]);
      if (data.length < 9) setShowMore(false);
    } catch (error) {
      console.error("Error fetching more users:", error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/admin/Users/${userIdToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 bg-white w-full dark:bg-gray-800 ">
      <h2 className="text-3xl font-semibold mb-6 text-black dark:text-white">Users Table</h2>
      {users.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg rounded-lg overflow-hidden">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell className="px-6 text-gray-800 dark:text-gray-200">Avatar</Table.HeadCell>
              <Table.HeadCell className="px-6 text-gray-800 dark:text-gray-200">Name</Table.HeadCell>
              <Table.HeadCell className="px-6 text-gray-800 dark:text-gray-200">Email</Table.HeadCell>
              <Table.HeadCell className="px-6 text-gray-800 dark:text-gray-200">isAdmin</Table.HeadCell>
              <Table.HeadCell className="px-6 text-gray-800 dark:text-gray-200">Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y dark:divide-gray-600">
              {users.map((user) => (
                <Table.Row key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <Table.Cell className="px-6">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.username}'s avatar`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600" />
                    )}
                  </Table.Cell>
                  <Table.Cell className="px-6 font-medium text-gray-900 dark:text-white">{user.username}</Table.Cell>
                  <Table.Cell className="px-6 text-gray-700 dark:text-gray-300">{user.email}</Table.Cell>
                  <Table.Cell className="px-6 text-gray-700 dark:text-gray-300">{user.isAdmin ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell className="px-6">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full"
                    >
                      <HiTrash className="w-6 h-6" />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-blue-500 font-semibold py-4 text-center">
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-lg text-center dark:text-gray-400">No users available.</p>
      )}

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 dark:bg-opacity-80">
          <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
            <h3 className="mb-5 text-lg text-gray-700 dark:text-white">Are you sure you want to delete this user?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, delete it
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTablePage;