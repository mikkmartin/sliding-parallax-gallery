import { useRef, useEffect, useState } from "react";
import elementResizeEvent from "element-resize-event";

interface ElementSize extends DOMRect {
  spaceWidth: number;
}
type UseSizeType = [ElementSize, React.RefObject<HTMLElement>];
export function useSize(): UseSizeType {
  const elementRef = useRef<HTMLElement>(null);

  const [size, setSize] = useState({
    ...new DOMRect().toJSON(),
    spaceWidth: 0
  });
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect() as DOMRect;
      const style = window.getComputedStyle(el);
      const margin =
        parseFloat(style.marginLeft as string) +
        parseFloat(style.marginRight as string);
      const width = el.offsetWidth;
      setSize({
        ...rect.toJSON(),
        left: el.offsetLeft,
        width,
        spaceWidth: width + margin
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return [size, elementRef];
}
