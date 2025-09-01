import React, { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { ImageIcon, SendHorizonal, X } from "lucide-react";

const ChatBox = () => {
  const messages = dummyMessagesData;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(dummyUserData);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const messageEndRef = useRef(null);

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const sendMessage = async () => {
    if (!text && !image) return;
    
    try {
      // Simulasi pengiriman pesan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Logika pengiriman pesan akan ditambahkan di sini
      // Setelah berhasil, reset form
      setText("");
      setImage(null);
      
      // Tampilkan toast sukses
      showToast("Pesan berhasil dikirim", "success");
    } catch (error) {
      // Tampilkan toast error
      showToast("Gagal mengirim pesan", "error");
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    user && (
      <div className="flex flex-col h-screen relative">
        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 flex items-center justify-between p-4 rounded-lg shadow-lg min-w-[300px] transform transition-all duration-300 ${
            toast.type === "success" 
              ? "bg-green-100 text-green-800 border-l-4 border-green-500" 
              : "bg-red-100 text-red-800 border-l-4 border-red-500"
          }`}>
            <div className="flex items-center">
              <div className={`rounded-full p-1 mr-3 ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}>
                {toast.type === "success" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                )}
              </div>
              <span>{toast.message}</span>
            </div>
            <button 
              onClick={() => setToast({ show: false, message: "", type: "" })}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md">
          <img
            src={user.profile_picture}
            alt=""
            className="w-12 h-12 rounded-full object-cover shadow"
          />
          <div>
            <p className="font-semibold">{user.full_name}</p>
            <p className="text-sm opacity-90">@{user.username}</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-3">
          {messages
            .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((message, index) => {
              const isSender = message.to_user_id === user._id;
              return (
                <div
                  key={index}
                  className={`flex flex-col ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg shadow-sm text-sm ${
                      isSender
                        ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.message_type === "image" && (
                      <img
                        src={message.media_url}
                        alt=""
                        className="rounded-md mb-1 max-w-full"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              );
            })}
          <div ref={messageEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-t-2xl shadow-lg">
          {/* Preview image */}
          {image && (
            <div className="mb-3 flex items-start">
              <div className="relative max-w-[200px] rounded-xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover max-h-[180px]"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Input row */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                onChange={(e) => setText(e.target.value)}
                value={text}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all pr-12 bg-gray-50 hover:bg-gray-100"
              />
            </div>

            <label
              htmlFor="image"
              className="flex items-center justify-center w-12 h-12 rounded-2xl border border-gray-200 bg-white cursor-pointer hover:bg-blue-50 transition-all shadow-sm hover:shadow-md text-blue-500 hover:text-blue-600"
              title="Attach image"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-cover rounded-2xl"
                  alt="Selected"
                />
              ) : (
                <div className="flex items-center justify-center">
                  <ImageIcon className="text-current" size={20} />
                </div>
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <button
              onClick={sendMessage}
              disabled={!text && !image}
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl p-3 transition-all duration-200 shadow-md hover:shadow-lg w-12 h-12"
              aria-label="Send message"
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBox;