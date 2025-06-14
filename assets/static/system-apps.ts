import {faker} from '@faker-js/faker';
import {SystemApp} from "@/utils/interfaces";

export const SystemApps: SystemApp[] = Array.from({length: 50}, () => {
        return {
            name: faker.person.firstName(),
        } satisfies SystemApp;
    }
);
