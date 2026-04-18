"use client"

import { useEffect, useRef, useState } from "react";

type IphoneXProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function IPhoneX({ children, className = "" }: IphoneXProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const BASE_WIDTH = 1400;

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
    <div
      ref={wrapperRef}
      className="w-full flex justify-center items-center overflow-hidden"
    >
      <div
        className="w-fit"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        <div className="marvel-device iphone-x">
        <div className="notch">
          <div className="camera" />
          <div className="speaker" />
        </div>

        <div className="top-bar" />
        <div className="sleep" />
        <div className="bottom-bar" />
        <div className="volume" />

        <div className="overflow">
          <div className="shadow shadow--tr" />
          <div className="shadow shadow--tl" />
          <div className="shadow shadow--br" />
          <div className="shadow shadow--bl" />
        </div>

        <div className="inner-shadow" />

        <div className="screen">{children}</div>
        </div>
      </div>
    </div>
  );
};