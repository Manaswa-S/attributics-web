import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_PREFIX = "scroll:";

const getStorageKey = (location) => {
  const search = location.search || "";
  return `${location.pathname}${search}`;
};

const clearAllScrollPositions = () => {
  const keysToRemove = [];
  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => sessionStorage.removeItem(key));
};

const ScrollRestoration = () => {
  const location = useLocation();
  const positionsRef = useRef(new Map());

  useEffect(() => {
    const handleUnload = () => {
      clearAllScrollPositions();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useLayoutEffect(() => {
    const key = getStorageKey(location);
    const shouldReset = location.state?.scroll === "reset";
    const saved = positionsRef.current.get(key) ?? sessionStorage.getItem(STORAGE_PREFIX + key);

    if (!shouldReset && saved !== null && saved !== undefined) {
      window.scrollTo(0, Number(saved));
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key]);

  useEffect(() => {
    const key = getStorageKey(location);
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        positionsRef.current.set(key, y);
        sessionStorage.setItem(STORAGE_PREFIX + key, String(y));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.key]);

  return null;
};

export default ScrollRestoration;
