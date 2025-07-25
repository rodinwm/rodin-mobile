import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiService} from '@/utils/services/apiService';
import {useRouter} from 'expo-router';
import {User} from "@rodinwm/rodin-models/frontend";
import {authLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {ToastService} from "@/utils/services/toastService";
import {AuthService} from "@/utils/services/authService";

type Props = {
    redirectIfUnauthenticated?: boolean;
};

export function useAuthUser({redirectIfUnauthenticated = false}: Props) {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [authUser, setAuthUser] = useState<User | null>(null);

    const loadAuthData = async () => {
        try {
            const storedToken = await AuthService.getToken();
            const storedUser = await AuthService.getAuthUser();

            if (!storedToken) {
                if (redirectIfUnauthenticated) router.replace('/(welcome)');
                setAuthUser(null);

                authLogService.log({
                    type: LogType.Error,
                    data: ['No token found, redirecting to welcome page.']
                });
                ToastService.show({
                    type: ToastType.Error,
                    message: "Veuillez vous reconnecter s'il vous plait."
                });
                return;
            }

            setToken(storedToken);

            if (storedUser) {
                setAuthUser(storedUser);
                return;
            }

            // Fetch user from API if not stored
            const response = await ApiService.getUser(storedToken);
            const user = response.data.user as User;
            await AuthService.storeAuthUser(user);
            setAuthUser(user);
        } catch (error) {
            authLogService.log({
                type: LogType.Error,
                data: ['Error fetching user data:', error]
            });
            setAuthUser(null);
            setToken(null);
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('authUser');
            if (redirectIfUnauthenticated) router.replace('/(welcome)');
        }
    };

    useEffect(() => {
        loadAuthData().then(() => {
            authLogService.log({
                type: LogType.Log,
                data: ['Auth user and token loaded successfully.', token, authUser]
            });
        });
    }, []);

    return {authUser, token};
}