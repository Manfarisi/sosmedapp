import React, { useState, useEffect } from "react";
import { dummyUserData } from "../assets/assets";
import { Pencil } from "lucide-react";

const ProfileModal = ({ setShowEdit }) => {
  const user = dummyUserData;
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  });
  const [previewProfile, setPreviewProfile] = useState(user.profile_picture);
  const [previewCover, setPreviewCover] = useState(user.cover_photo);

  // Update preview profile jika pilih foto baru
  useEffect(() => {
    if (editForm.profile_picture) {
      const objectUrl = URL.createObjectURL(editForm.profile_picture);
      setPreviewProfile(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // cleanup URL
    } else {
      setPreviewProfile(user.profile_picture);
    }
  }, [editForm.profile_picture, user.profile_picture]);

  // Update preview cover jika pilih cover baru
  useEffect(() => {
    if (editForm.cover_photo) {
      const objectUrl = URL.createObjectURL(editForm.cover_photo);
      setPreviewCover(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // cleanup URL
    } else {
      setPreviewCover(user.cover_photo);
    }
  }, [editForm.cover_photo, user.cover_photo]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Tambahkan API call untuk simpan profil di sini
    setShowEdit(false); // Tutup modal setelah simpan
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-6 relative">
        {/* Tombol Close */}
        <button
          onClick={() => setShowEdit(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>

        <h1 className="text-xl font-bold mb-4 text-gray-800">Edit Profile</h1>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          {/* Cover Photo */}
          <div className="relative">
            <img
              src={previewCover || "https://via.placeholder.com/600x200"}
              alt="cover preview"
              className="w-full h-32 md:h-40 object-cover rounded-lg shadow"
            />
            <label
              htmlFor="cover_photo"
              className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow"
            >
              <Pencil size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                id="cover_photo"
                className="hidden"
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    cover_photo: e.target.files[0],
                  })
                }
              />
            </label>
          </div>
          <p className="text-sm text-gray-500">Click pencil to change cover</p>

          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={previewProfile}
                alt="profile preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
              />
              <label
                htmlFor="profile_picture"
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full cursor-pointer shadow"
              >
                <Pencil size={16} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  id="profile_picture"
                  className="hidden"
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      profile_picture: e.target.files[0],
                    })
                  }
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Click pencil to change photo
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={editForm.full_name}
              onChange={(e) =>
                setEditForm({ ...editForm, full_name: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={editForm.username}
              onChange={(e) =>
                setEditForm({ ...editForm, username: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              value={editForm.bio}
              onChange={(e) =>
                setEditForm({ ...editForm, bio: e.target.value })
              }
              rows="3"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
