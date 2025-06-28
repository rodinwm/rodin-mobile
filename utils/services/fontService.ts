import {FontWeightEnum} from "@/utils/enums";

export abstract class FontService {
    private static mainFont = "FunnelDisplay";
    //private static bigTitleFont = "SpecialGothicExpandedOne-Regular";
    private static bigTitleFont = "Poppins-Black";

    static getMainFontStatic(weight: FontWeightEnum = FontWeightEnum.Regular) {
        return `${FontService.mainFont}-${weight}`;
    }

    static getMainFontVariable() {
        return `${FontService.mainFont}-VariableFontWeight`;
    }

    static getBigTitleFontStatic() {
        return FontService.bigTitleFont;
    }

}