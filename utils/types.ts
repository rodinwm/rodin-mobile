import {Prisma, TimerValue} from "@rodinwm/rodin-models/frontend";
import {AgeRange, ExerciseFrequency, Profession} from "@/utils/models/model.enums";

export type CreateUserPayload =
    Omit<Prisma.UserCreateInput, 'defaultWorkTime' | 'defaultBreakTime' | 'ageRange' | 'exerciseFrequency' | 'profession'>
    & {
    passwordConfirmation: string;
    emergencyCode: string;
    emergencyCodeConfirmation: string;
    exerciseFrequency: ExerciseFrequency;
    phoneNumber?: string;
    defaultWorkTime: TimerValue;
    defaultBreakTime: TimerValue;
    ageRange: AgeRange;
    profession: Profession;
    customProfession?: string;
};

export type LoginPayload = {
    pseudo: string;
    email: string;
    password: string;
};

export type LoginResponseData = {
    message: string;
    token: string;
    user: {
        id: string;
        email: string;
        pseudo: string;
        emailVerified: boolean;
    };
};