import { useEffect, useRef } from "react";

export default function useClickOutside(ref, handler) {
  useEffect(() => {
    function e(event) {
      if (!ref.current || !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", e);
    document.addEventListener("touchstart", e);

    return () => {
      document.removeEventListener("mousedown", e);
      document.removeEventListener("touchstart", e);
    };
  }, []);

  return [ref, handler];
}
