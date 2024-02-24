import { jwtLsName } from '../api/api-generated';

export const user = ref();

const parseJwt = () => {
  const jwt = localStorage.getItem(jwtLsName);

  if (jwt) {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return (user.value = JSON.parse(jsonPayload));
  }
};

parseJwt();
