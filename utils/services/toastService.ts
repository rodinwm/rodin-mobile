import {ToastType} from "@/utils/enums";
import {Toast} from "toastify-react-native";

type ToastData = {
    type: ToastType;
    message: string;
};

export abstract class ToastService {

    static show(toast: ToastData) {
        Toast[toast.type](toast.message);
    }
}