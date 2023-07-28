import React, { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ImageWithFallbackProps {
  src: string | StaticImageData;
  fallback: string | StaticImageData;
  alt: string;
  fallbackAlt: string;
  classNames?: string;
  height?: number;
  width?: number;
}

const ImageWithFallback = ({
  src,
  fallback,
  alt,
  fallbackAlt,
  classNames = "",
  height,
  width,
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgAlt, setImgAlt] = useState(alt);

  return (
    <Image
      src={imgSrc}
      alt={imgAlt}
      width={width}
      height={height}
      onError={() => {
        setImgSrc(fallback);
        setImgAlt(fallbackAlt);
      }}
      className={classNames}
    />
  );
};

export default ImageWithFallback;
