// file: src/utils/types.ts

export type RodinEnumName =
    | 'SubscriptionStatus'
    | 'SubscriptionFrequency'
    | 'FriendStatus'
    | 'ConcentrationExercise'
    | 'Profession'
    | 'NotificationType'
    | 'AgeRange'
    | 'TimeSessionType'
    | 'ExerciseFrequency';

export type EnumTestCase = {
    enumName: RodinEnumName;
    enumObject: Record<string, string>;
    labels: Record<string, string>;
};