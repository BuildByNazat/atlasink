import { useMemo } from "react";
import { usePosterContext } from "@/features/poster/ui/PosterContext";
import { useFormHandlers } from "@/features/poster/application/useFormHandlers";
import { useLocationAutocomplete } from "@/features/location/application/useLocationAutocomplete";
import { useCurrentLocation } from "@/features/location/application/useCurrentLocation";
import { useMapSync } from "@/features/map/application/useMapSync";
import {
  PLACEHOLDER_LOCATION_SEARCH,
  PLACEHOLDER_EXAMPLE_LATITUDE,
  PLACEHOLDER_EXAMPLE_LONGITUDE,
} from "@/features/location/ui/constants";
import type { SearchResult } from "@/features/location/domain/types";
import { MyLocationIcon, SearchIcon, LocationIcon } from "@/shared/ui/Icons";

export type PlaceComposerVariant = "masthead" | "inspector" | "mobile";

interface PlaceComposerProps {
  variant: PlaceComposerVariant;
}

export default function PlaceComposer({ variant }: PlaceComposerProps) {
  const { state } = usePosterContext();
  const {
    handleChange,
    handleLocationSelect: handleLocationSelectBase,
    handleClearLocation,
    setLocationFocused,
  } = useFormHandlers();
  const { locationSuggestions, isLocationSearching, searchNow } =
    useLocationAutocomplete(state.form.location, state.isLocationFocused);
  const { flyToLocation } = useMapSync();
  const {
    handleUseCurrentLocation,
    isLocatingUser,
    locationPermissionMessage,
  } = useCurrentLocation(flyToLocation);

  const variantClassName = useMemo(() => {
    if (variant === "masthead") return "place-composer--masthead";
    if (variant === "mobile") return "place-composer--mobile";
    return "place-composer--inspector";
  }, [variant]);

  const hasLocationValue = state.form.location.trim().length > 0;
  const showLocationSuggestions =
    state.isLocationFocused && locationSuggestions.length > 0;

  const onLocationSelect = (location: SearchResult) => {
    handleLocationSelectBase(location);
    flyToLocation(location.lat, location.lon);
  };

  return (
    <section className={`place-composer ${variantClassName}`}>
      {variant !== "masthead" ? (
        <header className="place-composer__header">
          <p className="place-composer__eyebrow">
            Place
          </p>
          <h2 className="place-composer__title">
            {variant === "mobile"
              ? "Set the place behind this print."
              : "Search or pin the place."}
          </h2>
        </header>
      ) : null}

      <div className="place-composer__search">
        <div className="location-autocomplete">
          <div className="place-composer__search-stack">
            <div className="place-composer__search-row location-search-row">
              <span className="place-composer__search-icon" aria-hidden="true">
                <SearchIcon />
              </span>
              <div className="location-input-wrap">
                <input
                  className="form-control-tall"
                  name="location"
                  value={state.form.location}
                  onChange={handleChange}
                  onFocus={() => setLocationFocused(true)}
                  onBlur={() => setLocationFocused(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      void searchNow(event.currentTarget.value);
                    }
                  }}
                  placeholder={PLACEHOLDER_LOCATION_SEARCH}
                  autoComplete="off"
                />
                {hasLocationValue ? (
                  <button
                    type="button"
                    className="location-clear-btn"
                    aria-label="Clear place"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={handleClearLocation}
                  >
                    x
                  </button>
                ) : null}
              </div>
                <button
                  type="button"
                  className={`place-composer__icon-btn${isLocatingUser ? " is-locating" : ""}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={handleUseCurrentLocation}
                  disabled={isLocatingUser}
                  aria-label="Use current place"
                  title="Use current place"
                >
                <MyLocationIcon className="place-composer__locate-icon" />
              </button>
            </div>

            {showLocationSuggestions ? (
              <ul className="location-suggestions" role="listbox">
                {locationSuggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      className="location-suggestion"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        onLocationSelect(suggestion);
                      }}
                    >
                      {suggestion.label}
                    </button>
                  </li>
                ))}
                {isLocationSearching ? (
                  <li className="location-suggestion-status">Searching...</li>
                ) : null}
              </ul>
            ) : null}
          </div>
        </div>

        {locationPermissionMessage ? (
          <p className="location-permission-message">{locationPermissionMessage}</p>
        ) : null}
      </div>

      {variant === "masthead" ? null : (
        <div className="place-composer__coords">
          <label>
            <span className="place-composer__field-label">
              <LocationIcon />
              <span>Latitude</span>
            </span>
            <input
              className="form-control-tall"
              name="latitude"
              value={state.form.latitude}
              onChange={handleChange}
              placeholder={PLACEHOLDER_EXAMPLE_LATITUDE}
            />
          </label>
          <label>
            <span className="place-composer__field-label">
              <LocationIcon />
              <span>Longitude</span>
            </span>
            <input
              className="form-control-tall"
              name="longitude"
              value={state.form.longitude}
              onChange={handleChange}
              placeholder={PLACEHOLDER_EXAMPLE_LONGITUDE}
            />
          </label>
        </div>
      )}
    </section>
  );
}
