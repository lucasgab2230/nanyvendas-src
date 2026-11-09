import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CreditCard,
  Flower2,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import { SiWhatsapp } from "react-icons/si";
import { STORE, firstVisitWhatsappLink, whatsappLink } from "../lib/whatsapp";
import { JewelPlate } from "./jewel-plate";
import { storeFaq, storeTerms } from "../../shared/store-content";

export function OtherCollections() {
  return (
    <section className="other-collections shell" aria-label="Outras coleções da Nany">
      <div className="other-collections-label">
        <h2>Mais da Nany para você.</h2>
      </div>
      <Link href="/lingerie" className="collection-link">
        <span className="collection-icon">
          <Flower2 size={28} strokeWidth={1.2} aria-hidden="true" />
        </span>
        <span>
          <strong>Lingerie</strong>
          <small>Um cuidado só seu, em cada detalhe</small>
        </span>
        <ArrowUpRight size={21} strokeWidth={1.3} aria-hidden="true" />
      </Link>
    </section>
  );
}

export function HowToBuy() {
  const steps = [
    {
      icon: Search,
      title: "Encontre o seu encanto",
      text: "Explore a vitrine, veja as fotos e salve suas favoritas no coração.",
    },
    {
      icon: Heart,
      title: "Escolha do seu jeito",
      text: "Peça uma peça pelo WhatsApp ou envie sua seleção em uma só mensagem.",
    },
    {
      icon: MessageCircle,
      title: "Converse com a Eliane",
      text: "Confirme os valores e a disponibilidade. Combine pagamento e entrega antes de concluir.",
    },
  ];
  return (
    <section className="how-section" id="como-comprar" aria-labelledby="how-title">
      <div className="shell">
        <div className="section-heading centered">
          <h2 id="how-title">
            Da sua escolha <em>para uma conversa.</em>
          </h2>
          <p>Sem cadastro. Sem pressa. Com alguém para te ajudar.</p>
        </div>
        <ol className="buy-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className="step-top">
                <span className="step-icon">
                  <step.icon size={24} strokeWidth={1.3} aria-hidden="true" />
                </span>
                <span className="step-number">0{index + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="payment-info" role="group" aria-label="Formas de pagamento">
          <CreditCard size={23} strokeWidth={1.3} aria-hidden="true" />
          <div>
            <p className="payment-methods">{storeTerms.payment}</p>
            <p className="payment-installments">{storeTerms.installments}</p>
          </div>
        </div>
        <a
          className="text-button how-contact"
          href={firstVisitWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          É sua primeira vez? A Eliane te ajuda a escolher{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function AboutOwner() {
  const image = "/images/images/20261004_192042.jpg";
  return (
    <section className="about-section shell" id="sobre" aria-labelledby="about-title">
      <div className="about-visual">
        <div className="about-image">
          <JewelPlate
            image={image}
            alt="A maleta rosa da Nany aberta, com colares e brincos fotografados pela loja"
          />
        </div>
        <span className="about-caption">
          <Heart size={16} aria-hidden="true" /> A maleta da Nany, cheia de detalhes.
        </span>
        <Flower2 className="about-flower" size={64} strokeWidth={1} aria-hidden="true" />
      </div>
      <div className="about-copy">
        <h2 id="about-title">
          Por trás de cada escolha,
          <br />
          <em>tem a Eliane.</em>
        </h2>
        <p>
          A Nany é uma consultora de vendas em Guarapuava — PR com atendimento de Whats e
          presencial para Guarapuava e Região. Agradecemos pela sua escolha. ❤️😉
        </p>
        <p>
          E o atendimento é de pessoa para pessoa. É com a Eliane que você tira dúvidas, confirma os
          detalhes e combina sua compra pelo WhatsApp.
        </p>
        <p className="about-warranty">
          <ShieldCheck size={22} strokeWidth={1.3} aria-hidden="true" />
          <span>{storeTerms.jewelryWarranty}</span>
        </p>
        <span className="about-location">
          <MapPin size={16} strokeWidth={1.5} aria-hidden="true" /> {STORE.city}
        </span>
        <a
          className="btn-secondary"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiWhatsapp size={17} aria-hidden="true" /> Quero conversar com a Eliane{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="faq-section" id="duvidas" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="faq-heading">
          <h2 id="faq-title">
            Tudo bem ter{" "}
            <br />
            <em>uma dúvida.</em>
          </h2>
          <p>Se a resposta não estiver aqui, a Eliane está a uma conversa de distância.</p>
          <a
            className="text-button"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Perguntar no WhatsApp <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="faq-items">
          {storeFaq.map((faq) => (
            <details key={faq.q}>
              <summary>
                <span>{faq.q}</span>
                <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" />
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="shell final-cta-inner">
        <span className="final-sparkle" aria-hidden="true">
          <Sparkles size={31} strokeWidth={1.1} />
        </span>
        <div>
          <h2>
            Vamos encontrar <em>o seu próximo encanto?</em>
          </h2>
          <p>Conte o que você procura. A Eliane te ajuda com o resto.</p>
        </div>
        <a
          className="btn-primary"
          href={firstVisitWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiWhatsapp size={18} aria-hidden="true" /> Falar com a Eliane{" "}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
