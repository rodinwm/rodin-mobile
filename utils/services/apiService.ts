import axios, {AxiosResponse, HttpStatusCode} from 'axios';
import {LogService} from "@/utils/services/logService";
import {LogType} from "@/utils/enums";

export abstract class ApiService {
    private static readonly logService = new LogService(this.name);
    private static readonly host = "http://82.29.174.212:3000";
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

    static async register(payload: any): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.host}/api/users`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            this.logService.log({
                type: LogType.Debug,
                data: ["register() response", response.status, response.data]
            });
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.logService.log({
                    type: LogType.Error,
                    data: ["register() error", error]
                });

                switch (error.response?.status) {
                    case HttpStatusCode.NotAcceptable:
                        return error.response;
                    default:
                        return this.serverErrorResponse;
                }
            } else {
                this.logService.log({
                    type: LogType.Error,
                    data: [this.serverErrorResponse.data.message, error]
                });
                return this.serverErrorResponse;
            }
        }
    }
}