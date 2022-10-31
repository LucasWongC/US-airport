import axios from 'axios';
import qs from 'qs';

const API_KEY = 'aZvHo5YtsNXHtgbLg52iFBD7yjxq';

const CancelToken = axios.CancelToken;

// This function allow you to make GET request to backend with params we need
export const getAmadeusData = (params: IParam) => {
  // Destructuring params
  const { keyword = '', page = 0, token } = params;

  // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
  const searchQuery = keyword ? keyword : 'a';

  // This is extra tool for cancelation request, to avoid overload API
  const source = CancelToken.source();

  // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // GET request with all params we need
  const out = axios.get(
    `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${searchQuery}&page[limit]=1000&subType=AIRPORT&countryCode=US`,
    config
  );

  console.log(
    `https://test.api.amadeus.com/v1/reference-data/locations?keyword=${searchQuery}&page[limit]=1000&subType=AIRPORT&countryCode=US`
  );

  return { out, source };
};

export const getToken = async () => {
  const data = {
    client_id: 'lg5EGZ2abKtlOrvr76gkUBiGE4oHaIIM',
    client_secret: 'ncnHvwGgWZWtk9F9',
    grant_type: 'client_credentials',
  };

  const token = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    qs.stringify(data)
  );
  return token.data.access_token;
};
