import {faker} from '@faker-js/faker';
import User from "@/models/User";

export const Friends: User[] = Array.from({length: 5}, () =>
    new User({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        username: faker.internet.username()
    })
);
