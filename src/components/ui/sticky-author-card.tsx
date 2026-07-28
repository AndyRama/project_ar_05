import Image from "next/image";
import Link from "next/link";

type StickyAuthorCardProps = {
  name: string;
  role?: string;
  avatarUrl: string;
  bio: string;
};

export function StickyAuthorCard({ name, role, avatarUrl, bio }: StickyAuthorCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-black/10 bg-white p-6 text-center">
      <Image
        src={avatarUrl}
        alt={name}
        width={80}
        height={80}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-orange-600/20"
      />
      <p className="text-black font-semibold text-base leading-tight">{name}</p>
      {role && <p className="text-sm text-black/60 leading-tight">{role}</p>}
      <p className="text-sm text-black/70 leading-relaxed">{bio}</p>
      <a
        href="tel:0671787253"
        className="mt-2 text-sm font-medium text-orange-600 hover:text-orange-700"
      >
        06 xx xx xx xx
      </a>
      <Link
        href="/#begin"
        className="mt-3 w-full rounded-md bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
      >
        Programmes
      </Link>
    </div>
  );
}