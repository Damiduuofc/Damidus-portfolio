import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  // Count 0 → 90% over ~2s, hold at 90% until the page has really loaded,
  // then finish to 100% (which the Loading screen reacts to)
  useEffect(() => {
    const DURATION = 2000;
    const start = performance.now();
    let pageLoaded = document.readyState === "complete";
    let shown = 0;
    let frame = 0;

    const onLoad = () => {
      pageLoaded = true;
    };
    window.addEventListener("load", onLoad);

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      let next = Math.round(eased * 90);
      if (t === 1 && pageLoaded) next = shown + 1;
      next = Math.min(Math.max(next, shown), 100);

      if (next !== shown) {
        shown = next;
        setLoading(shown);
      }
      if (shown < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
