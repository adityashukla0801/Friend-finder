
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface AddFriendFormProps {
  onAddFriend: (name: string) => void;
}

const AddFriendForm: React.FC<AddFriendFormProps> = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter a friend\'s name');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }
    
    if (trimmedName.length > 50) {
      setError('Name must be less than 50 characters');
      return;
    }

    onAddFriend(trimmedName);
    setName('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter your friend's name"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
              error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
            }`}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <UserPlus size={18} />
          Add
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1 ml-1">{error}</p>
      )}
    </form>
  );
};

export default AddFriendForm;
