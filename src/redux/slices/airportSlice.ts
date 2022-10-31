import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getAmadeusData } from '../../api/amadeus.api';

const initialState: IAirportState = {
  aLoading: false,
  bLoading: false,
  aOptions: [],
  bOptions: [],
  aKeyword: '',
  bKeyword: '',
};

export const getAOptions = createAsyncThunk(
  'getAOptions',
  async (param: IParam) => {
    const result = await getAmadeusData(param);
    return result.out;
  }
);

export const getBOptions = createAsyncThunk(
  'getBOptions',
  async (param: IParam) => {
    const result = await getAmadeusData(param);
    return result.out;
  }
);

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAOptions.pending, (state: IAirportState) => {
      state.aLoading = true;
      return state;
    });

    builder.addCase(
      getAOptions.fulfilled,
      (state: IAirportState, action: PayloadAction<any>) => {
        state.aOptions = action.payload.data.data;
        state.aLoading = false;
      }
    );

    builder.addCase(getAOptions.rejected, (state: IAirportState) => {
      state.aOptions = [];
      state.aLoading = false;
    });

    builder.addCase(getBOptions.pending, (state: IAirportState) => {
      state.bLoading = true;
      return state;
    });

    builder.addCase(
      getBOptions.fulfilled,
      (state: IAirportState, action: PayloadAction<any>) => {
        state.bOptions = action.payload.data.data;
        state.bLoading = false;
      }
    );

    builder.addCase(getBOptions.rejected, (state: IAirportState) => {
      state.bOptions = [];
      state.bLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setAccount } = filterSlice.actions;

export default filterSlice.reducer;
