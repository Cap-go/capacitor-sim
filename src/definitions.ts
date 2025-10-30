import type { PermissionState } from '@capacitor/core';

/**
 * Result of a permission check or request.
 *
 * @since 1.0.0
 */
export interface PermissionStatus {
  readSimCard: PermissionState;
}

/**
 * Capacitor SIM Plugin for retrieving information from device SIM cards.
 *
 * This plugin provides access to SIM card information such as carrier name,
 * country code, mobile network codes, and more. Supports dual-SIM devices.
 *
 * @since 1.0.0
 */
export interface SimPlugin {
  /**
   * Get information from the device's SIM cards.
   *
   * Retrieves details about all SIM cards installed in the device.
   * On dual-SIM devices, returns information for both SIM cards.
   * Requires READ_PHONE_STATE permission on Android.
   *
   * @returns Promise that resolves with SIM cards information
   * @throws Error if permission is denied or reading SIM info fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const { simCards } = await SimPlugin.getSimCards();
   * simCards.forEach((sim, index) => {
   *   console.log(`SIM ${index + 1}:`);
   *   console.log(`  Carrier: ${sim.carrierName}`);
   *   console.log(`  Country: ${sim.isoCountryCode}`);
   *   console.log(`  MCC: ${sim.mobileCountryCode}`);
   *   console.log(`  MNC: ${sim.mobileNetworkCode}`);
   * });
   * ```
   */
  getSimCards(): Promise<GetSimCardsResult>;

  /**
   * Check permission to access SIM card information.
   *
   * Checks if the app has permission to read SIM card data.
   * On Android, checks READ_PHONE_STATE permission.
   * On iOS, the status is always granted.
   * On Web, the status is always denied.
   *
   * @returns Promise that resolves with permission status
   * @throws Error if checking permissions fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const status = await SimPlugin.checkPermissions();
   * if (status.readSimCard === 'granted') {
   *   console.log('Permission granted');
   * } else {
   *   console.log('Permission not granted');
   * }
   * ```
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request permission to access SIM card information.
   *
   * Prompts the user to grant permission to read SIM card data.
   * On Android, requests READ_PHONE_STATE permission.
   * On iOS, the status is always granted without prompting.
   * On Web, the status remains denied.
   *
   * @returns Promise that resolves with permission status after the request
   * @throws Error if the permission request fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const status = await SimPlugin.requestPermissions();
   * if (status.readSimCard === 'granted') {
   *   // Now you can call getSimCards()
   *   const simCards = await SimPlugin.getSimCards();
   * }
   * ```
   */
  requestPermissions(): Promise<PermissionStatus>;

  /**
   * Get the native Capacitor plugin version.
   *
   * @returns Promise that resolves with the plugin version
   * @throws Error if getting the version fails
   * @since 1.0.0
   * @example
   * ```typescript
   * const { version } = await SimPlugin.getPluginVersion();
   * console.log('Plugin version:', version);
   * ```
   */
  getPluginVersion(): Promise<{ version: string }>;
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
}
