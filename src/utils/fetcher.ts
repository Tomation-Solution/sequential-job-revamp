import { useQuery } from "react-query";

export const useCustomFetcher = <T>(
  key: string,
  fetcherfn: (data?: any) => Promise<any>,
  select?: (data: any) => any
): { loadingState: boolean; isError: boolean; data: T | undefined } => {
  const options: any = {
    refetchOnWindowFocus: false,
  };

  if (select) {
    options.select = select;
  } else {
    options.select = (data: any) => data.data;
  }

  const { isLoading, isFetching, isError, data } = useQuery<T>(
    key,
    fetcherfn,
    options
  );

  const loadingState = isLoading || isFetching;

  return { loadingState, isError, data };
};
