import axios, {AxiosResponse, HttpStatusCode} from 'axios';
import {LogService} from "@/utils/services/logService";
import {LogType} from "@/utils/enums";
import {FriendStatus, Prisma, User} from "@rodinwm/rodin-models/frontend";
import {CreateUserPayload, LoginPayload, PublishRodpicPayload} from "@/utils/types";

export abstract class ApiService {
    private static readonly logService = new LogService(this.name);
    //private static readonly host = __DEV__ ? "http://192.168.1.188:3000" : "http://82.29.174.212:3000";
    private static readonly host = "https://rodin-app.com"; // Production URL
    private static readonly defaultTimeout = 5000; // Timeout en millisecondes
    private static readonly serverErrorResponse = {
        status: 500,
        statusText: "Failed API call",
        data: {
            message: "Une erreur est survenue"
        },
        headers: {},
        config: {},
    } as AxiosResponse;

    static async register(payload: CreateUserPayload): Promise<AxiosResponse> {
        const methodName = "register";
        try {
            const response = await axios.post(`${this.host}/api/users`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async login(payload: LoginPayload): Promise<AxiosResponse> {
        const methodName = "login";
        try {
            const response = await axios.post(`${this.host}/api/users/auth`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async getUser(token: string): Promise<AxiosResponse> {
        const methodName = "getUser";
        try {
            const response = await axios.get(`${this.host}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async updateUser(token: string, payload: Prisma.UserUpdateInput): Promise<AxiosResponse> {
        const methodName = "updateUser";
        try {
            const response = await axios.put(`${this.host}/api/users`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async getFriendshipsOfUser(token: string, user: User): Promise<AxiosResponse> {
        const methodName = "getFriendshipsOfUser";
        try {
            const response = await axios.get(`${this.host}/api/friend`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    userId: user.id,
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async searchFriends(token: string, query: string): Promise<AxiosResponse> {
        const methodName = "searchFriends";
        try {
            const response = await axios.get(`${this.host}/api/friend/search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {query},
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async getCommunityFeed(token: string): Promise<AxiosResponse> {
        const methodName = "getCommunityFeed";
        try {
            const response = await axios.get(`${this.host}/api/community`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async publishRodpic(token: string, payload: PublishRodpicPayload): Promise<AxiosResponse> {
        const methodName = "publishRodpic";
        try {
            const response = await axios.post(`${this.host}/api/community`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async sendFriendRequest(token: string, payload: { friendId: string }): Promise<AxiosResponse> {
        const methodName = "sendFriendRequest";
        try {
            const response = await axios.post(`${this.host}/api/friend`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async respondToFriendRequest(token: string, payload: {
        friendshipId: string,
        status: FriendStatus
    }): Promise<AxiosResponse> {
        const methodName = "respondToFriendRequest";
        try {
            const response = await axios.put(`${this.host}/api/friend`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    static async removeFriend(token: string, params: { friendId: string }): Promise<AxiosResponse> {
        const methodName = "removeFriend";
        try {
            const response = await axios.delete(`${this.host}/api/friend`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: params,
                timeout: this.defaultTimeout,
            });

            return this.handleResponse(methodName, response);
        } catch (error) {
            return this.handleError(methodName, error);
        }
    }

    private static handleResponse(methodName: string, response: AxiosResponse): AxiosResponse {
        this.logService.log({
            type: LogType.Debug,
            data: [`${methodName}() response`, response.status, response.data]
        });
        return response;
    }

    private static handleError(methodName: string, error: any): AxiosResponse {
        if (axios.isAxiosError(error)) {
            this.logService.log({
                type: LogType.Error,
                data: [`${methodName}() error`, error]
            });

            switch (error.response?.status) {
                case HttpStatusCode.NotAcceptable:
                    this.logService.log({
                        type: LogType.Info,
                        data: ['NotAcceptable error returned']
                    });
                    return error.response;
                case HttpStatusCode.Unauthorized:
                    this.logService.log({
                        type: LogType.Info,
                        data: ['NotAcceptable error returned']
                    });
                    return error.response;
                case HttpStatusCode.Conflict:
                    this.logService.log({
                        type: LogType.Info,
                        data: ['Conflict error returned']
                    });
                    return error.response;
                default:
                    this.logService.log({
                        type: LogType.Info,
                        data: [`${methodName}() server error returned`]
                    });
                    return this.serverErrorResponse;
            }
        } else {
            this.logService.log({
                type: LogType.Error,
                data: [this.serverErrorResponse.data.message, error]
            });
            this.logService.log({
                type: LogType.Info,
                data: ['Server error returned']
            });
            return this.serverErrorResponse;
        }
    }
}