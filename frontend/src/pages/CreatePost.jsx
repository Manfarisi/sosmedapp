import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;
  const handleSubmit = async () => {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Post
          </h1>
          <p className="text-slate-600 text-base">
            Share your thoughts with the world
          </p>
        </div>

        {/* form */}
        <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6 border border-slate-100">
          {/* header */}
          <div className="flex items-center gap-4">
            <img
              src={user.profile_picture}
              alt=""
              className="w-14 h-14 rounded-full shadow-md object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* text area */}
          <textarea
            className="w-full min-h-[100px] resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 transition"
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="h-24 w-24 object-cover rounded-lg shadow-md transform transition group-hover:scale-105"
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* bottom bar */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition cursor-pointer"
            >
              <Image className="w-5 h-5" />
              <span className="hidden sm:inline">Add Images</span>
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={(e) => setImages([...images, ...e.target.files])}
            />
            <button
              disabled={loading}
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "Uploading...",
                  success: <p>Post Added</p>,
                  error: <p>Post Not Added</p>,
                })
              }
              className={`text-sm font-medium px-6 py-2 rounded-lg shadow-md transition 
                ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:shadow-lg hover:opacity-90"
                }`}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
