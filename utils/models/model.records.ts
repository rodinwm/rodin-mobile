// file: utils/records.ts

import {
    AgeRange,
    ConcentrationExercise,
    ExerciseFrequency,
    FriendStatus,
    NotificationType,
    Profession,
    SubscriptionFrequency,
    SubscriptionStatus,
    TimeSessionType
} from "./model.enums";
import {RodinEnumName} from "@rodinwm/rodin-models";

export const SubscriptionStatusLabels: Record<SubscriptionStatus, string> = {
    [SubscriptionStatus.FREE]: "Gratuit",
    [SubscriptionStatus.PREMIUM]: "Premium",
};

export const SubscriptionFrequencyLabels: Record<SubscriptionFrequency, string> = {
    [SubscriptionFrequency.MONTHLY]: "Mensuel",
    [SubscriptionFrequency.YEARLY]: "Annuel",
};

export const FriendStatusLabels: Record<FriendStatus, string> = {
    [FriendStatus.PENDING]: "En attente",
    [FriendStatus.ACCEPTED]: "Accepté",
    [FriendStatus.REJECTED]: "Refusé",
};

export const ConcentrationExerciseLabels: Record<ConcentrationExercise, string> = {
    [ConcentrationExercise.PODS]: "Pod Game",
    [ConcentrationExercise.PATTERNS]: "Pattern",
    [ConcentrationExercise.BREATHING]: "Respiration",
};

export const ProfessionLabels: Record<Profession, string> = {
    [Profession.LYCEEN]: "Lycéen",
    [Profession.ETUDIANT]: "Étudiant",
    [Profession.ENTREPRENEUR]: "Entrepreneur",
    [Profession.CHERCHEUR]: "Chercheur",
    [Profession.MANAGER]: "Manager",
    [Profession.SALARIE]: "Salarié",
    [Profession.AUTRE]: "Autre",
};

export const NotificationTypeLabels: Record<NotificationType, string> = {
    [NotificationType.AUTO_SUGGESTIONS]: "Suggestions automatiques",
    [NotificationType.MESSAGE]: "Message",
    [NotificationType.MAIL]: "Email",
    [NotificationType.FLASH]: "Notification flash",
};

export const AgeRangeLabels: Record<AgeRange, string> = {
    [AgeRange.UNDER_18]: "Moins de 18 ans",
    [AgeRange.AGE_18_24]: "18 à 24 ans",
    [AgeRange.AGE_25_34]: "25 à 34 ans",
    [AgeRange.AGE_35_44]: "35 à 44 ans",
    [AgeRange.AGE_45_54]: "45 à 54 ans",
    [AgeRange.AGE_55_64]: "55 à 64 ans",
    [AgeRange.OVER_64]: "Plus de 64 ans",
};

export const TimeSessionTypeLabels: Record<TimeSessionType, string> = {
    [TimeSessionType.WORK]: "Travail",
    [TimeSessionType.BREAK]: "Pause",
};

export const ExerciseFrequencyLabels: Record<ExerciseFrequency, string> = {
    [ExerciseFrequency.ONE_PER_SESSION]: "Un par session",
    [ExerciseFrequency.AFTER_EACH_BREAK]: "Après chaque pause",
};

export const RodinEnumMap: Record<RodinEnumName, Record<string, string>> = {
    SubscriptionStatus,
    SubscriptionFrequency,
    FriendStatus,
    ConcentrationExercise,
    Profession,
    NotificationType,
    AgeRange,
    TimeSessionType,
    ExerciseFrequency,
};

export const EnumLabelMap: Record<RodinEnumName, Record<string, string>> = {
    SubscriptionStatus: SubscriptionStatusLabels,
    SubscriptionFrequency: SubscriptionFrequencyLabels,
    FriendStatus: FriendStatusLabels,
    ConcentrationExercise: ConcentrationExerciseLabels,
    Profession: ProfessionLabels,
    NotificationType: NotificationTypeLabels,
    AgeRange: AgeRangeLabels,
    TimeSessionType: TimeSessionTypeLabels,
    ExerciseFrequency: ExerciseFrequencyLabels,
};