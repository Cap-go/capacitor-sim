import Capacitor
import CoreTelephony
import Foundation

@objc(SimPlugin)
public class SimPlugin: CAPPlugin, CAPBridgedPlugin {
    private let pluginVersion: String = "7.1.7"
    public let identifier = "SimPlugin"
    public let jsName = "Sim"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getSimCards", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    @objc func getSimCards(_ call: CAPPluginCall) {
        let telephonyInfo = CTTelephonyNetworkInfo()
        var result: [[String: Any]] = []

        if let carriers = telephonyInfo.serviceSubscriberCellularProviders?.values, !carriers.isEmpty {
            for carrier in carriers {
                result.append(buildCarrierPayload(from: carrier))
            }
        } else if let carrier = telephonyInfo.subscriberCellularProvider {
            result.append(buildCarrierPayload(from: carrier))
        }

        call.resolve([
            "simCards": result
        ])
    }

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        call.resolve([
            "readSimCard": "granted"
        ])
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        call.resolve([
            "readSimCard": "granted"
        ])
    }

    private func buildCarrierPayload(from carrier: CTCarrier) -> [String: Any] {
        return [
            "allowsVOIP": carrier.allowsVOIP,
            "carrierName": carrier.carrierName ?? "",
            "isoCountryCode": carrier.isoCountryCode ?? "",
            "mobileCountryCode": carrier.mobileCountryCode ?? "",
            "mobileNetworkCode": carrier.mobileNetworkCode ?? ""
        ]
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve(["version": self.pluginVersion])
    }

}
