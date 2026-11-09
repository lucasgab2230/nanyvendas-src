import type { CategorySlug } from "../../api/catalog/products";

type ArtCategory = CategorySlug | "todas" | "presente";

/**
 * Arte vetorial dourada de cada categoria.
 *
 * Enquanto as fotos reais não existem, é isso que aparece nas peças e na
 * maleta do banner — traço fino, ouro, fundo escuro. Nada de banco de imagens:
 * quando a Eliane mandar as fotos, cada `image` do catálogo assume o lugar.
 */
export function JewelArt({ category, className }: { category: ArtCategory; className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="jewel-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a6a21" />
          <stop offset="45%" stopColor="#ebd79a" />
          <stop offset="100%" stopColor="#c9a24a" />
        </linearGradient>
      </defs>
      <g stroke="url(#jewel-gold)">
        {category === "aneis" && (
          <>
            <circle cx="60" cy="74" r="25" />
            <circle cx="60" cy="74" r="20.5" opacity="0.45" />
            <path d="M60 49 52 37l8-9 8 9-8 12Z" />
            <path d="M52 37h16M60 28v21M52 37l8 12 8-12" opacity="0.6" />
          </>
        )}

        {category === "colares" && (
          <>
            <path d="M16 32c0 26 20 44 44 44s44-18 44-44" />
            <path d="M23 32c0 22 17 37 37 37s37-15 37-37" opacity="0.4" />
            <circle cx="60" cy="76" r="4.5" opacity="0.7" />
            <path d="M60 81.5 53 92l7 9 7-9-7-10.5Z" />
            <path d="M53 92h14" opacity="0.55" />
          </>
        )}

        {category === "pulseiras" && (
          <>
            <ellipse cx="60" cy="56" rx="38" ry="22" />
            <ellipse cx="60" cy="56" rx="32" ry="17" opacity="0.35" />
            <circle cx="22" cy="56" r="4.5" />
            <circle cx="98" cy="56" r="4.5" />
            <circle cx="60" cy="78" r="4.5" />
            <path d="M60 82v9l-6 7 6 12 6-12-6-7v-9" opacity="0.8" />
          </>
        )}

        {(category === "todas" || category === "presente") && (
          <>
            <path d="M60 30 44 50h32L60 30Z" />
            <path d="M44 50h32l-16 40L44 50Z" />
            <path d="M60 30v60M44 50h32" opacity="0.55" />
            <path d="M28 96c8-6 16-9 32-9s24 3 32 9" opacity="0.45" />
          </>
        )}
      </g>
    </svg>
  );
}
