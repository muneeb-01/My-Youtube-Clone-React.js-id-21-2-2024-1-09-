export const API_KEY = "AIzaSyA71_nXFw4aWMXHWRUE9y02KsZxf0K3oRE";

export const VALUE_CONVERTER = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};
