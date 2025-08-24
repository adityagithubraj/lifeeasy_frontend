import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();

  const menuItems = [
    {
      id: 'cart',
      icon: '🛒',
      label: 'My Cart',
      badge: '0',
      onClick: () => console.log('Cart clicked')
    },
    {
      id: 'account',
      icon: '👤',
      label: 'My Account',
      onClick: () => console.log('Account clicked')
    },
    {
      id: 'orders',
      icon: '📊',
      label: 'My Orders',
      onClick: () => console.log('Orders clicked')
    },
    {
      id: 'editProfile',
      icon: '✏️',
      label: 'Edit Profile',
      onClick: () => console.log('Edit Profile clicked')
    },
    {
      id: 'changePassword',
      icon: '🔒',
      label: 'Change Password',
      onClick: () => console.log('Change Password clicked')
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-80 z-50 ${
              theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            } shadow-2xl`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1" />
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Profile Section */}
              <div className="p-6 text-center">
                <div className="relative inline-block">
                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  
                  {/* Hello Badge */}
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Hello
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">John Doe</h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  john.doe@example.com
                </p>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-6 space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        theme === 'dark'
                          ? 'bg-gray-600 text-gray-200'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <div className="p-6">
                <button
                  onClick={() => console.log('Logout clicked')}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${
                    theme === 'dark' ? 'hover:text-red-400' : 'hover:text-red-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>

              {/* Floating Action Button */}
              <div className="absolute bottom-6 right-6">
                <button
                  onClick={() => console.log('Chat clicked')}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${
                    theme === 'dark' ? 'bg-teal-500' : 'bg-teal-400'
                  }`}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSidebar; 