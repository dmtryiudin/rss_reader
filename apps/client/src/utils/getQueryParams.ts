export const getQueryParams = (params: object) => {
  let res = '';

  for (const paramName in params) {
    const currentParam = params[paramName as keyof typeof params];
    if (currentParam !== null && currentParam !== undefined) {
      const currParamString =
        typeof currentParam !== 'string'
          ? JSON.stringify(currentParam)
          : currentParam;
      if (res.length) {
        res += `&${paramName}=${currParamString}`;
      } else {
        res += `?${paramName}=${currParamString}`;
      }
    }
  }

  return res;
};
