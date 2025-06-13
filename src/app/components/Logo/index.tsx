import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <Image src={logo} width={400} alt="Logo do site" priority />
      </Link>
    </div>
  );
};

export default Logo;
