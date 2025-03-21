import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
}

export const GameImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";
  return (
    <Image
      width={width}
      height={height}
      src={localSrc}
      alt={alt}
      className={className}
      style={style}
    />
  );
};
