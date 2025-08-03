import {Href, useRouter} from "expo-router";


type Props = {
    path: Href;
    stepsToGoBack?: number;
    params?: Record<string, any>;
};

/**
 * Un hook pour revenir de plusieurs écrans en arrière,
 * puis rediriger vers une route spécifique.
 *
 * @param path Chemin de redirection final
 * @param stepsToGoBack Nombre d’écrans à revenir (par défaut 1)
 * @param params Paramètres à passer à la route de redirection
 */
export function useScreenReplacer({path, stepsToGoBack, params}: Props) {
    const router = useRouter();

    const goToScreen = () => {
        if (stepsToGoBack && stepsToGoBack > 0) {
            for (let i = 0; i < stepsToGoBack; i++) {
                router.back();
            }
        }

        router.replace({
            pathname: path.toString(),
            params: params,
        });
    };

    return {goToScreen};
}