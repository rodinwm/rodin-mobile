// file: app/profile/subscription/index.tsx

import {
    LucideIcon,
    ScreenTemplate,
    SubscriptionAdvantageTable,
    ThemedButton,
    ThemedText,
    ThemedView
} from '@/components';
import React, {useEffect, useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import {SubscriptionPlans} from "@/assets/static/subscriptions";
import {CurrencyService} from "@/utils/services/currencyService";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Alert} from "react-native";
import {useAuthUser} from "@/utils/hooks/useAuthUser";
import {SubscriptionFrequency, SubscriptionStatus} from "@/utils/models/model.enums";

const subscriptionPlans = Object.values(SubscriptionPlans);

export default function Page() {
    const colorScheme = useColorScheme();
    const {authUser} = useAuthUser({});
    const router = useRouter();
    const navigation = useNavigation();
    const [subscriptionFrequency, setSubscriptionFrequency] = useState<SubscriptionFrequency>(SubscriptionFrequency.YEARLY);
    const [selectedPlan, setSelectedPlan] = useState(SubscriptionStatus.FREE);

    useEffect(() => {
        if (authUser) {
            setSelectedPlan(authUser.subscriptionStatus as SubscriptionStatus);
        }
    }, [authUser]);

    return (
        <ScreenTemplate
            title={"Abonnement"}
            headerLeftBtn={"backBtn"}
        >
            <ThemedView className={'w-full flex flex-col gap-6'}>
                {/* Tabs */}
                <ThemedView className={'w-full flex flex-row gap-2 items-center'}>
                    <ThemedButton
                        title={"Annuel"}
                        textSize={"miniExtraBold"}
                        type={subscriptionFrequency === SubscriptionFrequency.YEARLY ? "default" : "no-fill"}
                        className={'flex-1'}
                        onPress={() => {
                            setSubscriptionFrequency(SubscriptionFrequency.YEARLY);
                        }}
                    />
                    <ThemedButton
                        title={"Mensuel"}
                        textSize={"miniExtraBold"}
                        type={subscriptionFrequency === SubscriptionFrequency.MONTHLY ? "default" : "no-fill"}
                        className={'flex-1'}
                        onPress={() => {
                            setSubscriptionFrequency(SubscriptionFrequency.MONTHLY);
                        }}
                    />
                </ThemedView>

                {subscriptionPlans.map((sub, index) => (
                    <ThemedView
                        key={`subscription-card-${index}`}
                        fillStyle={"opacity-15"}
                        radiusStyle={"default"}
                        paddingStyle={"default"}
                        borderStyle={selectedPlan === sub.id ? "default" : "opacity-20"}
                        borderWidth={2}
                        className={'w-full flex flex-col gap-4'}
                    >
                        <ThemedView className={'w-full flex flex-row gap-1 justify-between items-center'}>
                            <ThemedText type={'h1'}>{sub.title}</ThemedText>
                        </ThemedView>

                        <ThemedView className={'w-full flex flex-col gap-1'}>
                            {sub.price && (
                                <ThemedText>
                                    <ThemedText type={'title'}>
                                        {subscriptionFrequency === SubscriptionFrequency.YEARLY ?
                                            CurrencyService.format(sub.price[subscriptionFrequency] / 12)
                                            : CurrencyService.format(sub.price[subscriptionFrequency])
                                        }
                                    </ThemedText> / mois
                                </ThemedText>
                            )}

                            {sub.price && (
                                <ThemedText className={'mb-2'}>
                                    {subscriptionFrequency === SubscriptionFrequency.YEARLY ? `${CurrencyService.format(sub.price[subscriptionFrequency])} facturé annuellement` : "Facturé mensuellement"}
                                </ThemedText>
                            )}

                            {sub.price && SubscriptionFrequency && (
                                <ThemedView
                                    paddingStyle={"small"}
                                    radiusStyle={"small"}
                                    className={'w-fit flex flex-row items-center gap-2 bg-background-success-light/10 dark:bg-background-success-dark/10'}
                                >
                                    <LucideIcon name={'Info'} size={18} color={Colors.foreground.success[colorScheme]}/>
                                    <ThemedText
                                        className={"text-foreground-success-light dark:text-foreground-success-dark"}
                                        type={"small"} filled={false}>
                                        {subscriptionFrequency === SubscriptionFrequency.YEARLY ? (
                                            <>
                                                Economisez <ThemedText filled={false}
                                                                       className={'text-foreground-success-light dark:text-foreground-success-dark'}
                                                                       type={"miniExtraBold"}>{CurrencyService.computeDifferenceInPercent(sub.price[SubscriptionFrequency.YEARLY] / 12, sub.price[SubscriptionFrequency.MONTHLY])}%</ThemedText>
                                            </>
                                        ) : (
                                            <>
                                                Economisez <ThemedText filled={false}
                                                                       className={'text-foreground-success-light dark:text-foreground-success-dark'}
                                                                       type={"miniExtraBold"}>{CurrencyService.computeDifferenceInPercent(sub.price[SubscriptionFrequency.YEARLY] / 12, sub.price[SubscriptionFrequency.MONTHLY])}%</ThemedText> grâce
                                                à l'abonnement annuel
                                            </>
                                        )}
                                    </ThemedText>
                                </ThemedView>
                            )}
                        </ThemedView>

                        <ThemedView className={'w-full flex flex-col gap-2'}>
                            {sub.content.map((content, index) => (
                                <ThemedView
                                    key={`subscription-card-content-line-${index}`}
                                    className={'w-full flex flex-row items-center opacity-50 gap-2'}
                                >
                                    <LucideIcon name={'Check'} size={18}/>
                                    <ThemedText>{content}</ThemedText>
                                </ThemedView>
                            ))}
                        </ThemedView>

                        {sub.price && (authUser === null || authUser.subscriptionStatus !== sub.title.toUpperCase()) && (
                            <ThemedView className={'w-full flex flex-col mt-4'}>
                                <ThemedButton
                                    title={"S'abonner"}
                                    onPress={() => {
                                        Alert.alert(`Abonnement au plan ${sub.title}`);
                                    }}
                                />
                            </ThemedView>
                        )}
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3 mt-6'}>
                <ThemedText type={'h1'}>Avantages détaillés</ThemedText>
                <SubscriptionAdvantageTable/>
            </ThemedView>
        </ScreenTemplate>
    );
}

