import { InfoIcon } from "@/shared/ui/Icons";
import SocialLinkGroup from "@/shared/ui/SocialLinkGroup";

interface GeneralHeaderProps {
  onAboutOpen: () => void;
}

export default function GeneralHeader({ onAboutOpen }: GeneralHeaderProps) {
  return (
    <header className="general-header">
      <div className="desktop-brand">
        <img
          className="desktop-brand-logo brand-logo"
          src="/assets/logo.svg"
          alt="AtlasInk logo"
        />
        <div className="desktop-brand-copy brand-copy">
          <h1 className="desktop-brand-title">AtlasInk</h1>
          <p className="desktop-brand-kicker app-kicker">
            Turn places into art.
          </p>
        </div>
      </div>

      <div className="general-header-actions">
        <SocialLinkGroup variant="header" />
        <button
          type="button"
          className="general-header-text-btn general-header-about-text-btn"
          onClick={onAboutOpen}
          aria-label="Studio Info"
          title="Studio Info"
        >
          <span className="general-header-btn-label">Studio Info</span>
          <span className="general-header-btn-icon" aria-hidden="true">
            <InfoIcon />
          </span>
        </button>
      </div>
    </header>
  );
}
