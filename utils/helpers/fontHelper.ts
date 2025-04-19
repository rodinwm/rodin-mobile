import {FontWeightEnum} from "@/utils/enums";

export abstract class FontHelper {
    private static mainFont = "FunnelDisplay";
    //private static bigTitleFont = "SpecialGothicExpandedOne-Regular";
    private static bigTitleFont = "Poppins-Black";

    static getMainFontStatic(weight: FontWeightEnum = FontWeightEnum.Regular) {
        return `${FontHelper.mainFont}-${weight}`;
    }

    static getMainFontVariable() {
        return `${FontHelper.mainFont}-VariableFontWeight`;
    }

    static getBigTitleFontStatic() {
        return FontHelper.bigTitleFont;
    }

}