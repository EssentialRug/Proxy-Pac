function FindProxyForURL(url, host) {

    var destIP = isInNet(host, "10.0.0.0", "255.0.0.0") ? host : dnsResolve(host);
    var clientIP = myIpAddress();

    function isSchoolNetwork(ip) {
        if (!ip) return false;
        return (
            isInNet(ip, "10.55.66.0",   "255.255.254.0") || // St Michael's
            isInNet(ip, "10.130.16.0",  "255.255.255.0") || // St Michael's
            isInNet(ip, "10.130.191.0", "255.255.255.0") || // St Catherine's
            isInNet(ip, "10.130.123.0", "255.255.255.0") || // Marldon
            isInNet(ip, "10.143.32.0",  "255.255.255.0") || // St Mary's
            isInNet(ip, "10.130.126.0", "255.255.255.0") || // Ipplepen
            isInNet(ip, "10.100.37.0",  "255.255.255.0") || // Stoke
            isInNet(ip, "10.130.103.0", "255.255.255.0") // Topsham
        );
    }

    function isWhitelisted(ip) {
        if (!ip) return false;
        return (
            // St Michael's
            ip === "REDACTED"   ||  // Raspberry Pi
            ip === "REDACTED" ||   // Poundhouse uniFLOW Printer
            ip === "REDACTED" ||   // Library uniFLOW Printer
            ip === "REDACTED" ||    // House Office Printer
            ip === "10.55.67.39" ||    // Library Canon
            ip === "10.130.16.192" ||  // Poundhouse Canon
            ip === "REDACTED" ||   // Reception Canon

            // Ipplepen            
            ip === "REDACTED" || // Reception uniFLOW Printer
            ip === "REDACTED" || // Office uniFLOW Printer

            // St Catherines
            ip === "REDACTED" ||  // Reception Printer
            ip === "REDACTED" ||  // SEN Printer
            ip === "REDACTED" ||  // uniFLOW Right Printer
            ip === "REDACTED" || // uniFLOW Left Printer
            ip === "10.130.191.30" ||  // Left Canon

            // Stoke
            ip === "REDACTED" ||  // Staff Room uniFLOW Printer
            ip === "10.100.37.104" ||  // Reception Canon

            // Topsham
            ip === "REDACTED" || // CCTV
            ip === "REDACTED" ||  // Office uniFLOW Printer
            ip === "REDACTED" || // KS2 uniFLOW Printer
            ip === "10.130.103.117" ||  // Topsham KS2 Canon

            // St Mary's
            ip === "REDACTED" ||   // Staff Room uniFLOW Printer
            ip === "10.143.32.116" ||  // Staff Room Canon

            // Marldon
            ip === "REDACTED" ||  // Resources Room uniFLOW Printer
            ip === "REDACTED" ||   // Office Printer
            ip === "10.130.123.73" ||   // Resources Room Printer

            // Doddi
            ip === "10.151.87.147"     // Staff Room UniFLOW Printer
        );
    }

    // If client is not on a school network, always go direct
    if (!isSchoolNetwork(clientIP)) return "DIRECT";

    // Client is on a school network — go direct if destination is whitelisted, otherwise proxy
    return isWhitelisted(destIP) ? "DIRECT" : "PROXY proxy1.rmsafetynet.com:8080";
}
