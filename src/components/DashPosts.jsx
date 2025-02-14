import { useState, useEffect } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

const ListingsTablePage = () => {
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [listingIdToDelete, setListingIdToDelete] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/listing/get`);
        const data = await res.json();
        console.log(data);
        setListings(data);
        if (data.length < 9) setShowMore(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    fetchListings();
  }, []);

  const handleShowMore = async () => {
    const startIndex = listings.length;
    try {
      const res = await fetch(`/api/listing/get?startIndex=${startIndex}`);
      const data = await res.json();
      setListings((prev) => [...prev, ...data]);
      if (data.length < 9) setShowMore(false);
    } catch (error) {
      console.error("Error fetching more listings:", error);
    }
  };

  const handleDeleteListing = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/listing/delete/${listingIdToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setListings((prev) => prev.filter((listing) => listing._id !== listingIdToDelete));
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <div className="p-6 bg-white w-full dark:bg-gray-800 ">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Listings Table</h2>
      {listings.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg rounded-lg overflow-hidden">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Image</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Name</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Last Updated</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Address</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Type</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Regular Price</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Discounted Price</Table.HeadCell>
              <Table.HeadCell className="px-5 text-gray-800 dark:text-gray-200">Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {listings.map((listing) => (
                <Table.Row key={listing._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <Table.Cell className="px-5">
                    <img src={listing.imageUrls[0]} alt={listing.name} className="w-20 h-12 object-cover rounded" />
                  </Table.Cell>
                  <Table.Cell className="px-5 font-medium text-gray-900 dark:text-gray-100">{listing.name}</Table.Cell>
                  <Table.Cell className="px-5 text-gray-700 dark:text-gray-300">  {new Date(listing.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="px-5 text-gray-700 dark:text-gray-300">{listing.address}</Table.Cell>
                  <Table.Cell className="px-5 text-gray-700 dark:text-gray-300">{listing.type}</Table.Cell>
                  <Table.Cell className="px-5 text-gray-700 dark:text-gray-300">{listing.regularPrice}</Table.Cell>
                  <Table.Cell className="px-5 text-gray-700 dark:text-gray-300">{listing.discountPrice}</Table.Cell>
                  <Table.Cell className="px-5">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setListingIdToDelete(listing._id);
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
        <p className="text-gray-500 text-lg text-center dark:text-gray-400">No listings available.</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiTrash className="h-14 w-14 text-red-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-700 dark:text-gray-200">Are you sure you want to delete this listing?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteListing}>
                Yes, delete it
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ListingsTablePage;