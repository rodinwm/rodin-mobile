import {NativeModules} from 'react-native';

const {RodinVPNManager} = NativeModules;

export abstract class VpnHelper {
    static async setupAndStartVPN(blockedDomains: string[]) {
        try {
            await RodinVPNManager.configure();
            await RodinVPNManager.sendBlockedDomains(blockedDomains);
            await RodinVPNManager.startVPN();
            console.log('✅ VPN configuré et démarré');
        } catch (error) {
            console.error('❌ Erreur VPN :', error);
        }
    }

    static async stopVPN() {
        try {
            await RodinVPNManager.stopVPN();
            console.log('🛑 VPN arrêté');
        } catch (error) {
            console.error(error);
        }
    }
}