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

export const handleMileageInput = (value, word) => {
  if (value === word) return '';

  const mileageStr = value.startsWith(word) ? clearMileageInput(value) : value;

  if (!mileageStr) return '';

  const symbol = ',';
  return `${word}${
    mileageStr.length > 1
      ? mileageStr[0] + symbol + mileageStr.slice(1)
      : mileageStr
  }`;
};

export const clearMileageInput = value =>
  value ? value.split(' ')[1]?.replace(/,/g, '') : '';
