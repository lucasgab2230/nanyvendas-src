import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ImageOff } from "lucide-react";
import { optimizedImage } from "../lib/catalog";

/** Fotos responsivas e completas: nenhum detalhe ou etiqueta fica cortado. */
export function JewelPlate({
  image,
  alt = "",
  className = "",
  children,
  large = false,
  priority = false,
}: {
  image?: string | null;
  alt?: string;
  className?: string;
  children?: ReactNode;
  large?: boolean;
  priority?: boolean;
  // Compatibilidade com os catálogos de outras coleções.
  category?: string;
  tone?: number;
  artClassName?: string;
  showSlotHint?: boolean;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isOptimized = image?.startsWith("/images/images/") && image.endsWith(".jpg");
  const failed = failedImage === image;
  const recoverImage = useCallback(
    (element: HTMLImageElement) => {
      if (!image) return;
      // Uma imagem nova ainda sem variantes pode usar a original.
      if (element.src.endsWith(".webp") && element.src !== new URL(image, document.baseURI).href) {
        element.removeAttribute("srcset");
        element.src = image;
      } else setFailedImage(image);
    },
    [image],
  );
  useEffect(() => {
    const element = imageRef.current;
    // A falha pode ter ocorrido antes de o React hidratar o HTML estático.
    if (image && element?.complete && element.naturalWidth === 0) recoverImage(element);
  }, [image, recoverImage]);
  return (
    <div className={`product-photo ${className}`}>
      {image && !failed ? (
        <img
          ref={imageRef}
          src={optimizedImage(image, large ? 960 : 480)}
          srcSet={
            isOptimized
              ? `${optimizedImage(image, 480)} 480w, ${optimizedImage(image, 960)} 960w, ${optimizedImage(image, 1600)} 1600w`
              : undefined
          }
          sizes={
            large
              ? "(max-width: 760px) 90vw, 48vw"
              : "(max-width: 540px) 45vw, (max-width: 1000px) 30vw, 300px"
          }
          alt={alt}
          loading={large ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width="480"
          height="480"
          onError={(event) => recoverImage(event.currentTarget)}
        />
      ) : (
        <div className="photo-unavailable">
          <ImageOff size={28} strokeWidth={1.2} aria-hidden="true" />
          <span>Foto indisponível</span>
          <small>Peça uma foto para a Eliane</small>
        </div>
      )}
      {children}
    </div>
  );
}
