import {PodColor} from "@/utils/enums";
import {faker} from "@faker-js/faker";
import {Pod} from "@/utils/interfaces";

export abstract class GameHelper {

    static getEmptyPodsGameStep(): Pod[] {
        return Array.from({length: 4}, () => ({
            id: faker.string.uuid(),
            color: PodColor.Neutral
        }));
    }

    static generatePodsGameStep(): Pod[] {
        const pods: Pod[] = [];

        // 🔴 1 pod rouge obligatoire
        pods.push({id: faker.string.uuid(), color: PodColor.Red});

        // Couleurs optionnelles
        const optionalColors = [PodColor.Blue, PodColor.Green, PodColor.Orange];

        // Mélange pour aléatoirement choisir
        const shuffled = faker.helpers.shuffle(optionalColors);

        let remainingSlots = 3;

        for (const color of shuffled) {
            if (remainingSlots <= 0) break;

            // Choisir entre 1 et 2 pods de cette couleur sans dépasser le max
            const maxAllowed = Math.min(2, remainingSlots);
            const count = faker.number.int({min: 1, max: maxAllowed});

            for (let i = 0; i < count; i++) {
                pods.push({id: faker.string.uuid(), color});
            }

            remainingSlots -= count;
        }

        // 🔀 Mélanger le tout
        return faker.helpers.shuffle(pods, {inplace: true});
    }
}
