
import React, { useMemo } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addFriend, deleteFriend, toggleFavorite, setSearchTerm, setCurrentPage } from '../store/friendsSlice';
import FriendCard from './FriendCard';
import AddFriendForm from './AddFriendForm';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Users } from 'lucide-react';

const FriendsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { friends, searchTerm, currentPage, itemsPerPage } = useAppSelector(state => state.friends);

  const filteredAndSortedFriends = useMemo(() => {
    let filtered = friends;
    
    if (searchTerm) {
      filtered = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Create a copy of the array before sorting to avoid mutating the Redux state
    return [...filtered].sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return b.dateAdded - a.dateAdded;
    });
  }, [friends, searchTerm]);

  const totalPages = Math.ceil(filteredAndSortedFriends.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFriends = filteredAndSortedFriends.slice(startIndex, startIndex + itemsPerPage);

  const handleAddFriend = (name: string) => {
    const existingFriend = friends.find(friend => 
      friend.name.toLowerCase() === name.toLowerCase()
    );
    
    if (existingFriend) {
      return;
    }
    
    dispatch(addFriend(name));
  };

  const handleDeleteFriend = (id: string) => {
    dispatch(deleteFriend(id));
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Users className="text-white" size={28} />
              <h1 className="text-2xl font-bold text-white">Friends List</h1>
            </div>
            <p className="text-blue-100">Manage your friend connections</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Add Friend Form */}
            <AddFriendForm onAddFriend={handleAddFriend} />

            {/* Search Bar */}
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search friends..."
            />

            {/* Friends List */}
            <div className="space-y-3">
              {paginatedFriends.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="mx-auto text-gray-300 mb-3" size={48} />
                  <p className="text-gray-500">
                    {searchTerm ? 'No friends found matching your search.' : 'No friends added yet.'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {paginatedFriends.map((friend) => (
                    <FriendCard
                      key={friend.id}
                      friend={friend}
                      onToggleFavorite={handleToggleFavorite}
                      onDelete={handleDeleteFriend}
                    />
                  ))}
                  
                  {/* Results summary */}
                  <div className="text-center text-sm text-gray-500 mt-4">
                    Showing {paginatedFriends.length} of {filteredAndSortedFriends.length} friends
                  </div>
                </>
              )}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
