import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { SendHorizontal } from 'lucide-react';
import useListenMessages from '../hooks/useListenMessages';
import moment from 'moment';

const Messages = () => {
  const { socket, userId } = useContext(SocketContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
    if (socket && userId) {
      socket.emit('registerUser', userId);
    }
  }, [socket, userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8083/api/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8083/api/messages/${selectedUser._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getAuthToken()}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  useListenMessages({
    onMessageReceived: (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    },
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      message: newMessage,
      senderId: userId,
      receiverId: selectedUser._id,
    };

    try {
      const response = await fetch(
        `http://localhost:8083/api/messages/send/${selectedUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify(messageData),
        }
      );

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-gray-100 overflow-y-auto">
        <h2 className="text-lg font-semibold p-4 border-b">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer ${
                selectedUser?._id === user._id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center">
                <img
                  src={user.profilePhoto || '/default-profile.png'}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>{user.fullName || user.name || user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 flex flex-col relative">
        {/* Header */}
        <div className="p-4 bg-gray-200 border-b sticky top-0 z-10 h-16 flex items-center">
          <h2 className="text-xl font-semibold truncate w-full">
            {selectedUser
              ? selectedUser.fullName || selectedUser.name || selectedUser.email
              : 'Select a user to chat'}
          </h2>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto px-4 pt-20 pb-4 space-y-4">
          {/* ⬆ pt-20 added to create space under sticky header */}
          {messages.map((msg, index) => {
            const isSender = msg.senderId === userId;
            return (
              <div
                key={index}
                className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-xs">
                  <div
                    className={`p-3 rounded-lg shadow-md ${
                      isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div
                    className={`text-[11px] mt-1 ${
                      isSender ? 'text-right text-blue-200' : 'text-left text-gray-500'
                    }`}
                  >
                    {moment(msg.createdAt).format('MMM D, h:mm A')}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {selectedUser && (
          <div className="p-4 bg-white border-t sticky bottom-0 z-10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg p-2"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <SendHorizontal />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
