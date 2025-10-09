// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapgoCapacitorSim",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapgoCapacitorSim",
            targets: ["SimPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "SimPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/SimPlugin"),
        .testTarget(
            name: "SimPluginTests",
            dependencies: ["SimPlugin"],
            path: "ios/Tests/SimPluginTests")
    ]
)
