import { useRef } from "react";

const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollRight = (): void => {
    const container: HTMLDivElement | null = containerRef.current;
    if (container) {
      container.scrollLeft += container.offsetWidth;
    }
  };

  const scrollLeft = (): void => {
    const container: HTMLDivElement | null = containerRef.current;
    if (container) {
      container.scrollLeft -= container.offsetWidth;
    }
  };

  return {
    containerRef,
    scrollLeft,
    scrollRight,
  };
};

export default useHorizontalScroll;
