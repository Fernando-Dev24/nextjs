import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
}: Props) => {
  const localSrc = src
    ? src.startsWith("http") // la imagen viene de internet
      ? src
      : `/products/${src}` //  la imagen viene de local
    : "/imgs/placeholder.jpg"; // no tiene imagen

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
    />
  );
};
