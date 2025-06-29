// file: app/routes.ts

const Routes: string[] = [
    "index",
    "(tabs)",
    // Auth
    "auth/forgot-password",
    "auth/login",
    // Auth > Onboarding
    "auth/onboarding",
    "auth/onboarding/finish",
    // Community
    "community/friend-requests",
    // Games
    "games/breathing",
    "games/patterns",
    "games/pods",
    // Profile
    "profile/appearance",
    "profile/personal-infos",
    // Profile > Subscription
    "profile/subscription",
    // Profile > Privacy
    "profile/privacy",
    "profile/privacy/personal-data",
    "profile/privacy/security",
    "profile/privacy/notifications",
    "profile/privacy/other-services",
    "profile/privacy/more-infos",
    "profile/privacy/exercises-settings",
    "profile/privacy/exercises-settings/motivation-sentence",
    "profile/privacy/exercises-settings/urgency-code",
    // Profile > Help
    "profile/help",
    "profile/help/guide",
    "profile/help/tips",
    "profile/help/faq",
    // RodPic's
    "rodpics",
    "rodpics/preview",
    // Timer
    "timer",
    "timer/request-exercise-before",
    "timer/lock-screen",
];

export default Routes;