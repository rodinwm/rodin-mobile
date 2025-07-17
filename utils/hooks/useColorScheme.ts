import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * Custom hook to get the current color scheme (light or dark).
 * NB: To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme(): "light" | "dark" {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => setHasHydrated(true), []);

  const colorScheme = useRNColorScheme() ?? "dark";

  return hasHydrated ? colorScheme : "dark"; // Fallback to dark mode if not hydrated
}
