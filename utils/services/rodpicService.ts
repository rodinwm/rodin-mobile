import * as FileSystem from 'expo-file-system';

export abstract class RodpicService {


    static async encodeImageToBase64(uri: string): Promise<string> {
        return await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
    };
}