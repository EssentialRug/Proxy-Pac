function FindProxyForURL(url, host) {
    var clientIP = myIpAddress();

    // Use proxy if on any of the school networks
    if (
        isInNet(clientIP, "10.55.66.0", "255.255.254.0") ||  // Covers 10.55.66.0 - 10.55.67.255
        isInNet(clientIP, "10.130.16.0", "255.255.255.0") ||
        isInNet(clientIP, "10.130.191.0", "255.255.255.0") ||
        isInNet(clientIP, "10.130.123.0", "255.255.255.0") ||
        isInNet(clientIP, "10.143.32.0", "255.255.255.0") ||
        isInNet(clientIP, "10.130.126.0", "255.255.255.0") ||
        isInNet(clientIP, "10.100.37.0", "255.255.255.0") ||
        isInNet(clientIP, "10.151.87.0", "255.255.255.0") ||
        isInNet(clientIP, "10.130.103.0", "255.255.255.0")
    ) {
        return "PROXY proxy1.rmsafetynet.com:8080";
    }

    // All other networks (e.g. home): go direct
    return "DIRECT";
}
