import React from "react";
import { dummyUserData } from "../assets/assets";
import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react";

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;

  const handleFollow = async () => {};
  const handleConnectionRequest = async () => {};

  return (
    <div
      key={user._id}
      className="p-5 flex flex-col justify-between w-72 bg-white shadow-md border border-gray-100 rounded-xl hover:shadow-xl transition-shadow duration-300"
    >
      {/* User Profile */}
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto">
          <img
            src={user.profile_picture}
            alt={user.full_name}
            className="rounded-full w-20 h-20 object-cover border-4 border-white shadow-md ring-2 ring-blue-100"
          />
        </div>
        <p className="mt-4 font-semibold text-slate-800 text-lg">{user.full_name}</p>
        {user.username && (
          <p className="text-gray-500 text-sm">@{user.username}</p>
        )}
        {user.bio && (
          <p className="text-gray-600 mt-3 text-center text-sm px-4 leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>

      {/* Location & Followers */}
      <div className="flex items-center justify-center gap-3 mt-5 text-xs text-gray-600">
        {user.location && (
          <div className="flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{user.location}</span>
          </div>
        )}
        <div className="flex items-center gap-1 border border-gray-200 rounded-full px-3 py-1 bg-gray-50">
          <span className="font-medium text-slate-700">{user.followers.length}</span>
          Followers
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-5 gap-2">
        {/* Follow Button */}
        <button
          onClick={handleFollow}
          disabled={currentUser?.following.includes(user._id)}
          className={`flex-1 py-2 rounded-lg flex justify-center items-center gap-2 text-sm font-medium transition-all active:scale-95
            ${
              currentUser?.following.includes(user._id)
                ? "bg-gray-200 text-gray-600 cursor-pointer"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md cursor-pointer"
            }`}
        >
          <UserPlus className="w-4 h-4" />
          {currentUser?.following.includes(user._id) ? "Following" : "Follow"}
        </button>

        {/* Connection / Message Button */}
        <button
          onClick={handleConnectionRequest}
          className="flex items-center justify-center w-12 border border-gray-300 bg-white text-slate-500 rounded-lg shadow-sm hover:bg-gray-100 active:scale-95 transition"
        >
          {currentUser?.connections.includes(user._id) ? (
            <MessageCircle className="w-5 h-5 cursor-pointer" />
          ) : (
            <Plus className="w-5 h-5 cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
