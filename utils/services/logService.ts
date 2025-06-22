import {LogType} from "@/utils/enums";

type Log = {
    type: LogType;
    data: any[];
}

export class LogService {

    constructor(
        private readonly serviceName: string,
    ) {
    }

    log(log: Log) {
        const timestamp = new Date().toISOString();
        console[log.type](`[${timestamp}] [${this.serviceName}]`, ...log.data);
    }
}