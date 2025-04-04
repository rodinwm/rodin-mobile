const Routes: string[] = [
    "index",
    "(tabs)",
    // Auth
    "auth/login",
    "auth/forgot-password",
    "auth/onboarding/index",
    "auth/onboarding/finish",
    // Timer
    "timer/index",
    "timer/request-exercise-before",
    "timer/lock-screen",
    // Profile
    "profile/personal-infos",
    "profile/appearance",
    // Profile > Privacy
    "profile/privacy/index",
    "profile/privacy/personal-data",
    "profile/privacy/security",
    "profile/privacy/notifications",
    "profile/privacy/other-services",
    "profile/privacy/more-infos",
    "profile/privacy/exercises-settings/index",
    "profile/privacy/exercises-settings/motivation-sentence",
    "profile/privacy/exercises-settings/urgency-code",
    // Profile > Help
    "profile/help/index",
    "profile/help/guide",
    "profile/help/tips",
    "profile/help/faq",
    // Community
    "community/index",
    "community/friend-requests",
];

export default Routes;
