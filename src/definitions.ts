import type { PermissionState } from '@capacitor/core';

/**
 * Result of a permission check or request.
 *
 * @since 1.0.0
 */
export interface PermissionStatus {
  readSimCard: PermissionState;
}

export interface SimPlugin {
  /**
   * Get information from the device's SIM cards.
   *
   * @since 1.0.0
   */
  getSimCards(): Promise<GetSimCardsResult>;

  /**
   * Check permission to access SIM card information.
   *
   * On iOS and Web the status is always granted or denied respectively without prompting.
   *
   * @since 1.0.0
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request permission to access SIM card information.
   *
   * On iOS the status is always granted. On Web the status remains denied.
   *
   * @since 1.0.0
   */
  requestPermissions(): Promise<PermissionStatus>;
}

/**
 * Result returned by {@link SimPlugin.getSimCards}.
 *
 * @since 1.0.0
 */
export interface GetSimCardsResult {
  simCards: SimCard[];
}

/**
 * A SIM card description.
 *
 * @since 1.0.0
 */
export interface SimCard {
  /**
   * Android only: Phone number for this SIM slot, when available.
   *
   * @since 1.0.0
   */
  number?: string;

  /**
   * Android only: Unique subscription identifier.
   *
   * @since 1.1.0
   */
  subscriptionId?: string;

  /**
   * Android only: Physical SIM slot index for this subscription.
   *
   * @since 1.1.0
   */
  simSlotIndex?: number;

  /**
   * iOS only: Indicates whether the carrier supports VoIP.
   *
   * @since 1.0.0
   */
  allowsVOIP?: boolean;

  /**
   * Display name of the cellular service provider.
   *
   * On iOS 16.4+ the system may return placeholder values such as `--`.
   * See https://github.com/jonz94/capacitor-sim/issues/8 for details.
   *
   * @since 1.0.0
   */
  carrierName: string;

  /**
   * ISO 3166-1 alpha-2 country code of the service provider.
   *
   * On iOS 16.4+ the system may return an empty string or `--`.
   * See https://github.com/jonz94/capacitor-sim/issues/8 for details.
   *
   * @since 1.0.0
   */
  isoCountryCode: string;

  /**
   * Mobile Country Code (MCC) of the service provider.
   *
   * On iOS 16.4+ the system may return placeholder values such as `65535`.
   * See https://github.com/jonz94/capacitor-sim/issues/8 for details.
   *
   * @since 1.0.0
   */
  mobileCountryCode: string;

  /**
   * Mobile Network Code (MNC) of the service provider.
   *
   * On iOS 16.4+ the system may return placeholder values such as `65535`.
   * See https://github.com/jonz94/capacitor-sim/issues/8 for details.
   *
   * @since 1.0.0
   */
  mobileNetworkCode: string;

  /**
   * Get the native Capacitor plugin version
   *
   * @returns {Promise<{ id: string }>} an Promise with version for this device
   * @throws An error if the something went wrong
   */
  getPluginVersion(): Promise<{ version: string }>;
}
