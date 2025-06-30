import {LogType} from "@/utils/enums";
import {AgeRange, ExerciseFrequency, NotificationType, Profession} from "@rodinwm/rodin-models/frontend";
import {LogService} from "@/utils/services/logService";

export abstract class ModelService {
    private static readonly logService = new LogService(this.name);

    static getExerciseFrequencies(): ExerciseFrequency[] {
        const methodName = "getExerciseFrequencies";
        try {
            const exerciseFrequencies = Object.values(ExerciseFrequency);
            return exerciseFrequencies;
        } catch (error) {
            this.logService.log({
                type: LogType.Error,
                data: [`${methodName}() error`, error]
            });
            return [];
        }
    }

    static getAgeRanges(): AgeRange[] {
        const methodName = "getAgeRanges";
        try {
            const ageRanges = Object.values(AgeRange);
            return ageRanges;
        } catch (error) {
            this.logService.log({
                type: LogType.Error,
                data: [`${methodName}() error`, error]
            });
            return [];
        }
    }

    static getNotificationTypes(): NotificationType[] {
        const methodName = "getNotificationTypes";
        try {
            const notificationTypes = Object.values(NotificationType);
            return notificationTypes;
        } catch (error) {
            this.logService.log({
                type: LogType.Error,
                data: [`${methodName}() error`, error]
            });
            return [];
        }
    }

    static getProfessions(): Profession[] {
        const methodName = "getProfessions";
        try {
            const professions = Object.values(Profession);
            return professions;
        } catch (error) {
            this.logService.log({
                type: LogType.Error,
                data: [`${methodName}() error`, error]
            });
            return [];
        }
    }

}