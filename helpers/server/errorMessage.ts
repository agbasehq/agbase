export const getErrorMessage = (error: any) => {
  if (error?.message) {
    return error.message;
  }

  return "Unknown server error";
};