import Image from "next/image";

const artwork = {
  dancer: "/images/wes-dancer.png",
  elephant: "/images/kandyan-procession-elephant.png",
  scroll: "/images/kandyan-royal-scroll.png",
};

export default function KingdomArtwork({
  kind,
  className,
  sizes,
}: {
  kind: keyof typeof artwork;
  className: string;
  sizes: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative shrink-0 select-none ${className}`}>
      <Image
        src={artwork[kind]}
        alt=""
        fill
        sizes={sizes}
        className={`kingdom-artwork-bounce kingdom-artwork-${kind} object-contain drop-shadow-[0_10px_24px_rgba(212,175,55,0.12)]`}
      />
    </div>
  );
}
