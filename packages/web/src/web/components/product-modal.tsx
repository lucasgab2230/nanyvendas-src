import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Heart, Info, Share2, ZoomIn, ZoomOut } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { CatalogProduct } from "./product-card";
import { Dialog } from "./dialog";
import { JewelPlate } from "./jewel-plate";
import { useSelection } from "./selection-provider";
import { STORE, formatPrice, productWhatsappLink } from "../lib/whatsapp";
import { productUrl } from "../lib/catalog";
import { productPath } from "../../shared/seo";

export function ProductModal({
  product,
  categoryName,
  onClose,
  selectable = true,
}: {
  product: CatalogProduct | null;
  categoryName?: string;
  onClose: () => void;
  selectable?: boolean;
}) {
  const selection = useSelection();
  const [zoomed, setZoomed] = useState(false);
  const [manualShare, setManualShare] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  useEffect(() => {
    setZoomed(false);
    setManualShare(false);
    setSize(null);
  }, [product?.slug]);
  const saved = product ? selection.ids.includes(product.id) : false;
  const sizes = product?.sizes ?? [];
  const chosenSize = size && sizes.includes(size) ? size : sizes.length === 1 ? sizes[0]! : null;

  const share = async () => {
    if (!product) return;
    const url = productUrl(product.slug);
    try {
      if (navigator.share) {
        await navigator.share({ title: `${product.name} | Nany`, url });
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        selection.notify("Link da peça copiado. É só compartilhar!");
      } else setManualShare(true);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) setManualShare(true);
    }
  };

  return (
    <Dialog
      open={Boolean(product)}
      onClose={onClose}
      titleId="product-modal-title"
      className="product-dialog"
    >
      {product && (
        <div className="product-modal-layout">
          <div className={`product-modal-photo ${zoomed ? "photo-zoomed" : ""}`}>
            <JewelPlate image={product.image} alt={product.name} large />
            <button
              type="button"
              className="photo-zoom-button"
              onClick={() => setZoomed((value) => !value)}
              aria-label={zoomed ? "Diminuir foto" : "Ver de pertinho — ampliar foto"}
              aria-pressed={zoomed}
            >
              {zoomed ? (
                <ZoomOut size={18} aria-hidden="true" />
              ) : (
                <ZoomIn size={18} aria-hidden="true" />
              )}
              <span>{zoomed ? "Diminuir" : "Ver de pertinho"}</span>
            </button>
            <span className="photo-real-caption">Foto real da peça</span>
          </div>
          <div className="product-modal-info">
            <p className="product-modal-category">{categoryName ?? "Semijoias Nany"}</p>
            <h2 id="product-modal-title">{product.name}</h2>
            <p className="product-reference">
              {"codigo" in product && product.codigo
                ? `Código ${product.codigo} · Referência: ${product.slug}`
                : `Referência: ${product.slug}`}
            </p>
            <p className="modal-price">
              {product.price === null ? "Preço sob consulta" : formatPrice(product.price)}
            </p>
            <p className="modal-description">{product.description}</p>
            {product.sizes && (product.sizes.length > 0 || product.sizeNote) && (
              <div className="product-size-block">
                {product.sizes.length > 0 && (
                  <>
                    <p className="product-size-heading">
                      {product.sizes.length > 1 ? "Escolha o tamanho" : "Tamanho disponível"}
                    </p>
                    <div
                      className="size-picker"
                      role="group"
                      aria-label={`Tamanhos de ${product.name}`}
                    >
                      {product.sizes.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`size-option ${chosenSize === option ? "is-selected" : ""}`}
                          aria-pressed={chosenSize === option}
                          onClick={() => setSize(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {product.sizeNote && <p className="size-note">{product.sizeNote}</p>}
                {product.sizes.length > 1 && !chosenSize && (
                  <p className="size-note">Escolha o tamanho para enviar na mensagem à Eliane.</p>
                )}
              </div>
            )}
            <ul className="product-highlights">
              {product.highlights
                .filter((item) => !item.startsWith("Preço da etiqueta"))
                .map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    {item}
                  </li>
                ))}
            </ul>
            <div className="modal-actions">
              <a
                className="btn-whatsapp"
                href={productWhatsappLink(product, chosenSize)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiWhatsapp size={19} aria-hidden="true" />
                {product.price === null ? "Consultar no WhatsApp" : "Quero esta peça"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              {selectable && (
                <button
                  type="button"
                  className={`btn-secondary ${saved ? "selection-saved" : ""}`}
                  onClick={() => selection.toggle(product)}
                  aria-pressed={saved}
                >
                  <Heart size={18} fill={saved ? "currentColor" : "none"} aria-hidden="true" />
                  {saved ? "Salva na sua seleção" : "Salvar na minha seleção"}
                </button>
              )}
              {selectable && (
                <button
                  type="button"
                  className="text-button modal-share"
                  onClick={() => {
                    void share();
                  }}
                >
                  <Share2 size={16} aria-hidden="true" /> Compartilhar esta peça
                </button>
              )}
              {selectable && (
                <a className="text-button" href={productPath(product.slug)}>
                  Ver página completa da peça <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {manualShare && (
                <label className="manual-share">
                  Copie o link para compartilhar
                  <input
                    type="text"
                    aria-label="Copie o link para compartilhar"
                    readOnly
                    value={productUrl(product.slug)}
                    onFocus={(event) => event.currentTarget.select()}
                  />
                </label>
              )}
            </div>
            <p className="modal-disclaimer">
              <Info size={17} aria-hidden="true" />
              <span>
                A {STORE.owner} confirma disponibilidade, valor final, pagamento e entrega com você.
                Salvar não reserva a peça.
              </span>
            </p>
          </div>
        </div>
      )}
    </Dialog>
  );
}
