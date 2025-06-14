import axios, {AxiosResponse, HttpStatusCode} from 'axios';
import {CreateUserRequestBody} from "@rodinwm/rodin-models";

export abstract class ApiHelper {
    private readonly host = "http://127.0.0.1:8000";
    private readonly defaultTimeout = 5000; // Timeout en millisecondes
    private readonly serverErrorResponse = {
        status: 500,
        statusText: "Failed API call",
        data: {
            message: "Une erreur est survenue"
        },
        headers: {},
        config: {},
    } as AxiosResponse;

    async register(payload: CreateUserRequestBody): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.host}/api/users`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: this.defaultTimeout,
            });

            console.debug("register response", response.status, response.data);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("register error", error);

                switch (error.response?.status) {
                    case HttpStatusCode.NotAcceptable:
                        return error.response;
                    default:
                        return this.serverErrorResponse;
                }
            } else {
                console.error(this.serverErrorResponse.data.message, error);
                return this.serverErrorResponse;
            }
        }
    }
}