import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from "@rodinwm/rodin-models/frontend";
import {authLogService, onboardingLogService} from "@/utils/constants";
import {LogType} from "@/utils/enums";
import {ApiService} from "@/utils/services/apiService";
import {HttpStatusCode} from "axios";

export abstract class AuthService {
    private static authUser: User | null = null;
    private static token: string | null = null;

    static async saveCredentials(token: string, user: User): Promise<void> {
        await AsyncStorage.setItem("isCredentialsSaved", true.toString());
        await this.storeToken(token);
        await this.storeAuthUser(user);

        authLogService.log({
            type: LogType.Log,
            data: ['Credentials saved successfully.', token, user]
        });
    }

    static async storeAuthUser(user: User): Promise<void> {
        this.authUser = user;
        await AsyncStorage.setItem('authUser', JSON.stringify(user));
    }

    static async getAuthUser(): Promise<User | null> {
        if (this.authUser) return this.authUser;
        const storedUser = await AsyncStorage.getItem('authUser');
        if (storedUser) {
            this.authUser = JSON.parse(storedUser);
            return this.authUser;
        }
        return null;
    }

    static async isCredentialsSaved(): Promise<boolean> {
        const storedValue = await AsyncStorage.getItem('isCredentialsSaved');
        return storedValue === true.toString();
    }

    static async logout(): Promise<void> {
        this.token = null;
        this.authUser = null;
        await AsyncStorage.multiRemove(['authUser', 'token']);
    }

    static async getToken(): Promise<string | null> {
        if (this.token) return this.token;
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
            this.token = storedToken;
            return storedToken;
        }
        return null;
    }

    static async storeToken(token: string): Promise<void> {
        this.token = token;
        await AsyncStorage.setItem('token', token);
    }

    static async resumeSession(): Promise<boolean> {
        const token = await this.getToken();
        if (!token) {
            authLogService.log({
                type: LogType.Error,
                data: ['No token found for resuming session.']
            });
            return false;
        }

        try {
            const response = await ApiService.getUser(token);

            switch (response.status) {
                case HttpStatusCode.Ok:
                    await AuthService.saveCredentials(token, response.data.user as User);

                    onboardingLogService.log({
                        type: LogType.Log,
                        data: ['Session resumed successfully.']
                    });

                    return true;
                default:
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['Error fetching user data after resuming session:', response.status, response.data]
                    });
                    return false;
            }
        } catch (error) {
            onboardingLogService.log({
                type: LogType.Error,
                data: ['Error resuming session:', error],
            });
            return false;
        }
    }
}