import React, { useEffect, useState } from "react";
import { bufferToBase64 } from "../utility/BufferToBase64";
import { useLogin } from "../context/LoginContext";
import { changeProfileImage, getUserInfo } from "../apis/Api";
import { convertToBase64 } from "../utility/ConvertToBase64";
import { toast } from "react-toastify";

function UserProfile() {
  const { loginInfo } = useLogin();
  //const rawimage = loginInfo.userImage;
  const username = loginInfo.userName;
  const email = loginInfo.userEmail;
  const token = loginInfo.token;
  const [expand, setExpand] = useState("hidden");
  const [userImage, setUserImage] = useState("");
  const [isNewImage, setIsNewImage] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo(email);
        const data = await res.json();

        const image = data.userInfo.user_image;
        if (image && image.data) {
          const base64String = bufferToBase64(image.data);
          setUserImage(`data:image/jpeg;base64,${base64String}`);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleCardClick = () => {
    if (expand === "hidden") {
      setExpand("block");
    } else {
      setExpand("hidden");
    }
  };

  const handleMouseLeave = () => {
    setExpand("hidden");
  };

  const handleChangePhoto = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = event.target.files[0];
      const base64Image = await convertToBase64(newImage);
      setUserImage(base64Image);
      setIsNewImage(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userImage && isNewImage) {
      const bodyData = { profileImage: userImage, email, token };

      const res = await changeProfileImage(bodyData);
      const data = await res.json();

      if (res.status === 200) {
        toast(data.message, { autoClose: 1000 });
        setExpand("hidden");
        setIsNewImage(false);
      }
    } else {
      toast("No image selected.", { autoClose: 1000 });
    }
  };

  return (
    <div
      className="flex justify-center items-center "
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full h-full bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4 pb-10 ">
          <button
            onClick={handleCardClick}
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns=""
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>

          <div
            id="dropdown"
            className={`absolute mt-10 z-10 ${expand} text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <form
              onSubmit={handleSubmit}
              className="p-2"
              aria-labelledby="dropdownButton"
            >
              <div className="mb-4">
                <label
                  htmlFor="serviceimage"
                  className="block text-md py-2 font-medium text-gray-900 dark:text-white"
                >
                  Change Profile Image
                </label>
                <input
                  type="file"
                  name="serviceimage"
                  id="serviceimage"
                  onChange={handleChangePhoto}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="add image"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full border border-gray-900 dark:border-gray-100 px-2 py-1 rounded-md text-center text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="md:min-h-96 flex flex-col items-center pb-10">
          <img
            className="lg:w-96 lg:h-96 mb-3 rounded-full shadow-lg"
            src={userImage}
            alt={`${username}` + "'s profile"}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
