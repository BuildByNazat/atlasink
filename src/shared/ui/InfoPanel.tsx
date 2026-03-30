import { useRepoStars } from "@/shared/hooks/useRepoStars";
import {
  REPO_URL,
  REPO_API_URL,
  CONTACT_EMAIL,
  LEGAL_NOTICE_URL,
  PRIVACY_URL,
  SOCIAL_LINKEDIN,
  SOCIAL_INSTAGRAM,
  SOCIAL_REDDIT,
  SOCIAL_THREADS,
  SOCIAL_YOUTUBE,
  KOFI_URL,
} from "@/core/config";
import {
  GitHubIcon,
  StarIcon,
  CheckIcon,
  KofiIcon,
  LinkedInIcon,
  InstagramIcon,
  RedditIcon,
  ThreadsIcon,
  YouTubeIcon,
} from "./Icons";

/* ── sub-components ── */

function HelpUsGrowSection({
  repoUrl,
  repoStars,
  repoStarsLoading,
}: {
  repoUrl: string;
  repoStars: number | null;
  repoStarsLoading: boolean;
}) {
  const starsText = repoStarsLoading
    ? "…"
    : repoStars !== null
      ? repoStars.toLocaleString()
      : null;

  const socialLinks = [
    {
      href: String(SOCIAL_LINKEDIN ?? "").trim(),
      Icon: LinkedInIcon,
      label: "LinkedIn",
    },
    {
      href: String(SOCIAL_INSTAGRAM ?? "").trim(),
      Icon: InstagramIcon,
      label: "Instagram",
    },
    {
      href: String(SOCIAL_REDDIT ?? "").trim(),
      Icon: RedditIcon,
      label: "Reddit",
    },
    {
      href: String(SOCIAL_THREADS ?? "").trim(),
      Icon: ThreadsIcon,
      label: "Threads",
    },
    {
      href: String(SOCIAL_YOUTUBE ?? "").trim(),
      Icon: YouTubeIcon,
      label: "YouTube",
    },
  ];
  const kofiUrl = String(KOFI_URL ?? "").trim();

  return (
    <section className="info-panel-section">
      <h3>Support the Studio</h3>
      <p className="hug-copy">
        AtlasInk is free, private, and runs entirely in your browser. If it adds
        value to your work, here's how you can support it.
      </p>

      <div className="hug-rows">
        {/* Support the project */}
        <div className="hug-row">
          <span className="hug-row-label">Open source</span>
          <div className="hug-row-content">
            {repoUrl ? (
              <a
                className="github-badge"
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open AtlasInk repository on GitHub"
              >
                <GitHubIcon className="badge-icon" />
                <span>GitHub Repo</span>
              </a>
            ) : (
              <span className="github-badge" style={{ opacity: 0.45 }}>
                <GitHubIcon className="badge-icon" />
                <span>GitHub Repo</span>
              </span>
            )}
            {repoUrl ? (
              <a
                className="github-badge stars-badge"
                href={`${repoUrl}/stargazers`}
                target="_blank"
                rel="noreferrer"
                aria-label="Star AtlasInk on GitHub"
              >
                <StarIcon className="badge-icon" />
                <span>{starsText !== null ? starsText : "Star"}</span>
              </a>
            ) : (
              <span
                className="github-badge stars-badge"
                style={{ opacity: 0.45 }}
              >
                <StarIcon className="badge-icon" />
                <span>Star</span>
              </span>
            )}
            {kofiUrl ? (
              <a
                className="github-badge"
                href={kofiUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Support AtlasInk on Ko-fi"
              >
                <KofiIcon className="badge-icon" />
                <span>Support on Ko-fi</span>
              </a>
            ) : (
              <span className="github-badge" style={{ opacity: 0.45 }}>
                <KofiIcon className="badge-icon" />
                <span>Support on Ko-fi</span>
              </span>
            )}
          </div>
        </div>

        {/* Spread the word */}
        <div className="hug-row">
          <span className="hug-row-label">Follow along</span>
          <div className="hug-row-content social-links-row">
            {socialLinks.map(({ href, Icon, label }) =>
              href ? (
                <a
                  key={label}
                  className="social-badge"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow AtlasInk on ${label}`}
                  title={label}
                >
                  <Icon className="social-icon" />
                </a>
              ) : (
                <span
                  key={label}
                  className="social-badge social-badge--inactive"
                  title={label}
                >
                  <Icon className="social-icon" />
                </span>
              ),
            )}
          </div>
        </div>

        {/* Support the mission */}
        <div className="hug-row">
          <span className="hug-row-label">Keep it visible</span>
          <div className="hug-row-content">
            <span className="hug-credits-note">
              <CheckIcon className="hug-check-icon" />
              Show the AtlasInk brand on your poster to help others find it
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AttributionSection({
  contactEmail,
  legalNoticeUrl,
  privacyUrl,
}: {
  contactEmail?: string;
  legalNoticeUrl?: string;
  privacyUrl?: string;
}) {
  const appVersion = String(import.meta.env.VITE_APP_VERSION ?? "0.0.0").trim();
  const hasLegal = Boolean(contactEmail || legalNoticeUrl || privacyUrl);

  return (
    <section className="about-section attribution-section">
      <h3 className="about-section-title">Credits & Legal</h3>
      <div className="about-section-content">
        <p className="attribution-text">
          AtlasInk™ v{appVersion} | © 2026<br/>
          Made with ❤︎ in Hannover, Germany
        </p>

        <p className="attribution-text">
          <strong>Map Data:</strong> &copy;{" "}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
            OpenStreetMap contributors
          </a>
        </p>

        <p className="attribution-text">
          <strong>Tiles & Routing:</strong> &copy;{" "}
          <a href="https://openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a>
          {" | "}Powered by{" "}
          <a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a>
          {", "}
          <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noreferrer">Nominatim</a>
          {" & "}
          <a href="https://maplibre.org/" target="_blank" rel="noreferrer">MapLibre</a>
        </p>

        {hasLegal ? (
          <p className="attribution-text" style={{ marginTop: '12px' }}>
            {contactEmail && <a href={`mailto:${contactEmail}`}>{contactEmail}</a>}
            {contactEmail && (legalNoticeUrl || privacyUrl) && " | "}
            {legalNoticeUrl && <a href={legalNoticeUrl} target="_blank" rel="noreferrer">Imprint</a>}
            {legalNoticeUrl && privacyUrl && " | "}
            {privacyUrl && <a href={privacyUrl} target="_blank" rel="noreferrer">Privacy Policy</a>}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ── main panel ── */

export default function InfoPanel() {
  const repoUrl = String(REPO_URL ?? "").trim();
  const { repoStars, repoStarsLoading } = useRepoStars(REPO_API_URL);
  
  const contactEmail = String(CONTACT_EMAIL ?? "").trim();
  const legalNoticeUrl = String(LEGAL_NOTICE_URL ?? "").trim();
  const privacyUrl = String(PRIVACY_URL ?? "").trim();

  return (
    <aside className="info-panel">
      <div className="info-panel-group">
        <HelpUsGrowSection
          repoUrl={repoUrl}
          repoStars={repoStars}
          repoStarsLoading={repoStarsLoading}
        />
        <AttributionSection 
          contactEmail={contactEmail}
          legalNoticeUrl={legalNoticeUrl}
          privacyUrl={privacyUrl}
        />
      </div>
    </aside>
  );
}
