import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedText} from "@/components/base/ThemedText";
import {NotificationType, SubscriptionRecurrence} from "@/utils/enums";
import {ThemedButton} from "@/components/base/ThemedButton";
import {subscriptions} from "@/assets/static/subscriptions";
import {CurrencyHelper} from "@/utils/helpers/currencyHelper";
import LucideIcon from "@/components/base/LucideIcon";
import {Colors} from "@/utils/colors";
import {useColorScheme} from "@/utils/hooks/useColorScheme";


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
                        className={'w-full flex flex-col gap-4'}
                    >
                        <ThemedText type={'h1'}>{sub.title}</ThemedText>


                        <ThemedView className={'w-full flex flex-col gap-1'}>
                            <ThemedText>
                                <ThemedText type={'title'}>
                                    {CurrencyHelper.format(sub.price[subscriptionRecurrence])}
                                </ThemedText> / {subscriptionRecurrence === SubscriptionRecurrence.Yearly ? "an" : "mois"}
                            </ThemedText>

                            {subscriptionRecurrence === SubscriptionRecurrence.Monthly && (
                                <ThemedView
                                    //fillStyle={"opacity-5"}
                                    paddingStyle={"small"}
                                    radiusStyle={"small"}
                                    className={'w-full flex flex-row items-center gap-2 bg-background-success-light/10 dark:bg-background-success-dark/10'}
                                >
                                    <LucideIcon name={'Info'} size={18} color={Colors.foreground.success[colorScheme]}/>
                                    <ThemedText
                                        className={"flex-1 text-foreground-success-light dark:text-foreground-success-dark"}
                                        type={"small"} filled={false}>
                                        Economisez <ThemedText filled={false}
                                                               className={'text-foreground-success-light dark:text-foreground-success-dark'}
                                                               type={"miniExtraBold"}>{CurrencyHelper.computeDifferenceInPercent(sub.price[SubscriptionRecurrence.Yearly], sub.price[SubscriptionRecurrence.Monthly])}%</ThemedText> grâce
                                        à l'abonnement annuel
                                    </ThemedText>
                                </ThemedView>
                            )}
                        </ThemedView>

                        <ThemedText>{sub.description}</ThemedText>

                        <ThemedView className={'w-full flex flex-col'}>
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

                        <ThemedView className={'w-full flex flex-col mt-4'}>
                            <ThemedButton
                                title={"S'abonner"}
                                onPress={() => {

                                }}
                            />
                        </ThemedView>
                    </ThemedView>
                ))}
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={'h1'} className={"mb-6"}>Avantages</ThemedText>
                <ThemedText>Avantages</ThemedText>
            </ThemedView>
        </ScreenTemplate>
    );
}

