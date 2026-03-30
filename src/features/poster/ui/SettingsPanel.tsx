import { useState } from "react";
import { usePosterContext } from "@/features/poster/ui/PosterContext";
import { useFormHandlers } from "@/features/poster/application/useFormHandlers";
import { useLocationAutocomplete } from "@/features/location/application/useLocationAutocomplete";
import { useCurrentLocation } from "@/features/location/application/useCurrentLocation";
import { useMapSync } from "@/features/map/application/useMapSync";
import type { MobileTab } from "@/shared/ui/MobileNavBar";

import LocationSection from "@/features/location/ui/LocationSection";
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
import type { SearchResult } from "@/features/location/domain/types";

export default function SettingsPanel({
  mobileTab,
}: {
  mobileTab?: MobileTab;
}) {
  const { state, selectedTheme } = usePosterContext();
  const {
    handleChange,
    handleNumericFieldBlur,
    handleThemeChange,
    handleLayoutChange,
    handleColorChange,
    handleResetColors,
    handleLocationSelect,
    handleClearLocation,
    setLocationFocused,
    handleCreditsChange,
  } = useFormHandlers();
  const { locationSuggestions, isLocationSearching, searchNow } = useLocationAutocomplete(
    state.form.location,
    state.isLocationFocused,
  );
  const { flyToLocation } = useMapSync();
  const { handleUseCurrentLocation, isLocatingUser, locationPermissionMessage } =
    useCurrentLocation(flyToLocation);

  const [isColorEditorActive, setIsColorEditorActive] = useState(false);

  // When color editor is active, auxiliary settings are paused
  const isAuxEditorActive = isColorEditorActive;
  const showLocationSuggestions =
    state.isLocationFocused && locationSuggestions.length > 0;

  const onLocationSelect = (location: SearchResult) => {
    handleLocationSelect(location);
    flyToLocation(location.lat, location.lon);
  };

  return (
    <form className="settings-panel" onSubmit={(e) => e.preventDefault()}>
      <div className="mobile-section mobile-section--location">
        <div className="section-body-inner">
          {!isColorEditorActive ? (
            <LocationSection
              form={state.form}
              onChange={handleChange}
              onLocationFocus={() => setLocationFocused(true)}
              onLocationBlur={() => setLocationFocused(false)}
              searchNow={searchNow}
              showLocationSuggestions={showLocationSuggestions}
              locationSuggestions={locationSuggestions}
              isLocationSearching={isLocationSearching}
              onLocationSelect={onLocationSelect}
              onClearLocation={handleClearLocation}
              onUseCurrentLocation={handleUseCurrentLocation}
              isLocatingUser={isLocatingUser}
              locationPermissionMessage={locationPermissionMessage}
            />
          ) : null}
        </div>
      </div>

      <div className="mobile-section mobile-section--theme-settings">
        <div className="section-body-inner">
          {!isColorEditorActive ? (
            <MapSettingsSection
              activeMobileTab={mobileTab}
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
          ) : null}
        </div>
      </div>

      <div className="mobile-section mobile-section--layout-settings">
        <div className="section-body-inner">
          {!isColorEditorActive ? (
            <MapSettingsSection
              activeMobileTab={mobileTab}
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
          ) : null}
        </div>
      </div>

      <div className="mobile-section mobile-section--layers">
        <div className="section-body-inner">
          {!isAuxEditorActive ? (
            <LayersSection
              form={state.form}
              onChange={handleChange}
              minPosterCm={MIN_POSTER_CM}
              maxPosterCm={MAX_POSTER_CM}
              onNumericFieldBlur={handleNumericFieldBlur}
            />
          ) : null}
        </div>
      </div>

      <div className="mobile-section mobile-section--markers">
        <div className="section-body-inner">
          {!isColorEditorActive ? <MarkersSection /> : null}
        </div>
      </div>

      <div className="mobile-section mobile-section--style">
        <div className="section-body-inner">
          {!isAuxEditorActive ? (
            <TypographySection
              form={state.form}
              onChange={handleChange}
              fontOptions={FONT_OPTIONS}
              onCreditsChange={handleCreditsChange}
            />
          ) : null}
        </div>
      </div>

      {!isAuxEditorActive && state.error ? <p className="error">{state.error}</p> : null}
    </form>
  );
}
