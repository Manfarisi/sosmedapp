import {
  MessageSquare,
  UserCheck,
  UserPlus,
  UserRoundPen,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pendingConnections,
} from "../assets/assets";

const Connection = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("Followers");

  const dataArray = [
    {
      label: "Followers",
      value: followers,
      icon: Users,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Following",
      value: following,
      icon: UserCheck,
      color: "from-green-400 to-green-600",
    },
    {
      label: "Pending",
      value: pendingConnections,
      icon: UserRoundPen,
      color: "from-yellow-400 to-orange-500",
    },
    {
      label: "Connections",
      value: connections,
      icon: UserPlus,
      color: "from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-6xl mx-auto p-6">
        {/* title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Connections
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your network and discover new connections
          </p>
        </div>

        {/* Counts */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          {dataArray.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center gap-2 h-28 w-48 rounded-xl shadow-lg text-white bg-gradient-to-br ${item.color} transition-transform duration-300 hover:scale-105`}
            >
              <item.icon className="w-7 h-7 opacity-90" />
              <b className="text-2xl">{item.value.length}</b>
              <p className="font-medium">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 p-3 bg-white border border-gray-200 rounded-xl shadow-sm ">
          {dataArray.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setCurrentTab(tab.label)}
              className={`flex items-center px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
        ${
          currentTab === tab.label
            ? `bg-gradient-to-r ${tab.color} text-white shadow-md scale-[1.02]`
            : "text-gray-700 bg-slate-50 hover:bg-slate-100 active:scale-95"
        }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Connections */}
        <div className="flex flex-wrap gap-6 justify-center">
          {dataArray
            .find((item) => item.label === currentTab)
            .value.map((user) => (
              <div
                key={user._id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33%-16px)] flex gap-5 p-6 bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="rounded-full w-16 h-16 shadow-md object-cover ring-2 ring-slate-100"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-lg">
                    {user.full_name}
                  </p>
                  <p className="text-slate-500 text-sm">@{user.username}</p>
                  <p className="font-medium text-gray-600 mt-1 text-sm">
                    {user.bio.slice(0, 40)}...
                  </p>
                  <div className="flex max-sm:flex-col gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/profile/${user._id}`)}
                      className="flex-1 p-2 text-sm rounded-lg bg-gradient-to-r from-sky-500 to-blue-700 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white font-medium cursor-pointer shadow"
                    >
                      View Profile
                    </button>

                    {currentTab === "Following" && (
                      <button className="flex-1 p-2 text-sm rounded-lg bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white active:scale-95 transition font-medium shadow">
                        Unfollow
                      </button>
                    )}
                    {currentTab === "Pending" && (
                      <button className="flex-1 p-2 text-sm rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white active:scale-95 transition font-medium shadow">
                        Accept
                      </button>
                    )}
                    {currentTab === "Connections" && (
                      <button
                        onClick={() => navigate(`/messages/${user._id}`)}
                        className="flex-1 p-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 active:scale-95 transition font-medium flex items-center justify-center gap-1 shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" /> Message
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Connection;
