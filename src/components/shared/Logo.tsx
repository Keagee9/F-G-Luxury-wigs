import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/logo-hero.png"
      alt="F&G Luxury Wigs Logo"
      width={40}
      height={40}
      className="h-8 w-8 md:h-10 md:w-10"
    />
  );
}
