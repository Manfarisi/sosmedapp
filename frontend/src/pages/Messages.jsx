import React, { useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Eye, MessageSquare, Search, Filter, MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Messages = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter users based on search term and active filter
  const filteredUsers = dummyConnectionsData.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.username.toLowerCase().includes(searchTerm.toLowerCase())
    // For demo purposes, we'll assume some users have a 'status' field
    // If not, you might need to adjust this logic
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'online' && user.status === 'online') ||
                         (activeFilter === 'offline' && user.status === 'offline')
    return matchesSearch && matchesFilter
  })

  return (
    <div className='min-h-screen relative bg-gradient-to-br from-indigo-50 to-purple-50 py-8'>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">Messages</h1>
          <p className="text-slate-600 text-lg">Connect with your friends and family</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search connections..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('online')}
            >
              Online
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'offline' ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('offline')}
            >
              Offline
            </button>
          </div>
        </div>

        {/* Connection List */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex items-center gap-4 border border-gray-100">
                {/* User Avatar with Status Indicator */}
                <div className="relative flex-shrink-0">
                  <img 
                    src={user.profile_picture} 
                    alt={user.full_name} 
                    className="rounded-full size-14 object-cover border-2 border-white shadow"
                  />
                  {/* Status indicator - you might need to add a status property to your user objects */}
                  <span className={`absolute bottom-0 right-0 rounded-full w-3.5 h-3.5 border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800 truncate">{user.full_name}</p>
                    {user.verified && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded">Verified</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm truncate">@{user.username}</p>
                  <p className="text-sm text-gray-600 truncate mt-1">{user.bio}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/messages/${user._id}`)} 
                    className="p-2.5 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors active:scale-95 flex items-center justify-center"
                    title="Send message"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={() => navigate(`/profile/${user._id}`)} 
                    className="p-2.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors active:scale-95 flex items-center justify-center"
                    title="View profile"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No connections found</h3>
              <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages