import { useState } from "react";
import { usePosterContext } from "@/features/poster/ui/PosterContext";
import { useFormHandlers } from "@/features/poster/application/useFormHandlers";
import type { MobileStep } from "@/shared/ui/MobileNavBar";
import PlaceComposer from "@/shared/ui/PlaceComposer";

import MapSettingsSection from "@/features/map/ui/MapSettingsSection";
import LayersSection from "@/features/map/ui/LayersSection";
import MarkersSection from "@/features/markers/ui/MarkersSection";
import TypographySection from "@/features/poster/ui/TypographySection";

import { themeOptions } from "@/features/theme/infrastructure/themeRepository";
import { layoutGroups } from "@/features/layout/infrastructure/layoutRepository";
import {
  MIN_POSTER_CM,
  MAX_POSTER_CM,
  FONT_OPTIONS,
} from "@/core/config";

type ShellMode = Exclude<MobileStep, "export">;

interface SettingsPanelProps {
  mode: ShellMode;
  surface: "desktop" | "mobile";
}

export default function SettingsPanel({
  mode,
  surface,
}: SettingsPanelProps) {
  const { state, selectedTheme } = usePosterContext();
  const {
    handleChange,
    handleNumericFieldBlur,
    handleThemeChange,
    handleLayoutChange,
    handleColorChange,
    handleResetColors,
    handleCreditsChange,
  } = useFormHandlers();

  const [isColorEditorActive, setIsColorEditorActive] = useState(false);

  return (
    <form
      className={`shell-settings shell-settings--${surface}`}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="shell-settings__body">
        {mode === "place" ? (
          <section className="shell-section shell-section--place">
            <PlaceComposer
              variant={surface === "desktop" ? "inspector" : "mobile"}
            />
          </section>
        ) : null}

        {mode === "look" ? (
          <section className="shell-section shell-section--look">
            {!isColorEditorActive ? (
              <p className="shell-section__intro">
                Theme, terrain, and layout define the look.
              </p>
            ) : null}
            <MapSettingsSection
              activeMobileTab={mode}
              form={state.form}
              onChange={handleChange}
              onNumericFieldBlur={handleNumericFieldBlur}
              onThemeChange={handleThemeChange}
              onLayoutChange={handleLayoutChange}
              selectedTheme={selectedTheme}
              themeOptions={themeOptions}
              layoutGroups={layoutGroups}
              minPosterCm={MIN_POSTER_CM}
              maxPosterCm={MAX_POSTER_CM}
              customColors={state.customColors}
              onColorChange={handleColorChange}
              onResetColors={handleResetColors}
              onColorEditorActiveChange={setIsColorEditorActive}
            />
            {!isColorEditorActive ? (
              <div className="shell-subsection">
              <div className="shell-subsection__header">
                <p className="shell-subsection__eyebrow">Terrain</p>
                <h3 className="shell-subsection__title">
                  Choose which layers appear.
                </h3>
              </div>
                <LayersSection
                  form={state.form}
                  onChange={handleChange}
                  minPosterCm={MIN_POSTER_CM}
                  maxPosterCm={MAX_POSTER_CM}
                  onNumericFieldBlur={handleNumericFieldBlur}
                />
              </div>
            ) : null}
          </section>
        ) : null}

        {mode === "details" ? (
          <section className="shell-section shell-section--details">
            <div className="shell-subsection">
              <div className="shell-subsection__header">
                <p className="shell-subsection__eyebrow">Text</p>
                <h3 className="shell-subsection__title">
                  Adjust labels, credits, and type.
                </h3>
              </div>
              <TypographySection
                form={state.form}
                onChange={handleChange}
                fontOptions={FONT_OPTIONS}
                onCreditsChange={handleCreditsChange}
              />
            </div>

            <div className="shell-subsection">
              <div className="shell-subsection__header">
                <p className="shell-subsection__eyebrow">Memories</p>
                <h3 className="shell-subsection__title">
                  Add and edit memory pins.
                </h3>
              </div>
              <MarkersSection />
            </div>
          </section>
        ) : null}

        {state.error && !isColorEditorActive ? (
          <p className="error">{state.error}</p>
        ) : null}
      </div>
    </form>
  );
}
