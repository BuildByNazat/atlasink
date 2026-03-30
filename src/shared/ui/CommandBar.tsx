import type { ReactNode } from "react";
import { InfoIcon, DownloadIcon, LoaderIcon } from "@/shared/ui/Icons";
import { useExport } from "@/features/export/application/useExport";
import { usePosterContext } from "@/features/poster/ui/PosterContext";

interface CommandBarProps {
  onAboutOpen: () => void;
  children?: ReactNode;
}

export default function CommandBar({ onAboutOpen, children }: CommandBarProps) {
  const { handleDownloadPng } = useExport();
  const { state } = usePosterContext();

  return (
    <header className="command-bar">
      <div className="command-bar-brand">
        <img
          className="command-bar-logo"
          src="/assets/logo.svg"
          alt="AtlasInk logo"
        />
        <h1 className="command-bar-wordmark">AtlasInk</h1>
        <p className="command-bar-kicker">Original map prints</p>
      </div>

      <div className="command-bar-center">{children}</div>

      <div className="command-bar-actions">
        <button
          type="button"
          className="command-export-btn"
          disabled={state.isExporting}
          onClick={() => void handleDownloadPng()}
          title="Export high-resolution PNG"
        >
          {state.isExporting ? (
            <LoaderIcon className="command-export-btn-icon is-spinning" />
          ) : (
            <DownloadIcon className="command-export-btn-icon" />
          )}
          <span>Print Export</span>
        </button>

        <button
          type="button"
          className="command-icon-btn"
          onClick={onAboutOpen}
          aria-label="Studio Info"
          title="Studio Info"
        >
          <InfoIcon />
        </button>
      </div>
    </header>
  );
}
