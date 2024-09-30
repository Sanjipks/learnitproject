import React, { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import { deleteService, getServices } from "../../apis/Api";
import AddNewService from "../../components/modals/AddNewService";
import { useLogin } from "../../context/LoginContext";
import { toast } from "react-toastify";
import Cart from "../../components/Cart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartIcon from "../../assets/icons/CartIcon";
import ConfirmDecision from "../../components/modals/utilitycomponent/ConfirmDecision";
import Spinner from "../../components/common/Spinner";

const Services = () => {
  const [servicesList, setServicesList] = useState([]);
  const [servicesPerpage, setServicesPerpage] = useState(0);
  const [totalServicesCount, setTotalServicesCount] = useState(0);
  const [pagenumber, setPagenumber] = useState(1);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [pop, setPop] = useState(false);
  const [deletedId, setDeletedId] = useState(null);
  const [expandedservice, setExpandedservice] = useState(null);
  const [loading, setLoading] = useState(false);

  const { cartItems, clearCart } = useCart();

  const navigate = useNavigate();

  const { loginInfo } = useLogin();

  const loggedinUserRole = loginInfo.userRole;

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

  const handleFormView = (state) => {
    setOpenAddForm(state);
  };

  const handleclose = () => {
    setOpenAddForm(false);
  };

  // useEffect(() => {
  //   getServices(pagenumber).then((data) => {
  //     setServicesList(data.paginatedServices);
  //     setServicesPerpage(data.servicesPerPage);
  //     setTotalServicesCount(data.totalEntries);
  //   });
  // }, [pagenumber, deletedId]);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);

      try {
        const data = await getServices(pagenumber);
        setServicesList(data.paginatedServices);
        setServicesPerpage(data.servicesPerPage);
        setTotalServicesCount(data.totalEntries);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [pagenumber, deletedId]);

  const handleCartView = () => {
    navigate("/mycart");
  };

  //clearcart
  const handleClearCart = () => {
    clearCart();
  };
  //first step to remove user, passed as removeuser props and it recieves user id from child and set Pop true to dispaly component created as modal
  const handleDelete = async (id) => {
    setDeletedId(id);
    setPop(true);
  };

  //user delete decision can be made and receives true or false state from child compo
  const handlePop = async (state) => {
    setPop(false);
    if (state && deletedId !== null) {
      try {
        const response = await deleteService(deletedId, loggedinUserRole);
        const data = await response.json();

        if (response.ok) {
          toast(data.message);
          setServicesList(
            servicesList.filter((service) => service.service_id !== deletedId)
          );
        } else {
          console.error("Failed to remove user");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setDeletedId(null); // Reset deletedId after operation
      }
    }
  };

  //it deletes the user if condition is met
  // useEffect(() => {
  //   if (confirmDelete && deletedId !== null) {
  //     const deleteServiceAsync = async () => {
  //       try {
  //         const response = await deleteService(deletedId, loggedinUserRole);
  //         const data = await response.json();

  //         if (response.ok) {
  //           toast(data.message);
  //           setFilteredServices(
  //             servicesList.filter((service) => service.service_id !== deletedId)
  //           );
  //         } else {
  //           console.error("Failed to remove user");
  //         }
  //       } catch (error) {
  //         console.error("Error:", error);
  //       } finally {
  //         setDeletedId(null); // Reset deletedId after operation
  //         setConfirmDelete(false); // Reset confirmDelete after operation
  //       }
  //     };

  //     deleteServiceAsync();
  //   } else {
  //     return;
  //   }
  // }, [confirmDelete]);

  return (
    <>
      <div className="min-h-screen  mx-auto h-auto flex flex-col justify-items-center justify-between bg-gray-500 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
        <div className="mt-28">
          <div className=" max-w-screen-xl flex w-full mx-auto">
            <div className="w-full flex mx-auto justify-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white p-4 ">
                Services
              </h1>
            </div>
          </div>
          {loggedinUserRole === "admin" ? (
            <div className="max-w-screen-xl flex justify-end px-2  mx-auto mt-12">
              <button
                onClick={handleOpenAddService}
                className=" flex items-center bg-gray-100 rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
              >
                Add New Service +
              </button>
              {openAddForm ? (
                <AddNewService
                  handleformview={handleFormView}
                  handleclose={handleclose}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="max-w-screen-xl flex justify-between px-2  mx-auto mt-12">
              <button
                onClick={handleCartView}
                className="flex bg-gray-100 rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
              >
                <Cart cartItems={cartItems} />
              </button>
              <button
                onClick={handleClearCart}
                className="flex bg-gray-100 rounded-lg shadow dark:border md:mt-0 max-w-sm w-auto p-4 dark:bg-gray-800 text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white  "
              >
                Clear
                <span className="ml-4">
                  <CartIcon />
                </span>
              </button>
            </div>
          )}

          <div className="flex justify-center mt-2" onMouseDown={handleclose}>
            {loading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                {/* <div className="md:w-4/5 flex flex-row flex-wrap justify-center mx-auto"> */}
                {servicesList.map((service, id) => (
                  <div key={id} className="p-2">
                    <ServiceCard
                      key={service.service_id}
                      service={service.service_name}
                      serviceId={service.service_id}
                      serviceLogo={service.service_image}
                      servicePrice={service.service_price}
                      deleteService={handleDelete}
                      expandedservice={expandedservice}
                      setExpandedservice={setExpandedservice}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center ">
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
              className="items-center px-4 h-8 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-100 bg-gray-800 rounded-s border  disabled:hover:bg-gray-100 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
              className="items-center px-4 h-8 text-sm font-medium text-white  disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100 bg-gray-800  rounded-e border border-gray-700  hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
      {pop ? (
        <ConfirmDecision
          handlePopAction={handlePop}
          typo=" Are you sure you want to delete this service?"
        />
      ) : null}
    </>
  );
};

export default Services;
