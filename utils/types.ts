import {Prisma, TimerValue, User} from "@rodinwm/rodin-models/frontend";
import {AgeRange, ExerciseFrequency, FriendStatus, Profession} from "@/utils/models/model.enums";

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

export type CGUData = {
    title: string
    content: string[]
};

export type PublishRodpicPayload = {
    firstPic: string
    secondPic: string
    date: number
};

export type RodpicData = {
    user: {
        pseudo: string
        firstname: string
        lastname: string
    }
    firstPic: string
    secondPic: string
    date: number
};

export type FriendData = {
    id: string,
    pseudo: string,
    firstname: string,
    lastname: string,
    email: string,
    status?: FriendStatus,
};

export type FriendshipData = {
    id: string;
    status: FriendStatus;
    createdAt: string;
    updatedAt: string;
    userId: string;
    friendId: string;
    user: User;
    friend: User;
};