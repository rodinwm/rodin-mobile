import {ColorTheme} from "@/utils/enums";
import AsyncStorage from "@react-native-async-storage/async-storage";

export abstract class StorageHelper {

    static async saveSelectedTheme(theme: ColorTheme): Promise<void> {
        try {
            await AsyncStorage.setItem("appTheme", JSON.stringify(theme));
            console.info(`Theme [${theme}] sauvegardé !`);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde du thème :", error);
        }
    }

    static async loadSavedTheme(): Promise<ColorTheme> {
        try {
            const theme = await AsyncStorage.getItem("appTheme");
            if (theme) {
                console.info(`Theme [${theme}] chargé !`);
                return JSON.parse(theme);
            }
            console.info(`Aucun thème sauvegardé. Le thème système sera chargé par défaut.`);
            return ColorTheme.System;
        } catch (error) {
            console.error("Erreur lors du chargement du thème :", error);
            return ColorTheme.System;
        }
    }


}