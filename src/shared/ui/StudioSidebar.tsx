import type { ReactNode } from "react";
import {
  LocationIcon,
  ThemeIcon,
  StyleIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
} from "@/shared/ui/Icons";

type DesktopMode = "place" | "look" | "details";

const modes: {
  id: DesktopMode;
  label: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "place",
    label: "Place",
    title: "Place",
    description: "Anchor the poster to a real location and precise coordinates.",
    Icon: LocationIcon,
  },
  {
    id: "look",
    label: "Look",
    title: "Look",
    description: "Shape the palette, terrain, and print proportions together.",
    Icon: ThemeIcon,
  },
  {
    id: "details",
    label: "Details",
    title: "Details",
    description: "Refine typography, memories, and the final authored layer.",
    Icon: StyleIcon,
  },
];

interface StudioSidebarProps {
  activeMode: DesktopMode;
  onModeChange: (mode: DesktopMode) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  children: ReactNode;
}

export default function StudioSidebar({
  activeMode,
  onModeChange,
  collapsed,
  onToggleCollapse,
  children,
}: StudioSidebarProps) {
  const activeMeta = modes.find(({ id }) => id === activeMode) ?? modes[0];

  return (
    <aside
      className={`studio-sidebar${collapsed ? " is-collapsed" : ""}`}
      aria-label="Studio controls"
    >
      <div className="sidebar-rail">
        <div className="sidebar-rail-head">
          <span className="sidebar-rail-badge">AtlasInk</span>
        </div>

        <div className="sidebar-nav-group">
          {modes.map(({ id, label, Icon }) => {
            const isActive = activeMode === id;
            return (
              <button
                key={id}
                type="button"
                className={`sidebar-nav-tab${isActive ? " is-active" : ""}`}
                onClick={() => onModeChange(id)}
                title={collapsed ? label : undefined}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="sidebar-nav-indicator" aria-hidden="true" />
                <Icon className="sidebar-nav-icon" />
                <span className="sidebar-nav-label">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="sidebar-nav-footer">
          <button
            type="button"
            className="sidebar-nav-tab sidebar-collapse-btn"
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar ([)" : "Collapse sidebar ([)"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <SidebarExpandIcon className="sidebar-nav-icon" />
            ) : (
              <SidebarCollapseIcon className="sidebar-nav-icon" />
            )}
            <span className="sidebar-nav-label">Collapse</span>
          </button>
        </div>
      </div>

      <div className="sidebar-panel-container">
        <div className="sidebar-panel-head">
          <p className="sidebar-panel-kicker">Original Map Print Studio</p>
          <h2 className="sidebar-panel-title">{activeMeta.title}</h2>
          <p className="sidebar-panel-copy">{activeMeta.description}</p>
        </div>
        {children}
      </div>
    </aside>
  );
}
