import type { ReactNode } from "react";
import {
  ThemeIcon,
  LayoutIcon,
  LayersIcon,
  MarkersIcon,
  StyleIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon
} from "@/shared/ui/Icons";
import type { MobileTab } from "@/shared/ui/MobileNavBar";

const tabs: {
  id: MobileTab;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "theme", label: "Style", Icon: ThemeIcon },
  { id: "layout", label: "Layout", Icon: LayoutIcon },
  { id: "style", label: "Typography", Icon: StyleIcon },
  { id: "layers", label: "Terrain", Icon: LayersIcon },
  { id: "markers", label: "Memories", Icon: MarkersIcon },
];

interface StudioSidebarProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  children: ReactNode;
}

export default function StudioSidebar({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  children
}: StudioSidebarProps) {
  return (
    <aside className={`studio-sidebar${collapsed ? " is-collapsed" : ""}`} aria-label="Studio Controls">
      <div className="sidebar-rail">
        <div className="sidebar-nav-group">
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                className={`sidebar-nav-tab${isActive ? " is-active" : ""}`}
                onClick={() => onTabChange(id)}
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
          {!collapsed && (
            <div className="sidebar-legal">
              AtlasInk™ Studio<br/>
              Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OSM</a>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-panel-container">
        {children}
      </div>
    </aside>
  );
}
