import {ThemedView} from '@/components/base/ThemedView';
import React, {useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import ThemedListTile from "@/components/base/ThemedListTile";
import ScreenTemplate from '@/components/layouts/ScreenTemplate';
import {ThemedText} from "@/components/base/ThemedText";
import ThemedCheckbox from "@/components/base/ThemedCheckbox";
import {NotificationType} from "@/utils/enums";


const notificationTypes = Object.values(NotificationType).filter((type) => type !== NotificationType.AutoSuggestions);

export default function Page() {
    const router = useRouter();
    const navigation = useNavigation();
    const [notifTypes, setNotifTypes] = useState({
        autoSuggestions: false,
        message: false,
        mail: false,
        flash: false
    })

    const updateNotifTypes = (type: NotificationType) => {
        setNotifTypes(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };

    return (
        <ScreenTemplate
            title={"Notifications"}
            headerLeftBtn={"backBtn"}
        >
            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={'h1'} className={"mb-6"}>Notifications intelligentes</ThemedText>
                <ThemedListTile
                    title={"Suggestions automatiques"}
                    subtitle={"Activer des suggestions automatiques (ex: \"Cela fait 2 jours que vous n'avez pas utilisé l'application\")"}
                    onPress={() => updateNotifTypes(NotificationType.AutoSuggestions)}
                    suffixIcon={(
                        <ThemedCheckbox isChecked={notifTypes[NotificationType.AutoSuggestions]} disabled={true}/>
                    )}
                />
            </ThemedView>

            <ThemedView className={'w-full flex flex-col gap-3'}>
                <ThemedText type={'h1'} className={"mb-6"}>Types de notifications</ThemedText>
                {notificationTypes.map((type, index: number) => (
                    <ThemedListTile
                        key={`notification-type-${index}`}
                        title={type.charAt(0).toUpperCase() + type.slice(1)}
                        onPress={() => updateNotifTypes(type)}
                        suffixIcon={(
                            <ThemedCheckbox isChecked={notifTypes[type]} disabled={true}/>
                        )}
                    />
                ))}
            </ThemedView>
        </ScreenTemplate>
    );
}

