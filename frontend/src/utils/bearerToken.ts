export const BearerToken = (token: string, isFile?: boolean) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFile ? { "Content-Type": "multipart/form-data" } : {}),
    },
  };
};
