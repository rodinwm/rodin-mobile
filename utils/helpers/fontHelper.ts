import {mainFont} from "@/constants/strings";
import {FontWeightEnum} from "@/utils/enums";

export abstract class FontHelper {
    static getMainFont(weight: FontWeightEnum = FontWeightEnum.Regular) {
        return `${mainFont}-${weight}`;
    }

}