import { useEffect, useState } from 'react';
import { useLayoutEffectUnsafe } from '../unsafeHooks';

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffectUnsafe(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  useEffect(() => {
    const browserWidth = size[0];
    const mobileMaxWidth = 500;
    if (browserWidth <= mobileMaxWidth && !isMobile) {
      setIsMobile(true);
    }
    if (browserWidth > mobileMaxWidth && isMobile) {
      setIsMobile(false);
    }
  }, [isMobile, size]);

  return { browserWidth: size[0], browserHeight: size[1], isMobile };
}
