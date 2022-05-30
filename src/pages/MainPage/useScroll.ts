import { useState, useEffect } from 'react';

export const useScroll = (ref: React.MutableRefObject<HTMLDivElement | undefined>) => {
  const [trigger, setTrigger] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (ref && (ref.current as unknown as HTMLDivElement).scrollTop) {
        setTrigger(true);
      } else {
        setTrigger(false);
      }
    };
    if (ref) {
      (ref.current as unknown as HTMLDivElement).addEventListener('scroll', handleScroll);
      return () => {
        if (ref.current) {
          (ref.current as unknown as HTMLDivElement).removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [trigger, ref]);
  return trigger;
};
