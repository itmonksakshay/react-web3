import { useMediaQuery } from "src/utils/useMediaQuery";

export function useMobile() {
  return !useMediaQuery("(min-width: 1024px)");
}
