import {useFonts} from "expo-font";
import {Asset} from "expo-asset";

export abstract class PreloadService {
    static async preloadResources() {
        try {
            await this.loadImages();
            //await this.loadFonts();
            console.info("Assets loaded");
            return true;
        } catch (error) {
            console.error("Error loading assets:", error);
            return false;
        }
    }

    private static async loadImages() {
        const imageAssets = await Asset.loadAsync([
            require('@/assets/images/wallpapers/nature-1.jpg'),
        ]);

        return await Promise.all(imageAssets);
    }


    private static async loadFonts() {
        // TODO: Trouver une alternative car on ne peut pas utiliser les hooks en dehors des composants.
        const [fontLoaded] = useFonts({
            // Base
            "FunnelDisplay-Light": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Light.ttf'),
            "FunnelDisplay-Regular": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Regular.ttf'),
            "FunnelDisplay-Medium": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Medium.ttf'),
            "FunnelDisplay-SemiBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-SemiBold.ttf'),
            "FunnelDisplay-Bold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-Bold.ttf'),
            "FunnelDisplay-ExtraBold": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-ExtraBold.ttf'),
            "FunnelDisplay-VariableFontWeight": require('@/assets/fonts/FunnelDisplay/FunnelDisplay-VariableFontWeight.ttf'),
            // Poppins
            "Poppins-Black": require('@/assets/fonts/Poppins/Poppins-Black.ttf'),
        });

        return fontLoaded;
    }


}