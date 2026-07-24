import Link from "next/link";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import { BiSolidHeart } from "react-icons/bi";
import { Typography } from "@/components/nowts/typography";

export const FloatingLegalFooter = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4
                    border-t border-border px-4 pt-2 pb-2
                    sm:flex-row lg:px-6">
      <Typography variant="muted" className="italic">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="/" className="text-orange-500">
          Unlcoaching{" "}
        </Link>
        Tous droits réservés.
        <br className="md:hidden" /> Crée avec{" "}
        <BiSolidHeart className="mx-1 inline-block text-red-600" />
        par{" "}
        <Link href="https://www.lemurian.agency" className="text-orange-500" target="_blank" rel="noopener noreferrer ">
          Andy Ramaroson
        </Link>
      </Typography>

      <div className="flex items-center gap-4">
        <Link
          className="text-xs text-muted-foreground hover:text-foreground
                     transition-colors hover:underline"
          href="/legal/cvg"
        >
          Cvg
        </Link>
        {/* <Link
          className="text-xs text-muted-foreground hover:text-foreground
                     transition-colors hover:underline"
          href="/legal/privacy"
        >
          Confidentialité
        </Link> */}
        <Link
          className="text-xs text-muted-foreground hover:text-foreground
                     transition-colors hover:underline"
          href="/legal/mentions"
        >
          Mentions légales
        </Link>
        <Link href="/docs" >
          <Image
            src={SiteConfig.appIcon}
            width={18}
            height={18}
            alt="app icon"            
            />
        </Link>
      </div>
    </div>
  );
};