import Image from "next/image";
import Link from "next/link";

type StickyAuthorCardProps = {
  name: string;
  role?: string;
  avatarUrl: string;
  bio: string;
  phone?: string;
};

export function StickyAuthorCard({ name, role, avatarUrl, bio, phone }: StickyAuthorCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-neutral-900 p-6 text-center shadow-lg shadow-black/30">
      <Image
        src={avatarUrl}
        alt={name}
        width={80}
        height={80}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-orange-500/30"
      />
      <p className="text-white font-semibold text-base leading-tight">{name}</p>
      {role && <p className="text-sm text-white/50 leading-tight">{role}</p>}
      <p className="text-sm text-white/70 leading-relaxed">{bio}</p>
      {phone && (
        <p className="text-sm font-medium text-orange-500">{phone}</p>
      )}
      <Link
        href="/#begin"
        className="mt-3 w-full rounded-md bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
      >
        Programmes
      </Link>
    </div>
  );
}