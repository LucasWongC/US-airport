// @ts-nocheck
import GoogleMapReact from 'google-map-react';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import airport_svg from '../assets/airport.svg';
import { Box } from '@mui/material';

const defaultProps = {
  center: {
    lat: 34,
    lng: -111,
  },
  zoom: 0,
};

const GMapBox: React.FC = (): ReactElement => {
  const data = useSelector((root: RootState) => root.data);

  return (
    <Box
      sx={{
        mt: { md: '0px', xs: '-40px' },
        height: { md: 'calc(100vh - 40px)', xs: '700px' },
        width: '100%',
        padding: { lg: '20px', sm: '0px' },
      }}
    >
      <Box
        sx={{
          padding: { md: '20px', xs: '0px' },
          height: { md: 'calc(100% - 40px)', xs: '100%' },
          borderRadius: { md: '20px', xs: '0px' },
          boxShadow:
            'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;',
        }}
      >
        <Box
          sx={{
            borderRadius: '15px',
            overflow: { md: 'hidden', xs: 'visible' },
            height: '100%',
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {data.aOptions.length === 1 && (
              <img
                style={{ transform: 'translateX(-50%) translateY(-100%)' }}
                width={50}
                height={50}
                src={airport_svg}
                alt='airport'
                lat={data.aOptions[0].geoCode.latitude}
                lng={data.aOptions[0].geoCode.longitude}
              />
            )}
            {data.bOptions.length === 1 && (
              <img
                style={{ transform: 'translateX(-50%) translateY(-100%)' }}
                width={50}
                height={50}
                src={airport_svg}
                alt='airport'
                lat={data.bOptions[0].geoCode.latitude}
                lng={data.bOptions[0].geoCode.longitude}
              />
            )}
          </GoogleMapReact>
        </Box>
      </Box>
    </Box>
  );
};

export default GMapBox;
