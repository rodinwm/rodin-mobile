import {PodColor} from "@/utils/enums";
import {faker} from "@faker-js/faker";

export abstract class GameHelper {

    // FIXME : This function doesn't work
    static generatePodsGameCircuit(): PodColor[][] {
        return Array.from({length: 15}, () => GameHelper.generatePodsGameStep());
    }

    static generatePodsGameStep(): PodColor[] {
        const step = [PodColor.Neutral, PodColor.Red, PodColor.Blue, PodColor.Neutral];

        // Mélanger les couleurs avant de les retourner
        faker.helpers.shuffle(step);

        return step;
    }
}