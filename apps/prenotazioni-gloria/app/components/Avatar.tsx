/**
 * Avatar tipografico per il team.
 * Iniziale in Cormorant Garamond italica grande, su sfondo sand
 * con un sottile bordo color oro.
 */

type AvatarProps = {
  initial: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm: { box: "w-12 h-12", text: "text-3xl" },
  md: { box: "w-16 h-16", text: "text-4xl" },
  lg: { box: "w-24 h-24", text: "text-6xl" },
  xl: { box: "w-full aspect-[3/4]", text: "text-[7rem] md:text-[9rem]" },
};

export function Avatar({ initial, size = "md", className = "" }: AvatarProps) {
  const s = sizes[size];
  return (
    <div
      className={`${s.box} relative bg-[var(--color-sand)] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Decorative inner frame */}
      <div className="absolute inset-2 border border-[var(--color-gold)]/20 pointer-events-none" />
      {/* Subtle gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--color-rose)]/20 pointer-events-none" />
      <span
        className={`font-display ${s.text} text-[var(--color-gold-dark)] italic font-medium relative z-10 select-none`}
        style={{ lineHeight: 1 }}
      >
        {initial}
      </span>
    </div>
  );
}
