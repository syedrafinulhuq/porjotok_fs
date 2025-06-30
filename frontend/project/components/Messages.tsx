"use client";

import { useState } from 'react';
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip, Smile, Star } from 'lucide-react';

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Angkon Khan',
      username: '@ankon',
      avatar: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/338918693_912320206671328_8947031221041690316_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHq-HVvzAJ7T-uPwRHoQB9HjnD7p7eHFpSOcPunt4cWlGknJ8xgX86gm2fgNRH7aAFqocQZlB9ihs11yiS1_oQs&_nc_ohc=J6cgmCAlvCQQ7kNvwG78KEy&_nc_oc=AdmAzoQhGHiIVkRCNYi8Cj-vi5bMxUSBXf3ZATTI6-Hqb32LydBnyaOFxrbRJq-3VOU&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=GnnTVdDcWUG6cbYZ37T9nQ&oh=00_AfMoVAjg0W18g727AZMJ8EYZBqlD_R-_YxiGYe87suHAZA&oe=68669102',
      lastMessage: 'Thanks for the collaboration opportunity!',
      time: '2m ago',
      unread: 2,
      online: true,
      platform: 'Instagram'
    },
    {
      id: 2,
      name: 'Chittagong Team',
      username: 'Group Chat',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100',
      lastMessage: 'The campaign at Khagrachari was great!',
      time: '15m ago',
      unread: 0,
      online: false,
      platform: 'LinkedIn'
    },
    {
      id: 3,
      name: 'Noman Abdullah',
      username: '@nomanabdullah',
      avatar: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-1/472706949_1348322973199050_315792664303572491_n.jpg?stp=c23.0.2003.2003a_dst-jpg_s200x200_tt6&_nc_cat=108&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeF4jmgiH7Z8NbxifEFbDS32TrvO1LE_Y4VOu87UsT9jhYlWHvc0Wk0Lsi7Hx2OxjXYXSM5bFC9_vplHNRjCv_nW&_nc_ohc=Qxmr3M9wNk4Q7kNvwHg3Bxj&_nc_oc=AdljVz0IG00HCJTuPBQVkkgD4HxS8QfdU5Ox8CHx83ZMve1QAsjgzOeaQLvwtX4TH-o&_nc_zt=24&_nc_ht=scontent.fdac138-1.fna&_nc_gid=IMBATVe98-6dtSefZBvVYg&oh=00_AfOUULOIgKnTyK_1NWoR90hGQMSRlIhQLUSGRW7A6JxTWA&oe=68669AE7',
      lastMessage: 'Can we schedule a call tomorrow?',
      time: '1h ago',
      unread: 1,
      online: true,
      platform: 'Twitter'
    },
    {
      id: 4,
      name: 'Asif Mahbub',
      username: '@asif_mahbub',
      avatar: 'https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/497700642_4076359236016620_5210080379354121256_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGJf-2JZHL8F3cYdWLzZNkcwECW3eRAjEPAQJbd5ECMQ9uZas2hGzLhGLUhmoTtHucefMOQb2WAQebaW5ybdxUJ&_nc_ohc=TNjvXuHpvuYQ7kNvwEHh3bO&_nc_oc=Adl5oTabL0HJOSEhqreCEO0yVXucvXy7gYEiPzkLiHL61tAAfSjQug3n9Vco-dB3FIU&_nc_zt=23&_nc_ht=scontent.fdac138-1.fna&_nc_gid=L5BwFR5_X36WR2IaozUf9w&oh=00_AfMIBUoA_1LQ6nJr0yIxZMWmgWGFad03kNqlCbfKvLkGzw&oe=68669ECF',
      lastMessage: 'Love your latest post!',
      time: '3h ago',
      unread: 0,
      online: false,
      platform: 'Facebook'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Angkon Khan',
      content: 'Hello there',
      time: '10:30 AM',
      isOwn: false,
      avatar: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/509983714_601862096294657_8438923069589982786_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHg1dQd_DlmPkQNpEN0X0RyrXwZTcRe556tfBlNxF7nni0BG4rKiwwAwiIcDRWSpKGmBGPtrTyx8S9TVLFKnp_l&_nc_ohc=Y6tNfzUoL30Q7kNvwFidp_v&_nc_oc=AdlOWbpXefNRsj5dm79raUeI0f0fcpwo4jQv8tTbk-BLWv0Q9F-tNIPzqBimMc56KBs&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=YRzKp-FEI5zaU-Edc8vuGQ&oh=00_AfOBdVCUp9P8T5x6p0mAuIvoFlaflvZldbsMwiPKC6JU_Q&oe=68667E42'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Yes we can make a trip to Dhaka',
      time: '10:32 AM',
      isOwn: true,
      avatar: null
    },
    {
      id: 3,
      sender: 'Angkon Khan',
      content: 'want to go out?',
      time: '10:35 AM',
      isOwn: false,
      avatar: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/509983714_601862096294657_8438923069589982786_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHg1dQd_DlmPkQNpEN0X0RyrXwZTcRe556tfBlNxF7nni0BG4rKiwwAwiIcDRWSpKGmBGPtrTyx8S9TVLFKnp_l&_nc_ohc=Y6tNfzUoL30Q7kNvwFidp_v&_nc_oc=AdlOWbpXefNRsj5dm79raUeI0f0fcpwo4jQv8tTbk-BLWv0Q9F-tNIPzqBimMc56KBs&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=YRzKp-FEI5zaU-Edc8vuGQ&oh=00_AfOBdVCUp9P8T5x6p0mAuIvoFlaflvZldbsMwiPKC6JU_Q&oe=68667E42'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Absolutely! I\'m free Thursday afternoon or Friday morning. What works better for you?',
      time: '10:37 AM',
      isOwn: true,
      avatar: null
    },
    {
      id: 5,
      sender: 'Shah Abdullah Al Noman',
      content: 'Friday morning would be perfect! Thanks for the collaboration opportunity!',
      time: '10:40 AM',
      isOwn: false,
      avatar: 'https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/509983714_601862096294657_8438923069589982786_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHg1dQd_DlmPkQNpEN0X0RyrXwZTcRe556tfBlNxF7nni0BG4rKiwwAwiIcDRWSpKGmBGPtrTyx8S9TVLFKnp_l&_nc_ohc=Y6tNfzUoL30Q7kNvwFidp_v&_nc_oc=AdlOWbpXefNRsj5dm79raUeI0f0fcpwo4jQv8tTbk-BLWv0Q9F-tNIPzqBimMc56KBs&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=YRzKp-FEI5zaU-Edc8vuGQ&oh=00_AfOBdVCUp9P8T5x6p0mAuIvoFlaflvZldbsMwiPKC6JU_Q&oe=68667E42'
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Twitter': return 'bg-blue-500';
      case 'LinkedIn': return 'bg-blue-600';
      case 'Facebook': return 'bg-blue-700';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
        <button className="btn btn-primary btn-sm">New Message</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-0">
            <div className="p-4 border-b border-base-300">
              <div className="form-control">
                <div className="input-group">
                  <span className="bg-base-200">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="input input-bordered input-sm w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`flex items-center gap-3 p-4 hover:bg-base-200 cursor-pointer transition-colors ${
                    selectedChat === conversation.id ? 'bg-base-200' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img src={conversation.avatar} alt={conversation.name} />
                      </div>
                    </div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100"></div>
                    )}
                    <div className={`absolute -top-1 -right-1 w-4 h-4 ${getPlatformColor(conversation.platform)} rounded-full text-white text-xs flex items-center justify-center`}>
                      {conversation.platform.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                      <span className="text-xs opacity-70">{conversation.time}</span>
                    </div>
                    <p className="text-sm opacity-70 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="badge badge-primary badge-sm">{conversation.unread}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 card bg-base-100 shadow-lg">
          <div className="card-body p-0 flex flex-col h-full">
            {/* Chat Header */}
            {selectedConversation && (
              <div className="flex items-center justify-between p-4 border-b border-base-300">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                      </div>
                    </div>
                    {selectedConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedConversation.name}</h3>
                    <p className="text-xs opacity-70">
                      {selectedConversation.online ? 'Online' : 'Last seen 2h ago'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-ghost btn-sm btn-circle">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="btn btn-ghost btn-sm btn-circle">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="btn btn-ghost btn-sm btn-circle">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  {!message.isOwn && (
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img src={message.avatar ?? '/default-avatar.png'} alt={message.sender} />

                      </div>
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-first' : ''}`}>
                    <div className={`p-3 rounded-lg ${
                      message.isOwn 
                        ? 'bg-primary text-primary-content ml-auto' 
                        : 'bg-base-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className={`text-xs opacity-70 mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-base-300">
              <div className="flex items-center gap-2">
                <button className="btn btn-ghost btn-sm btn-circle">
                  <Paperclip className="w-4 h-4" />
                </button>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered w-full"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <button className="btn btn-ghost btn-sm btn-circle">
                  <Smile className="w-4 h-4" />
                </button>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleSendMessage}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Conversations</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Unread Messages</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-3 rounded-full bg-warning/10 text-warning">
                <Search className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Response Rate</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div className="p-3 rounded-full bg-success/10 text-success">
                <Send className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}