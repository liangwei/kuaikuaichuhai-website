'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = ''
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let startTime: number | null = null;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用 easeOutCubic 缓动函数
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = startValue + (end - startValue) * easeOutCubic;

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  const formatNumber = (num: number) => {
    // 如果是整数，不显示小数
    if (Number.isInteger(end)) {
      return Math.round(num).toString();
    }
    // 如果原始值有小数，保留一位小数
    return num.toFixed(1);
  };

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
