import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.scss";

interface LogoProps {
  inverse?: boolean;
  large?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Logo({
  inverse = false,
  large = false,
  className,
  onClick,
}: LogoProps) {
  const width = large ? 140 : 96;
  const height = large ? 124 : 85;

  return (
    <Link
      href="/"
      onClick={onClick}
      className={[
        styles.logo,
        inverse ? styles.inverse : "",
        large ? styles.large : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Hotel The Taksonz — home"
    >
      <Image
        src="/logo.png"
        alt="Hotel The Taksonz"
        width={width}
        height={height}
        priority
        className={styles.image}
      />
    </Link>
  );
}
