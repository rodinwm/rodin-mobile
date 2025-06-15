//
//  RodinAppBlockerVPNManager.swift
//  rodinmobile
//
//  Created by Alexandre TAHI on 15/06/2025.
//

import Foundation
import NetworkExtension
import React

@objc(RodinAppBlockerVPNManager)
class RodinAppBlockerVPNManager: NSObject {
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

  private let vpnManager = NETunnelProviderManager()

  @objc
  func configure(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    vpnManager.loadFromPreferences { error in
      if let error = error {
        reject("LOAD_ERROR", "Erreur lors du chargement des préférences VPN", error)
        return
      }

      let tunnelProtocol = NETunnelProviderProtocol()
      tunnelProtocol.providerBundleIdentifier = "com.rod1n.rodinmobile.RodinAppBlockerVPN"
      tunnelProtocol.serverAddress = "Rodin VPN"
      self.vpnManager.protocolConfiguration = tunnelProtocol
      self.vpnManager.isEnabled = true

      self.vpnManager.saveToPreferences { error in
        if let error = error {
          reject("SAVE_ERROR", "Erreur lors de la sauvegarde des préférences VPN", error)
        } else {
          resolve("VPN configuré avec succès")
        }
      }
    }
  }

  @objc
  func startVPN(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    do {
      try vpnManager.connection.startVPNTunnel()
      resolve("VPN démarré")
    } catch {
      reject("START_ERROR", "Erreur lors du démarrage du VPN", error)
    }
  }

  @objc
  func stopVPN(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    vpnManager.connection.stopVPNTunnel()
    resolve("VPN arrêté")
  }

  @objc
  func sendBlockedDomains(_ domains: [String], resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let payload = ["blockedDomains": domains]
    do {
      let messageData = try JSONSerialization.data(withJSONObject: payload, options: [])
      try vpnManager.connection.sendProviderMessage(messageData) { _ in
        resolve("Données envoyées au tunnel")
      }
    } catch {
      reject("SEND_ERROR", "Erreur lors de l'envoi du message", error)
    }
  }
}
