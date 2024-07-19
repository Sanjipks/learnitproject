import React, { useEffect, useState } from "react";
import Service from "../../components/ServiceCard";
import { getServices } from "../../apis/Api";
import AddNewService from "../../components/modals/AddNewService";

const Services = () => {
  const [servicesList, setServicesList] = useState([]);
  const [servicesPerpage, setServicesPerpage] = useState(0);
  const [totalServicesCount, setTotalServicesCount] = useState(0);
  const [pagenumber, setPagenumber] = useState(1);
  const [openAddForm, setOpenAddForm] = useState(false);

  const handlePrevPage = () => {
    if (pagenumber > 1) {
      setPagenumber(pagenumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pagenumber >= 0) {
      setPagenumber(pagenumber + 1);
    }
  };

  const handleOpenAddService = () => {
    setOpenAddForm((prev) => !prev);
  };

  useEffect(() => {
    getServices(pagenumber).then((data) => {
      setServicesList(data.paginatedServices);
      setServicesPerpage(data.servicesPerPage);
      setTotalServicesCount(data.totalEntries);
    });
  }, [pagenumber]);

  return (
    <>
      <div className="min-h-screen  mx-auto h-auto flex flex-col justify-items-center justify-center bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <div className="md:my-20 max-w-screen-xl flex justify-center w-full mx-auto">
          <div className="w-full flex mx-auto justify-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
              Services
            </h1>
          </div>
        </div>
        <div className="max-w-screen-xl flex p-4 mx-auto">
          <button
            onClick={handleOpenAddService}
            className=" flex items-center bg-white rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
          >
            Add New Service
          </button>
          {openAddForm ? <AddNewService /> : <></>}
        </div>

        <div className="flex flex-col justify-evenly mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {/* <div className="md:w-4/5 flex flex-row flex-wrap justify-center mx-auto"> */}
            {servicesList.map((service, id) => (
              <div key={id} className="p-2">
                <Service
                  key={service.service_id}
                  service={service.service_name}
                  serviceId={service.service_id}
                  serviceLogo={service.service_image}
                  // addService={handleAdd}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            {servicesList ? (
              <span className="text-sm text-gray-950 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {pagenumber * servicesPerpage - (servicesPerpage - 1)}
                </span>{" "}
                {servicesList.length !== 1 ? " to " : null}
                {servicesList.length !== 1 ? (
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(pagenumber - 1) * servicesPerpage + servicesList.length}
                  </span>
                ) : null}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {" of "} {totalServicesCount}
                </span>{" "}
                Total Services
              </span>
            ) : (
              "NO USERS TO DISPLAY"
            )}
          </div>

          <div className="flex max-w-screen-xl w-full justify-between my-2  float-end">
            <button
              disabled={pagenumber === 1}
              onClick={handlePrevPage}
              className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 bg-gray-800 rounded-s border  disabled:hover:bg-gray-300 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              &larr; Prev
            </button>
            <button
              disabled={
                pagenumber ===
                  Math.ceil(totalServicesCount / servicesPerpage) ||
                servicesList.length === 0
              }
              onClick={handleNextPage}
              className="items-center px-4 h-8 text-sm font-medium text-white  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300 bg-gray-800  rounded-e border border-gray-700  hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
