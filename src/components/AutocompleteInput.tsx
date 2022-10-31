import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { getToken } from '../api/amadeus.api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getAOptions, getBOptions } from '../redux/slices/airportSlice';

const SearchAutocomplete = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [keyword, setKeyword] = React.useState('');

  const data = useSelector((root: RootState) => root.data);

  const dispatch = useDispatch<AppDispatch>();

  const options = props.type === 'FROM' ? data.aOptions : data.bOptions;

  // Configure options format for proper displaying on the UI
  const names = options.map((i: any) => ({
    type: i.subType,
    name: i.name,
  }));

  // dispatch function based on type

  const getOptions = props.type === 'FROM' ? getAOptions : getBOptions;

  // Loading
  const loading = props.type === 'FROM' ? data.aLoading : data.bLoading;

  // Debounce func prevents extra unwanted keystrokes, when user triggers input events
  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);

  useEffect(() => {
    debounceLoadData(search);
  }, [search]);

  // Same example as in *SearchRoot* component
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const token = await getToken();

      dispatch(getOptions({ keyword, token }));
    };
    fetchData();
  }, [keyword]);

  const label = props.type;

  return (
    // This is Material-UI component that also has it's own props
    <Autocomplete
      id={'Autocomplete-Airports ' + props.type}
      style={{ width: '100%', marginBottom: '1rem' }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => {
        if (value && value.name) {
          setSearch(value.name);
          return;
        }
        setSearch('');
      }}
      getOptionLabel={(option) => {
        return option.name;
      }}
      options={names}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            label={label}
            fullWidth
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            variant='outlined'
            inputProps={{
              ...params.inputProps,
              value: search,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default SearchAutocomplete;
