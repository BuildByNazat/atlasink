import { createPortal } from "react-dom";
import { KOFI_URL } from "@/core/config";

interface SupportModalProps {
  posterNumber: number;
  onClose: () => void;
  titleId?: string;
}

export default function SupportModal({
  posterNumber,
  onClose,
  titleId = "export-support-modal-title",
}: SupportModalProps) {
  const kofiUrl = String(KOFI_URL ?? "").trim();

  return createPortal(
    <div
      className="picker-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="picker-modal credits-confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="credits-modal-body">
          <p className="credits-modal-headline" id={titleId}>
            Your print is ready.
          </p>
          <p className="credits-modal-text">
            Poster <strong>#{posterNumber}</strong> — thank you for creating with AtlasInk.
          </p>
          {kofiUrl ? (
            <p className="credits-modal-text">
              If AtlasInk has been useful, a small contribution keeps it free for everyone.
            </p>
          ) : null}
          <div className="credits-modal-actions">
            {kofiUrl ? (
              <a
                className="credits-modal-keep"
                href={kofiUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="heart">❤︎</span> Support on Ko-fi
              </a>
            ) : null}
            <button
              type="button"
              className="credits-modal-remove"
              onClick={onClose}
            >
              {kofiUrl ? "Not now" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
