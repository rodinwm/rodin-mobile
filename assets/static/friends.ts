import {faker} from '@faker-js/faker';
import {User} from '@rodinwm/rodin-models/frontend';
import {AgeRange, Profession, SubscriptionStatus} from '@/utils/models/model.enums';

export const Friends: User[] = Array.from({length: 15}, () => {
    return {
        id: faker.person.firstName(),
        pseudo: faker.internet.username(),
        email: faker.internet.email(),
        emailVerified: true,
        passwordHash: faker.internet.password({length: 20}),
        profession: Profession.LYCEEN,
        subscriptionStatus: SubscriptionStatus.FREE,
        ageRange: AgeRange.AGE_25_34,
    };
});
