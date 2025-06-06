import {
    LucideIcon,
    ScreenTemplate,
    SubscriptionAdvantageTable,
    ThemedButton,
    ThemedText,
    ThemedView
} from '@/components';
import React, {useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import {SubscriptionRecurrence} from "@/utils/enums";
import {subscriptions} from "@/assets/static/subscriptions";
import {CurrencyHelper} from "@/utils/helpers/currencyHelper";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Alert} from "react-native";
import {NotificationType} from "@rodinwm/rodin-models";

const notificationTypes = Object.values(NotificationType).filter((type) => type !== NotificationType.AutoSuggestions);

export default function Page() {
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();
    const navigation = useNavigation();
    const [subscriptionRecurrence, setSubscriptionRecurrence] = useState(SubscriptionRecurrence.Yearly);

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
                        type={subscriptionRecurrence === SubscriptionRecurrence.Yearly ? "default" : "no-fill"}
                        className={'flex-1'}
                        onPress={() => {
                            setSubscriptionRecurrence(SubscriptionRecurrence.Yearly);
                        }}
                    />
                    <ThemedButton
                        title={"Mensuel"}
                        textSize={"miniExtraBold"}
                        type={subscriptionRecurrence === SubscriptionRecurrence.Monthly ? "default" : "no-fill"}
                        className={'flex-1'}
                        onPress={() => {
                            setSubscriptionRecurrence(SubscriptionRecurrence.Monthly);
                        }}
                    />
                </ThemedView>

                {subscriptions.map((sub, index) => (
                    <ThemedView
                        key={`subscription-card-${index}`}
                        fillStyle={"opacity-15"}
                        radiusStyle={"default"}
                        paddingStyle={"default"}
                        borderStyle={"default"}
                        className={'w-full flex flex-col gap-4'}
                    >
                        <ThemedText type={'h1'}>{sub.title}</ThemedText>

                        <ThemedView className={'w-full flex flex-col gap-1'}>
                            {sub.price && (
                                <ThemedText>
                                    <ThemedText type={'title'}>
                                        {subscriptionRecurrence === SubscriptionRecurrence.Yearly ?
                                            CurrencyHelper.format(sub.price[subscriptionRecurrence] / 12)
                                            : CurrencyHelper.format(sub.price[subscriptionRecurrence])
                                        }
                                    </ThemedText> / mois
                                </ThemedText>
                            )}

                            {sub.price && (
                                <ThemedText className={'mb-2'}>
                                    {subscriptionRecurrence === SubscriptionRecurrence.Yearly ? `${CurrencyHelper.format(sub.price[subscriptionRecurrence])} facturé annuellement` : "Facturé mensuellement"}
                                </ThemedText>
                            )}

                            {sub.price && subscriptionRecurrence && (
                                <ThemedView
                                    paddingStyle={"small"}
                                    radiusStyle={"small"}
                                    className={'w-fit flex flex-row items-center gap-2 bg-background-success-light/10 dark:bg-background-success-dark/10'}
                                >
                                    <LucideIcon name={'Info'} size={18} color={Colors.foreground.success[colorScheme]}/>
                                    <ThemedText
                                        className={"text-foreground-success-light dark:text-foreground-success-dark"}
                                        type={"small"} filled={false}>
                                        {subscriptionRecurrence === SubscriptionRecurrence.Yearly ? (
                                            <>
                                                Economisez <ThemedText filled={false}
                                                                       className={'text-foreground-success-light dark:text-foreground-success-dark'}
                                                                       type={"miniExtraBold"}>{CurrencyHelper.computeDifferenceInPercent(sub.price[SubscriptionRecurrence.Yearly] / 12, sub.price[SubscriptionRecurrence.Monthly])}%</ThemedText>
                                            </>
                                        ) : (
                                            <>
                                                Economisez <ThemedText filled={false}
                                                                       className={'text-foreground-success-light dark:text-foreground-success-dark'}
                                                                       type={"miniExtraBold"}>{CurrencyHelper.computeDifferenceInPercent(sub.price[SubscriptionRecurrence.Yearly] / 12, sub.price[SubscriptionRecurrence.Monthly])}%</ThemedText> grâce
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

                        {sub.price && (
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

