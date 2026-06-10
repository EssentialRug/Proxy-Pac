function FindProxyForURL(url, host) {
    var destIP = isInNet(host, "10.0.0.0", "255.0.0.0") ? host : dnsResolve(host);
    var clientIP = myIpAddress();

    function isSchoolNetwork(ip) {
        if (!ip) return false;
        return (
            isInNet(ip, "10.55.66.0",   "255.255.254.0") ||
            isInNet(ip, "10.130.16.0",  "255.255.255.0") ||
            isInNet(ip, "10.130.191.0", "255.255.255.0") ||
            isInNet(ip, "10.130.123.0", "255.255.255.0") ||
            isInNet(ip, "10.143.32.0",  "255.255.255.0") || 
            isInNet(ip, "10.130.126.0", "255.255.255.0") || 
            isInNet(ip, "10.100.37.0",  "255.255.255.0") ||
            isInNet(ip, "10.130.103.0", "255.255.255.0") ||
            isInNet(ip, "10.151.87.0", "255,255,255,0")
        );
    }

    // If client is not on a school network, always go direct
    if (!isSchoolNetwork(clientIP)) return "DIRECT";

    // Client is on a school network — go direct for all internal IPs, otherwise proxy
    if (isInNet(destIP, "10.0.0.0", "255.0.0.0")) return "DIRECT";

    return "PROXY proxy1.rmsafetynet.com:8080";
}
