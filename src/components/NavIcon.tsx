// import logo from "./src/app/assets/icon.png";
import Image from "next/image";

const iconPath = "/favicon.png";

export default function NavIcon() {
  return <Image src={iconPath} width={64} height={64} alt="Ousadia" />;
}

export function FooterIcon() {
  return (
    <Image src="/assets/Logomarca.png" width={200} height={200} alt="Ousadia" />
  );
}
