
import React, { useState } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { Friend } from '../store/friendsSlice';

interface FriendCardProps {
  friend: Friend;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onToggleFavorite, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(friend.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (showDeleteConfirm) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all duration-200">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Are you sure you want to delete {friend.name}?</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Delete
            </button>
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-lg">{friend.name}</h3>
          <p className="text-gray-500 text-sm mt-1">is your friend</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onToggleFavorite(friend.id)}
            className={`p-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
              friend.isFavorite
                ? 'border-yellow-400 bg-yellow-50 text-yellow-600'
                : 'border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 text-gray-400 hover:text-yellow-600'
            }`}
            aria-label={friend.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={18} fill={friend.isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-lg border border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 hover:scale-105"
            aria-label="Delete friend"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
