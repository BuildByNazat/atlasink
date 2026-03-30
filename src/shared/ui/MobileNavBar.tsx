import {
  LocationIcon,
  ThemeIcon,
  DownloadIcon,
  StyleIcon,
} from "./Icons";

export type MobileStep = "place" | "look" | "details" | "export";

const tabs: {
  id: MobileStep;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "place", label: "Place", Icon: LocationIcon },
  { id: "look", label: "Look", Icon: ThemeIcon },
  { id: "details", label: "Details", Icon: StyleIcon },
  { id: "export", label: "Export", Icon: DownloadIcon },
];

interface MobileNavBarProps {
  activeStep: MobileStep;
  drawerOpen: boolean;
  onStepChange: (step: MobileStep) => void;
}

export default function MobileNavBar({
  activeStep,
  drawerOpen,
  onStepChange,
}: MobileNavBarProps) {
  return (
    <div className="mobile-nav-wrapper">
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav-tabs">
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeStep === id;
            return (
              <button
                key={id}
                type="button"
                className={`mobile-nav-tab${isActive ? " is-active" : ""}`}
                onClick={() => onStepChange(id)}
                aria-current={activeStep === id ? "page" : undefined}
                aria-expanded={id === "export" ? undefined : drawerOpen && activeStep === id}
              >
                <Icon className="mobile-nav-icon" />
                <span className="mobile-nav-label">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
