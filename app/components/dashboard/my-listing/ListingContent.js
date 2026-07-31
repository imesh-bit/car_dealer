"use client";
import Image from "next/image";
import { useState } from "react";
import { useMergedListings } from "@/hooks/useMergedListings";

const ListingContent = () => {
  const mergedListings = useMergedListings();
  const [deletingId, setDeletingId] = useState(null);
  const [deletedIds, setDeletedIds] = useState(new Set());

  const carListings = mergedListings
    .filter((listing) => !deletedIds.has(listing.id))
    .slice(0, 8)
    .map((listing) => ({
      id: listing.id,
      make: listing.make || "Unknown",
      model: listing.model || listing.title || "Listing",
      year: listing.year || "N/A",
      transmission: listing.transmission || "N/A",
      fuelType: listing.fuelType || "N/A",
      price: listing.price ? `$${listing.price.toLocaleString()}` : "Contact",
      imageSrc: listing.image || "/images/listing/1.jpg",
    }));

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete listing (status ${res.status})`);
      }

      // Optimistically remove from the UI
      setDeletedIds((prev) => new Set(prev).add(id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Something went wrong deleting this listing. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="table-responsive my_lisging_table">
        <table className="table">
          <thead className="table-light">
            <tr className="thead_row">
              <th className="thead_title pl20" scope="col">
                Make
              </th>
              <th className="thead_title" scope="col">
                Model
              </th>
              <th className="thead_title" scope="col">
                Year
              </th>
              <th className="thead_title" scope="col">
                Transmission
              </th>
              <th className="thead_title" scope="col">
                FuelType
              </th>
              <th className="thead_title" scope="col">
                Action
              </th>
            </tr>
          </thead>
          {/* End thead */}

          <tbody>
            {carListings.map((car) => (
              <tr key={car.id}>
                <th className="align-middle pl20" scope="row">
                  <div className="car-listing bdr_none d-flex mb0">
                    <div className="thumb w150">
                      <Image
                        width={150}
                        height={96}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        className="img-fluid"
                        src={car.imageSrc}
                        alt={car.make}
                      />
                    </div>
                    <div className="details ms-1">
                      <h6 className="title">
                        <a href="page-car-single-v1.html">{`${car.make} ${car.model} - ${car.year}`}</a>
                      </h6>
                      <h5 className="price">{car.price}</h5>
                    </div>
                  </div>
                </th>
                <td className="align-middle">{car.make}</td>
                <td className="align-middle">{car.year}</td>
                <td className="align-middle">{car.transmission}</td>
                <td className="align-middle">{car.fuelType}</td>
                <td className="editing_list align-middle">
                  <ul>
                    <li className="list-inline-item mb-1">
                      <a href="#" title="View">
                        <span className="flaticon-view"></span>
                      </a>
                    </li>
                    <li className="list-inline-item mb-1">
                      <a href="#" title="Edit">
                        <span className="flaticon-pen"></span>
                      </a>
                    </li>
                    <li className="list-inline-item mb-1">
                      <a
                        href="#"
                        title="Delete"
                        onClick={(e) => {
                          e.preventDefault();
                          if (deletingId !== car.id) handleDelete(car.id);
                        }}
                        style={{
                          pointerEvents: deletingId === car.id ? "none" : "auto",
                          opacity: deletingId === car.id ? 0.5 : 1,
                        }}
                      >
                        <span className="flaticon-trash"></span>
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingContent;