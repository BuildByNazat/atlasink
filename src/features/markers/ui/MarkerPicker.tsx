import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import type { MarkerIconDefinition } from "@/features/markers/domain/types";
import {
  featuredMarkerIcons,
  predefinedMarkerIcons,
} from "@/features/markers/infrastructure/iconRegistry";
import MarkerVisual from "./MarkerVisual";

interface MarkerPickerProps {
  selectedIconId?: string;
  markerColor: string;
  customIcons: MarkerIconDefinition[];
  onIconClick: (iconId: string) => void;
  onUploadIcon?: (file: File) => void | Promise<void>;
  onRemoveUploadedIcon?: (iconId: string) => void;
  onClearUploadedIcons?: () => void;
  actionSlot?: ReactNode;
}

export default function MarkerPicker({
  selectedIconId,
  markerColor,
  customIcons,
  onIconClick,
  onUploadIcon,
  onRemoveUploadedIcon,
  onClearUploadedIcons,
  actionSlot,
}: MarkerPickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const appIcons = useMemo(() => predefinedMarkerIcons, []);
  const shouldShowAllIcons =
    isExpanded ||
    (selectedIconId
      ? !appIcons.some((icon) => icon.id === selectedIconId)
      : false);
  const visibleAppIcons = shouldShowAllIcons ? appIcons : featuredMarkerIcons;

  const handleUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !onUploadIcon) {
      return;
    }

    if (
      !file.type.startsWith("image/") &&
      !file.name.toLowerCase().endsWith(".svg")
    ) {
      setUploadError("Please upload an image or SVG file.");
      return;
    }

    setUploadError("");
    setIsExpanded(true);

    try {
      await onUploadIcon(file);
    } catch {
      setUploadError("Upload failed. Please try again.");
    }
  };

  return (
    <div className="marker-picker">
      <p className="marker-picker__section-title">Symbol Library</p>
      <div className="marker-picker__grid">
        {visibleAppIcons.map((icon) => (
          <button
            key={icon.id}
            type="button"
            className={`marker-picker__option${
              selectedIconId === icon.id ? " is-selected" : ""
            }`}
            onClick={() => onIconClick(icon.id)}
            title={icon.label}
          >
            <MarkerVisual icon={icon} size={30} color={markerColor} />
            <span className="marker-picker__label">{icon.label}</span>
          </button>
        ))}
        {appIcons.length > featuredMarkerIcons.length ? (
          <button
            type="button"
            className="marker-picker__option marker-picker__option--toggle"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={shouldShowAllIcons ? "Collapse symbols" : "Show all symbols"}
          >
            <span className="marker-picker__toggle-sign" aria-hidden="true">
              {shouldShowAllIcons ? "-" : "+"}
            </span>
            <span className="marker-picker__label">
              {shouldShowAllIcons ? "Collapse" : "Show all"}
            </span>
          </button>
        ) : null}
      </div>

      <p className="marker-picker__section-title">Custom Symbols</p>
      <div className="marker-picker__grid marker-picker__grid--uploaded">
        {customIcons.map((icon) => (
          <button
            key={icon.id}
            type="button"
            className={`marker-picker__option marker-picker__option--uploaded${
              selectedIconId === icon.id ? " is-selected" : ""
            }`}
            onClick={() => onIconClick(icon.id)}
            title={icon.label}
          >
            {onRemoveUploadedIcon ? (
              <span
                role="button"
                tabIndex={0}
                className="marker-picker__remove-uploaded"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveUploadedIcon(icon.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemoveUploadedIcon(icon.id);
                  }
                }}
                aria-label={`Remove ${icon.label}`}
                title="Remove symbol"
              >
                x
              </span>
            ) : null}
            <MarkerVisual icon={icon} size={30} color={markerColor} />
            <span className="marker-picker__label">{icon.label}</span>
          </button>
        ))}

        {onUploadIcon ? (
          <>
            <button
              type="button"
              className="marker-picker__option marker-picker__option--upload-tile"
              onClick={() => inputRef.current?.click()}
              title="Upload a custom symbol"
            >
              <span className="marker-picker__upload-plus" aria-hidden="true">
                +
              </span>
              <span className="marker-picker__label">Upload Symbol</span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".svg,image/*"
              className="marker-picker__file-input"
              onChange={handleUploadChange}
            />
          </>
        ) : null}
      </div>

      <div className="marker-picker__actions">
        {onClearUploadedIcons && customIcons.length > 0 ? (
          <button
            type="button"
            className="marker-picker__upload marker-picker__clear-uploaded"
            onClick={onClearUploadedIcons}
          >
            Clear custom symbols
          </button>
        ) : null}
      </div>

      <div className="marker-picker__divider marker-picker__divider--actions" />

      <div className="marker-picker__actions">
        {actionSlot}
      </div>

      {uploadError ? <p className="marker-picker__error">{uploadError}</p> : null}
    </div>
  );
}
