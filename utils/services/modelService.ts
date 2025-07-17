// file: utils/services/ModelService.ts

import {EnumLabelMap, RodinEnumMap} from '../models/model.records';
import {RodinEnumName} from '../models/model.types';

export class ModelService {

    constructor(private readonly onError: (methodName: string, error: any) => void) {
    }

    /**
     * Récupère dynamiquement les valeurs d'une énum (via son nom)
     */
    getEnumValues<T extends RodinEnumName>(enumName: T): string[] {
        const methodName = `getEnumValues(${enumName})`;
        try {
            const enumObject = RodinEnumMap[enumName];
            return Object.values(enumObject);
        } catch (error) {
            return this.handleError<string>(methodName, error);
        }
    }

    /**
     * Retourne un label lisible pour une valeur d’enum
     */
    getEnumLabel<T extends RodinEnumName>(enumType: T, value: string): string {
        return EnumLabelMap[enumType]?.[value] ?? value;
    }

    private handleError<T>(methodName: string, error: any): T[] {
        this.onError(methodName, error);
        return [];
    }
}