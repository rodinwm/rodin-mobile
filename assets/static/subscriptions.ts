import {SubscriptionFrequency, SubscriptionStatus} from "@/utils/models/model.enums";
import {Subscription} from "@/utils/interfaces";

type SubscriptionPlans = {
    [key in SubscriptionStatus]: Subscription;
};

export const SubscriptionPlans: SubscriptionPlans = {
    [SubscriptionStatus.PREMIUM]: {
        id: SubscriptionStatus.PREMIUM,
        title: "Premium",
        description: "Travaille dans un endroit calme et bien éclairé",
        price: {
            [SubscriptionFrequency.YEARLY]: 19.99,
            [SubscriptionFrequency.MONTHLY]: 1.99,
        },
        content: [
            "Tracker de temps de travail",
            "Exercices de concentration ou respiration: Illimité",
            "Bloqueur d'application pendant les sessions",
            "Aucune pubs",
            "Fonds d'écran pendant les sessions : Accès à la gallerie en plus",
            "Réglage libre du temps des sessions",
            "Accès aux Rodpics + Social",
            "Phrases de motivation personnalisables",
        ],
    },
    [SubscriptionStatus.FREE]: {
        id: SubscriptionStatus.FREE,
        title: "Gratuit",
        description: "Profite des fonctionnalités de base de Rodin avec des pubs",
        content: [
            "Exercices de concentration ou respiration : 1 fois/jour",
            "Fonds d'écran pendant les sessions : Accès restreint",
            "Réglage libre du temps des sessions",
            "Accès aux Rodpics + Social",
        ],
    },
};
