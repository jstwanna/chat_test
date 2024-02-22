export const jwtLsName = "jwt";

export class ApiBase {
  protected transformOptions(options: RequestInit) {
    const jwt = window.localStorage.getItem(jwtLsName);

    if (jwt) {
      options.headers = {
        ...options.headers,
        authorization: " bearer " + jwt,
      };
    }

    return Promise.resolve(options);
  }
}
