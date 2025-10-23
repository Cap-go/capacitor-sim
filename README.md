# @capgo/capacitor-sim
 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>
Capacitor plugin to get information from device's sim cards

## Install

```bash
npm install @capgo/capacitor-sim
npx cap sync
```

## Usage

```ts
import { Sim } from '@capgo/capacitor-sim';

const loadSimCards = async () => {
  const { simCards } = await Sim.getSimCards();

  return simCards;
};
```

The returned `simCards` array contains carrier information for each detected SIM. On Android the list also exposes the `subscriptionId` and `simSlotIndex` values so you can correlate entries across platform APIs.

### iOS 16.4+ limitations

Starting with iOS 16.4 Apple restricts access to several carrier fields returned by CoreTelephony. On devices running iOS 16.4 or newer the plugin may return placeholder values such as `65535`, `--`, or empty strings for `carrierName`, `isoCountryCode`, `mobileCountryCode`, and `mobileNetworkCode`. This behaviour is handled at the OS level and is tracked upstream in [jonz94/capacitor-sim#8](https://github.com/jonz94/capacitor-sim/issues/8); there is currently no known workaround besides relying on Android data or older iOS versions.

## API

<docgen-index>

* [`getSimCards()`](#getsimcards)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getSimCards()

```typescript
getSimCards() => Promise<GetSimCardsResult>
```

Get information from the device's SIM cards.

**Returns:** <code>Promise&lt;<a href="#getsimcardsresult">GetSimCardsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check permission to access SIM card information.

On iOS and Web the status is always granted or denied respectively without prompting.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request permission to access SIM card information.

On iOS the status is always granted. On Web the status remains denied.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### GetSimCardsResult

Result returned by {@link SimPlugin.getSimCards}.

| Prop           | Type                   |
| -------------- | ---------------------- |
| **`simCards`** | <code>SimCard[]</code> |


#### SimCard

A SIM card description.

| Prop                    | Type                 | Description                                                                                                                                                                                 | Since |
| ----------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`number`**            | <code>string</code>  | Android only: Phone number for this SIM slot, when available.                                                                                                                               | 1.0.0 |
| **`subscriptionId`**    | <code>string</code>  | Android only: Unique subscription identifier.                                                                                                                                               | 1.1.0 |
| **`simSlotIndex`**      | <code>number</code>  | Android only: Physical SIM slot index for this subscription.                                                                                                                                | 1.1.0 |
| **`allowsVOIP`**        | <code>boolean</code> | iOS only: Indicates whether the carrier supports VoIP.                                                                                                                                      | 1.0.0 |
| **`carrierName`**       | <code>string</code>  | Display name of the cellular service provider. On iOS 16.4+ the system may return placeholder values such as `--`. See https://github.com/jonz94/capacitor-sim/issues/8 for details.        | 1.0.0 |
| **`isoCountryCode`**    | <code>string</code>  | ISO 3166-1 alpha-2 country code of the service provider. On iOS 16.4+ the system may return an empty string or `--`. See https://github.com/jonz94/capacitor-sim/issues/8 for details.      | 1.0.0 |
| **`mobileCountryCode`** | <code>string</code>  | Mobile Country Code (MCC) of the service provider. On iOS 16.4+ the system may return placeholder values such as `65535`. See https://github.com/jonz94/capacitor-sim/issues/8 for details. | 1.0.0 |
| **`mobileNetworkCode`** | <code>string</code>  | Mobile Network Code (MNC) of the service provider. On iOS 16.4+ the system may return placeholder values such as `65535`. See https://github.com/jonz94/capacitor-sim/issues/8 for details. | 1.0.0 |

| Method               | Signature                                    | Description                             |
| -------------------- | -------------------------------------------- | --------------------------------------- |
| **getPluginVersion** | () =&gt; Promise&lt;{ version: string; }&gt; | Get the native Capacitor plugin version |


#### PermissionStatus

Result of a permission check or request.

| Prop              | Type                                                        |
| ----------------- | ----------------------------------------------------------- |
| **`readSimCard`** | <code><a href="#permissionstate">PermissionState</a></code> |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
