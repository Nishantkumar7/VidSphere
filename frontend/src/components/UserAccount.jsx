import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAccount = () => {
  const userDetails = useSelector((store) => store.user.userDetails);
  const userChannel = useSelector(
    (store) => store.userChannel.userChannelDetails
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || Object.keys(userDetails).length <= 0) {
      toast.error("Login required!");
      navigate("/");
    }
  }, [userDetails]);

  return (
    <div className="bg-[#f9f9f9] min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="font-bold text-2xl text-gray-800 mb-6">Account Details</h2>
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-lg shadow-md p-6">
          <img
            src={userDetails?.avatar}
            className="rounded-full w-32 h-32 border-4 border-gray-300"
            alt="avatar"
          />
          <div className="flex flex-col">
            <h2 className="text-gray-800 font-semibold text-xl">
              {userDetails?.userName}
            </h2>
            <p className="text-gray-700 py-2">Email: {userDetails?.email}</p>
            <p className="text-gray-700">
              Account Created: {userDetails?.createdAt?.split("T")[0]}
            </p>
          </div>
        </div>

        <h2 className="font-bold text-2xl text-gray-800 py-6">
          Channels Associated with Your Account
        </h2>

        <div className="flex flex-col sm:flex-row gap-6">
          {userChannel && Object.keys(userChannel).length >= 1 ? (
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
              <img
                src={userChannel?.channelLogo}
                className="rounded-full w-32 h-32 border-4 border-gray-300"
                alt="channel logo"
              />
              <div className="text-center mt-4">
                <h2 className="text-gray-800 text-lg font-semibold">
                  {userChannel?.channelName}
                </h2>
              </div>
            </div>
          ) : (
            <div className="text-gray-700 font-semibold mt-4">
              You don't have any channel yet.{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/createChannel")}
              >
                Create one now!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
