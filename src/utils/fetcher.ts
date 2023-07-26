import { useQuery } from "react-query";

export const useCustomFetcher = <T>(
  key: string,
  fetcherfn: (data?: any) => Promise<any>,
  select?: (data: any) => any,
  otherOptions?: any
): {
  loadingState: boolean;
  isError: boolean;
  data: T | undefined;
  error: any;
} => {
  const options: any = {
    refetchOnWindowFocus: false,
    ...otherOptions,
  };

  if (select) {
    options.select = select;
  } else {
    options.select = (data: any) => data.data;
  }

  const { isLoading, isFetching, isError, data, error } = useQuery<T>(
    key,
    fetcherfn,
    options
  );

  const loadingState = isLoading || isFetching;

  return { loadingState, isError, data, error };
};
