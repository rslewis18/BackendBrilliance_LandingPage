import { Link } from "react-router-dom";
import { LINKS } from "../config/links";
import { OFFER_CONFIG } from "../config/offers";

type SimpleHeaderProps = {
  showSupport?: boolean;
};

export function SimpleHeader({ showSupport = true }: SimpleHeaderProps) {
  return (
    <header className="simple-header">
      <Link className="brand" to={OFFER_CONFIG.routes.home} aria-label="Backend Brilliance home">
        <img src="/backend-brilliance-logo.png" alt="" />
        <span>
          <strong>Backend Brilliance</strong>
          <small>Client Acquisition Systems</small>
        </span>
      </Link>

      {showSupport && (
        <a className="simple-support-link" href={LINKS.supportEmail}>
          Need help?
        </a>
      )}
    </header>
  );
}
