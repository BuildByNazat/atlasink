import { clamp } from "@/shared/geo/math";
import { parseNumericInput } from "@/shared/utils/number";
import { CM_PER_INCH } from "@/core/config";

export interface ValidationConfig {
  minPosterCm: number;
  maxPosterCm: number;
  minDistanceMeters: number;
  maxDistanceMeters: number;
}

export interface ValidatedInput {
  locationText: string;
  latText: string;
  lonText: string;
  widthCm: number;
  heightCm: number;
  widthInches: number;
  heightInches: number;
  distanceMeters: number;
  hasManualCoordinates: boolean;
}

export function validatePosterInput(
  form: {
    location: string;
    latitude: string;
    longitude: string;
    width: string;
    height: string;
    distance: string;
  },
  config: ValidationConfig,
): ValidatedInput {
  const locationText = form.location.trim();
  const latText = form.latitude.trim();
  const lonText = form.longitude.trim();
  const hasManualCoordinates = Boolean(latText && lonText);

  if (!locationText && (latText || lonText) && !hasManualCoordinates) {
    throw new Error(
      "Enter either a place name, or both latitude and longitude.",
    );
  }

  if (!locationText && !hasManualCoordinates) {
    throw new Error(
      "Enter a place name, or provide coordinates to continue.",
    );
  }

  const widthCm = clamp(
    parseNumericInput("Width", form.width),
    config.minPosterCm,
    config.maxPosterCm,
  );
  const heightCm = clamp(
    parseNumericInput("Height", form.height),
    config.minPosterCm,
    config.maxPosterCm,
  );
  const widthInches = widthCm / CM_PER_INCH;
  const heightInches = heightCm / CM_PER_INCH;
  const distanceMeters = clamp(
    parseNumericInput("Distance", form.distance),
    config.minDistanceMeters,
    config.maxDistanceMeters,
  );

  return {
    locationText,
    latText,
    lonText,
    widthCm,
    heightCm,
    widthInches,
    heightInches,
    distanceMeters,
    hasManualCoordinates,
  };
}
