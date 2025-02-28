import {FontWeightEnum} from "@/utils/enums";

export abstract class FontHelper {
    private static mainFont = "FunnelDisplay";

    static getMainFontStatic(weight: FontWeightEnum = FontWeightEnum.Regular) {
        return `${FontHelper.mainFont}-${weight}`;
    }

    static getMainFontVariable() {
        return `${FontHelper.mainFont}-VariableFontWeight`;
    }

}