interface IAirportState {
  aLoading: boolean;
  bLoading: boolean;
  aOptions: Array<IOption>;
  bOptions: Array<IOption>;
  aKeyword: string;
  bKeyword: string;
}

interface IOption {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: any;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: IGeoCode;
  address: IAddress;
  analytics: any;
}

interface IGeoCode {
  latitude: number;
  longitude: number;
}

interface IAddress {
  cityName: string;
  cityCode: string;
  countryName: string;
  couontryCode: string;
  stateCode: string;
  regionCode: string;
}

interface IResponse {
  meta: IMeta;
  data: Array<IOption>;
}

interface IMeta {
  count: number;
  links: any;
}
