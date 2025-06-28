import {PodColor} from "@/utils/enums";
import {faker} from "@faker-js/faker";
import {Pod} from "@/utils/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ConcentrationExercise} from "@rodinwm/rodin-models/frontend";

export abstract class GameService {

    static getEmptyPodsGameStep(): Pod[] {
        return Array.from({length: 4}, () => ({
            id: faker.string.uuid(),
            color: PodColor.Neutral
        }));
    }

    static getEmptyPatternsGameStep(): Pod[] {
        return Array.from({length: 16}, () => ({
            id: faker.string.uuid(),
            color: PodColor.Neutral
        }));
    }

    static generatePodsGameStep(): Pod[] {
        const pods: Pod[] = [
            // 🔴 1 pod rouge obligatoire
            {id: faker.string.uuid(), color: PodColor.Red},
        ];

        // Couleurs optionnelles
        const optionalColors = [PodColor.Blue, PodColor.Green, PodColor.Orange, PodColor.Neutral];

        // Mélange pour aléatoirement choisir
        const shuffledColors = faker.helpers.shuffle(optionalColors);

        let remainingSlots = 4 - pods.length;

        for (const color of shuffledColors) {
            if (remainingSlots <= 0) break;

            // Choisir entre 1 et 2 pods de cette couleur sans dépasser le max
            const maxAllowed = Math.min(2, remainingSlots);
            const count = faker.number.int({min: 1, max: maxAllowed});

            for (let i = 0; i < count; i++) {
                pods.push({id: faker.string.uuid(), color});
            }

            remainingSlots -= count;
        }

        // 🔀 Mélanger et retourner le tout
        return faker.helpers.shuffle(pods, {inplace: true});
    }

    static async saveBestScore(game: ConcentrationExercise, score: number): Promise<void> {
        try {
            await AsyncStorage.setItem(`${game}.bestScore`, score.toString());
            console.info(`New best score saved for game [${game}] !`);
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde du meilleur score du jeu [${game}] :`, error);
        }
    }

    static async loadBestScore(game: ConcentrationExercise): Promise<number> {
        try {
            const bestScore = await AsyncStorage.getItem(`${game}.bestScore`);
            if (bestScore) {
                console.info(`Best score for game [${game}] loaded !`);
                return parseInt(bestScore);
            }
            console.info(`No saved best score for game [${game}]`);
            return 0;
        } catch (error) {
            console.error(`Erreur lors du chargement du meilleur score du jeu [${game}] :`, error);
            return 0;
        }
    }
}
