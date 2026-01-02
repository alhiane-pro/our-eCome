import { useEffect, useEffectEvent, useState } from "react";

const useHeaderRight = (totalQuantity: number) => {
  const [isAnimate, setIsAnimate] = useState(false);

  // const totalQuantity = useAppSelector(getCartTotalQuantitySelector);

  const triggerAnimation = useEffectEvent(() => {
    setIsAnimate(true);
    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);
    return () => clearTimeout(debounce);
  });

  useEffect(() => {
    if (totalQuantity > 0) {
      // capture cleanup returned by triggerAnimation and return it from effect
      const cleanUp = triggerAnimation();
      return cleanUp;
    }
    // if no animation triggered, nothing to cleanup
    return;
  }, [totalQuantity]);

  return { isAnimate };
};

export default useHeaderRight;
