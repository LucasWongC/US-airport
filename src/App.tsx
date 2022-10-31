import SearchAutocomplete from './components/AutocompleteInput';
import { Box } from '@mui/material';
import GMapBox from './components/GMapBox';
import Sidebar from './components/Sidebar';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          md: 'row',
          xs: 'column',
        },
        width: '100vw',
      }}
    >
      <Sidebar />
      <GMapBox />
    </Box>
  );
}

export default App;
