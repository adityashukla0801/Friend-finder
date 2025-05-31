
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Friend {
  id: string;
  name: string;
  isFavorite: boolean;
  dateAdded: number;
}

interface FriendsState {
  friends: Friend[];
  searchTerm: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: FriendsState = {
  friends: [
    { id: '1', name: 'Rahul Gupta', isFavorite: false, dateAdded: Date.now() - 86400000 },
    { id: '2', name: 'Shivangi Sharma', isFavorite: true, dateAdded: Date.now() - 172800000 },
    { id: '3', name: 'Akash Singh', isFavorite: false, dateAdded: Date.now() - 259200000 },
  ],
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 4,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<string>) => {
      const newFriend: Friend = {
        id: Date.now().toString(),
        name: action.payload.trim(),
        isFavorite: false,
        dateAdded: Date.now(),
      };
      state.friends.unshift(newFriend);
      state.currentPage = 1;
    },
    deleteFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(friend => friend.id !== action.payload);
      const totalPages = Math.ceil(state.friends.length / state.itemsPerPage);
      if (state.currentPage > totalPages && totalPages > 0) {
        state.currentPage = totalPages;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const friend = state.friends.find(friend => friend.id === action.payload);
      if (friend) {
        friend.isFavorite = !friend.isFavorite;
      }
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addFriend, deleteFriend, toggleFavorite, setSearchTerm, setCurrentPage } = friendsSlice.actions;
export default friendsSlice.reducer;
