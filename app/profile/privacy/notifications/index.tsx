import {ScreenTemplate, ThemedCheckbox, ThemedListTile, ThemedText, ThemedView} from '@/components';
import React, {useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import {NotificationType} from "@rodinwm/rodin-models/frontend";
import {modelService} from "@/utils/constants";

const notificationTypes = modelService.getNotificationTypes().filter((type) => type !== NotificationType.AUTO_SUGGESTIONS);

const Page = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [notifTypes, setNotifTypes] = useState({
        [NotificationType.AUTO_SUGGESTIONS]: false,
        [NotificationType.MESSAGE]: false,
        [NotificationType.MAIL]: false,
        [NotificationType.FLASH]: false,
    });

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
                    onPress={() => updateNotifTypes(NotificationType.AUTO_SUGGESTIONS)}
                    suffixIcon={(
                        <ThemedCheckbox isChecked={notifTypes[NotificationType.AUTO_SUGGESTIONS]} disabled={true}/>
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

export default Page;