import { cn } from "@/lib/utils";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";

type ImageMagnifierProps = {
  src: string;
};

const ImageMagnifier = ({ src }: ImageMagnifierProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseHover = (e: React.MouseEvent) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
    console.log(e.pageX);
    console.log(left);
  };

  return (
    <div
      className="relative w-80 min-h-80 rounded-lg"
      onMouseEnter={() => {
        setShowMagnifier(true);
      }}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
    >
      <Image
        src={src}
        alt="image"
        sizes={"1"}
        fill
        className={cn("object-contain rounded-lg", showMagnifier && "hidden")}
      />

      {showMagnifier && (
        <div
          className={"absolute rounded-lg w-80 min-h-80"}
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
