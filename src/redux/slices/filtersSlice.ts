import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    price: number[];
    category: string[];
    rating: number | null;
    sort: 'asc' | 'desc';
    search: string;
}

const initialState: FiltersState = {
    price: [],
    category: [],
    rating: null,
    sort: 'asc',
    search: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setPrice(state, action: PayloadAction<number[]>) {
            state.price = action.payload;
        },
        setCategory(state, action: PayloadAction<string[]>) {
            state.category = action.payload;
        },
        setRating(state, action: PayloadAction<number | null>) {
            state.rating = action.payload;
        },
        setSort(state, action: PayloadAction<'asc' | 'desc'>) {
            state.sort = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
});

export const { setPrice, setCategory, setRating, setSort, setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
