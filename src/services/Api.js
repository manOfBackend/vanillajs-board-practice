export const apiBaseRoute =
  'https://e6dcbf01-04b0-43b5-a2eb-244c91be3450.mock.pstmn.io/contents';

export const createApiCall = async ({
  method = 'GET',
  url = '',
  data = {},
}) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return fetch(`${apiBaseRoute}${url}`, {
    body: method === 'GET' ? undefined : JSON.stringify(data),
    cache: 'no-cache',
    headers,
    method,
  })
    .then((response) => response.json())
    .then((result) => result);
};
