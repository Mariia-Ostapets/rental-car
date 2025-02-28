export const getShortId = id => {
  return id.slice(0, 4);
};

export const getCityAndCountry = address => {
  return address.split(', ').slice(-2);
};

export const getSpaceInMileage = mileage => {
  return mileage.toLocaleString();
};

export const getFirstLetterUpperCase = type => {
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};
