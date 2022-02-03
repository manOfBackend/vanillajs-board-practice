import { createApiCall } from './Api.js';
import { REQUEST_URL } from '../constants/requestUrl.js';
export const fetchPages = async () => {
  try {
    const contents = await createApiCall('GET', REQUEST_URL.CONTENTS);

    return {
      isError: false,
      data: contents,
    };
  } catch (e) {
    return {
      isError: true,
      data: e,
    };
  }
};
