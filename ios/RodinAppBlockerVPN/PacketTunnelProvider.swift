//
//  PacketTunnelProvider.swift
//  RodinAppBlockerVPN
//
//  Created by Alexandre TAHI on 15/06/2025.
//

import NetworkExtension

class PacketTunnelProvider: NEPacketTunnelProvider {
  
    private var blockedDomains: Set<String> = []

    override func startTunnel(options: [String : NSObject]?, completionHandler: @escaping (Error?) -> Void) {
        NSLog("🛡️ Rodin VPN started")
        
        let settings = NEPacketTunnelNetworkSettings(tunnelRemoteAddress: "127.0.0.1")

        settings.ipv4Settings = NEIPv4Settings(addresses: ["10.0.0.2"], subnetMasks: ["255.255.255.0"])
        settings.ipv4Settings?.includedRoutes = [NEIPv4Route.default()]
        settings.dnsSettings = NEDNSSettings(servers: ["1.1.1.1"]) // You can point to local DNS here
        settings.dnsSettings?.matchDomains = [""]

        self.setTunnelNetworkSettings(settings) { error in
            if let error = error {
                NSLog("❌ Failed to set tunnel settings: \(error)")
                completionHandler(error)
            } else {
                NSLog("✅ Tunnel settings applied")
                self.startReadingPackets()
                completionHandler(nil)
            }
        }
    }

    override func stopTunnel(with reason: NEProviderStopReason, completionHandler: @escaping () -> Void) {
        NSLog("🛑 Rodin VPN stopped")
        completionHandler()
    }

    override func handleAppMessage(_ messageData: Data, completionHandler: ((Data?) -> Void)? = nil) {
        do {
            if let dict = try JSONSerialization.jsonObject(with: messageData) as? [String: Any],
               let domains = dict["blockedDomains"] as? [String] {
                NSLog("📦 VPN: domains to block: \(domains)")
                self.blockedDomains = Set(domains)
            }
        } catch {
            NSLog("❌ Failed to decode message: \(error)")
        }
        completionHandler?(nil)
    }
    
    override func sleep(completionHandler: @escaping () -> Void) {
        // Add code here to get ready to sleep.
        completionHandler()
    }
    
    override func wake() {
        // Add code here to wake up.
    }
  
    func startReadingPackets() {
        self.packetFlow.readPackets { [weak self] packets, protocols in
            guard let self = self else { return }

            for packet in packets {
                if self.shouldBlock(packet: packet) {
                    NSLog("⛔️ Packet blocked")
                    continue
                }

                // Si non bloqué, relancer lecture
                // Dans notre cas, on bloque tout, donc on ne forward pas
            }

            // Continuer la lecture en boucle
            self.startReadingPackets()
        }
    }

    func shouldBlock(packet: Data) -> Bool {
      guard let packetString = String(data: packet, encoding: .utf8) else {
          return false
      }

      for domain in blockedDomains {
          if packetString.contains(domain) {
              NSLog("⛔️ Matched domain: \(domain)")
              return true
          }
      }

      return false
    }
}
