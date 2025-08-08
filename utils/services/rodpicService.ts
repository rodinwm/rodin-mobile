import * as FileSystem from 'expo-file-system';

export abstract class RodpicService {
    static async encodeImageToBase64(uri: string): Promise<string> {
        return await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
    };

    static decodeBase64ToUri(base64: string, mimeType: string = "image/jpeg"): string {
        return `data:${mimeType};base64,${base64}`;
    }
}