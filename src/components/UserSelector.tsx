import React from 'react';
import { User } from '../types';
import { Users, MapPin, Briefcase, Calendar } from 'lucide-react';

interface UserSelectorProps {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUser,
  onUserSelect
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Users className="w-6 h-6 text-indigo-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Select User Profile</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedUser?.id === user.id
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <div className={`w-3 h-3 rounded-full ${
                user.gender === 'male' ? 'bg-blue-400' :
                user.gender === 'female' ? 'bg-pink-400' : 'bg-purple-400'
              }`} />
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{user.age} years old</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{user.occupation}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{user.location}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preferences:</p>
              <div className="flex flex-wrap gap-1">
                {user.preferences.map((pref, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};