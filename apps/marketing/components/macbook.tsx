"use client"

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ResponsiveMacbook({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const BASE_WIDTH = 1300;

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return;

      const parentWidth = wrapperRef.current.offsetWidth;
      setScale(parentWidth / BASE_WIDTH);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
  <div ref={wrapperRef} className="flex justify-center pt-32">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <div className="marvel-device macbook">
          <div className="top-bar" />
          <div className="camera" />
          <div className="screen">{children}</div>
          <div className="bottom-bar" />
        </div>
      </div>
    </div>
  );
};