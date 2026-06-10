import { useSearchParams } from "react-router-dom";

export function useVanFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  function handleFilterChange(key: string, value: string | null) {
    setSearchParams((prev) => {
      if (value === null) {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  }

  return { typeFilter, handleFilterChange };
}
