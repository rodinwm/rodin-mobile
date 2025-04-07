import {PodColor} from "@/utils/enums";
import {faker} from "@faker-js/faker";
import {Pod} from "@/utils/interfaces";

export abstract class GameHelper {
    private static colors = [PodColor.Neutral, PodColor.Red, PodColor.Blue, PodColor.Neutral];

    static getEmptyPodsGameStep(): Pod[] {
        return Array.from({length: 4}, () => ({
            id: faker.string.uuid(),
            color: PodColor.Neutral
        }));
    }

    static generatePodsGameStep(): Pod[] {
        return faker.helpers.shuffle(GameHelper.colors, {inplace: true}).map(color => ({
            id: faker.string.uuid(),
            color
        }));
    }
}