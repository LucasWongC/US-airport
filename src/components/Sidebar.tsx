import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import getDistanceFromLatLonInKm from '../helper';
import { RootState } from '../redux/store';
import SearchAutocomplete from './AutocompleteInput';

// import image
import AirportImage from '../assets/SidebarImage.jpg';

const Sidebar = (): ReactElement => {
  const data = useSelector((root: RootState) => root.data);

  const distance =
    data.aOptions.length === 1 && data.bOptions.length === 1
      ? getDistanceFromLatLonInKm(
          data.aOptions[0].geoCode.latitude,
          data.aOptions[0].geoCode.longitude,
          data.bOptions[0].geoCode.latitude,
          data.bOptions[0].geoCode.longitude
        )
      : 0;

  return (
    <Box
      sx={{
        zIndex: '10',
        backgroundColor: 'white',
        width: {
          lg: '300px',
          md: '300px',
          sm: '100%',
        },
        minWidth: {
          lg: '300px',
          md: '300px',
          sm: '100%',
        },
        borderBottomLeftRadius: { md: '0px', xs: '20px' },
        borderBottomRightRadius: { md: '0px', xs: '20px' },
        boxShadow:
          'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;',
      }}
    >
      <Box sx={{ position: 'relative', display: { md: 'block', xs: 'none' } }}>
        <Box
          sx={{
            width: '100%',
            height: { md: 'auto', xs: '160px', overflow: 'hidden' },
          }}
        >
          <img src={AirportImage} alt='airport' width={'100%'} />
        </Box>
        <Typography
          variant='h4'
          sx={{
            my: { md: '20px', xs: '15px' },
            position: 'absolute',
            bottom: { md: '0px', xs: 'auto' },
            top: {
              md: 'auto',
              xs: '0px',
            },
            fontSize: {
              md: '24px',
              xs: '20px',
            },
            width: { md: '100%', xs: 'fit' },
            left: { md: '40px', xs: '20px' },
            color: 'white',
          }}
        >
          Airports in USA
        </Typography>
      </Box>
      <Box sx={{ pt: { md: '50px', xs: '20px' }, px: '20px' }}>
        <Typography variant='h6'>Descriptioin</Typography>
        <Typography variant='body2' sx={{ mb: '20px' }}>
          You can select two airports in USA to get the distance between them.
        </Typography>
        <SearchAutocomplete type='FROM' />
        <SearchAutocomplete type='TO' />
        <p style={{ marginBottom: '20px' }}>
          Distance:{' '}
          {data.aOptions.length === 1 && data.bOptions.length === 1
            ? distance
            : '0'}
          nm
        </p>
      </Box>
    </Box>
  );
};

export default Sidebar;
