import React, {useRef, useState} from "react";
import {MessageSheet, ScreenTemplate, ThemedView} from "@/components";
import PagerView from "react-native-pager-view";
import {ChoosePseudo} from "@/components/domain/onboarding/choose-pseudo";
import {SetPhoneNumber} from "@/components/domain/onboarding/set-phone-number";
import {SetEmailAddress} from "@/components/domain/onboarding/set-email-address";
import {SetPassword} from "@/components/domain/onboarding/set-password";
import {useRouter} from "expo-router";
import {ReadCGU} from "@/components/domain/onboarding/read-cgu";
import {SetDefaultTimer} from "@/components/domain/onboarding/set-default-timer";
import {SetExerciseFrequency} from "@/components/domain/onboarding/set-exercise-frequency";
import {SetEmergencyCode} from "@/components/domain/onboarding/set-emergency-code";
import {SetAgeRange} from "@/components/domain/onboarding/set-age-range";
import {SetProfession} from "@/components/domain/onboarding/set-profession";
import {SetName} from "@/components/domain/onboarding/set-name";
import {AgeRange, ExerciseFrequency, Profession} from "@/utils/models/model.enums";
import {defaultBreakTime, defaultWorkTime, onboardingLogService} from "@/utils/constants";
import {LogType, ToastType} from "@/utils/enums";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {ApiService} from "@/utils/services/apiService";
import {CreateUserPayload} from "@/utils/types";
import {HttpStatusCode} from "axios";
import {ToastService} from "@/utils/services/toastService";
import {Loader} from "@/components/layouts/Loader";

export default function Page() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const pagerRef = useRef<PagerView | null>(null);
    const [step, setStep] = useState(0);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState({
        saveCredentials: false,
        createAccount: false,
    });
    const [formData, setFormData] = useState<CreateUserPayload>({
        firstname: 'Alexandre',
        lastname: 'TAHI',
        pseudo: 'alexxtahi',
        ageRange: AgeRange.AGE_18_24,
        profession: Profession.ETUDIANT,
        customProfession: undefined,
        email: 'alexandretahi7@gmail.com',
        phoneNumber: '+33602030405',
        password: 'Azerty123#',
        passwordConfirmation: 'Azerty123#',
        defaultWorkTime: {hours: 0, minutes: 45, seconds: 0},
        defaultBreakTime: {hours: 0, minutes: 10, seconds: 0},
        exerciseFrequency: ExerciseFrequency.ONE_PER_SESSION,
        emergencyCode: '1234',
        emergencyCodeConfirmation: '1234',
    });

    const goToNextStep = () => {
        pagerRef.current?.setPage(step + 1);
    }
    const goToPreviousStep = () => {
        pagerRef.current?.setPage(step - 1);
    }

    const register = async () => {
        onboardingLogService.log({
            type: LogType.Log,
            data: ['Onboarding - User data:', formData]
        });

        setIsBottomSheetOpen(prev => ({...prev, createAccount: true}));

        try {
            const response = await ApiService.register(formData);

            switch (response.status) {
                case HttpStatusCode.Created:
                    onboardingLogService.log({
                        type: LogType.Log,
                        data: ['User account created successfully.']
                    });
                    router.back();
                    router.replace('/(auth)/onboarding/finish');
                    break;
                case HttpStatusCode.Conflict:
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['User account already exists.']
                    });
                    ToastService.show({
                        type: ToastType.Error,
                        message: 'Un compte avec cette adresse email déjà. Veuillez en choisir une autre.',
                    })
                    break;
                default:
                    onboardingLogService.log({
                        type: LogType.Error,
                        data: ['Error creating user account:', response.data]
                    });
                    break;
            }
        } catch (error) {
            onboardingLogService.log({
                type: LogType.Error,
                data: ['Error creating user account (exception):', error]
            });
        } finally {
            setIsBottomSheetOpen(prev => ({...prev, createAccount: false}));
        }
    };

    return (
        <ScreenTemplate
            screenName={'auth/onboarding'}
            headerLeftBtn={step === 0 ? "backBtn" : {
                icon: 'ChevronLeft',
                onPress: goToPreviousStep
            }}
            setHeightToScreenSize={true}
            scrollEnabled={false}
            bottomSheet={(
                <>
                    <MessageSheet
                        title={"Enregistrer vos informations de connexions ?"}
                        subtitle={"Pour que vous n’ayez pas à les entrer lors de votre prochaine connexion."}
                        isOpen={isBottomSheetOpen.saveCredentials}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, saveCredentials: false}));
                        }}
                        confirm={{
                            text: "Oui",
                            onPress: () => {
                                setIsBottomSheetOpen(prev => ({...prev, saveCredentials: false}));
                                goToNextStep();
                            }
                        }}
                        cancel={{
                            text: "Plus tard",
                            onPress: () => {
                                setIsBottomSheetOpen(prev => ({...prev, saveCredentials: false}));
                                goToNextStep();
                            }
                        }}
                    />
                    <MessageSheet
                        title={"Création de votre compte"}
                        subtitle={"Votre compte Rodin va être créé avec les informations que vous avez saisies. Veuillez patienter s'il vous plait."}
                        isOpen={isBottomSheetOpen.createAccount}
                        closeOnTapOutside={false}
                        onClose={() => {
                            setIsBottomSheetOpen(prev => ({...prev, createAccount: false}));
                        }}
                        children={(
                            <ThemedView paddingStyle={'default'}>
                                <Loader/>
                            </ThemedView>
                        )}
                    />
                </>
            )}
        >
            <PagerView
                ref={pagerRef}
                initialPage={0}
                style={{flex: 1}}
                pageMargin={10}
                scrollEnabled={false}
                orientation={"horizontal"}
                keyboardDismissMode={"on-drag"}
                onPageSelected={(e) => setStep(e.nativeEvent.position)}
            >
                <SetName
                    key={"1"}
                    firstname={formData.firstname}
                    lastname={formData.lastname}
                    onChangeFirstName={(firstname) => setFormData({...formData, firstname})}
                    onChangeLastName={(lastname) => setFormData({...formData, lastname})}
                    onNextPress={goToNextStep}
                />
                <ChoosePseudo
                    key={"2"}
                    pseudo={formData.pseudo}
                    onChangePseudo={(pseudo) => setFormData({...formData, pseudo})}
                    onNextPress={goToNextStep}
                />
                <SetEmailAddress
                    key={"3"}
                    email={formData.email}
                    onChangeEmail={(email) => setFormData({...formData, email})}
                    onNextPress={goToNextStep}
                />
                <SetPhoneNumber
                    key={"4"}
                    phoneNumber={formData.phoneNumber}
                    onChangePhoneNumber={(phoneNumber) => setFormData({...formData, phoneNumber})}
                    onNextPress={goToNextStep}
                    onSkip={() => {
                        setFormData({...formData, phoneNumber: undefined});
                        goToNextStep();
                    }}
                />
                <SetPassword
                    key={"5"}
                    password={formData.password}
                    passwordConfirmation={formData.passwordConfirmation}
                    onChangePassword={(password) => setFormData({...formData, password})}
                    onChangePasswordConfirmation={(passwordConfirmation) => setFormData({
                        ...formData,
                        passwordConfirmation
                    })}
                    onNextPress={() => {
                        setIsBottomSheetOpen(prev => ({...prev, saveCredentials: true}));
                    }}
                />
                <ReadCGU
                    key={"6"}
                    onNextPress={goToNextStep}
                />
                <SetDefaultTimer
                    key={"7"}
                    defaultWorkTime={formData.defaultWorkTime}
                    defaultBreakTime={formData.defaultBreakTime}
                    onChangeDefaultWorkTime={(defaultWorkTime) => setFormData({
                        ...formData,
                        defaultWorkTime
                    })}
                    onChangeDefaultBreakTime={(defaultBreakTime) => setFormData({
                        ...formData,
                        defaultBreakTime
                    })}
                    onNextPress={goToNextStep}
                    onSkip={() => {
                        setFormData({
                            ...formData,
                            defaultWorkTime,
                            defaultBreakTime
                        });
                        goToNextStep();
                    }}
                />
                <SetExerciseFrequency
                    key={"8"}
                    onNextPress={goToNextStep}
                    exerciseFrequency={formData.exerciseFrequency}
                    onChangeExerciseFrequency={(exerciseFrequency) => setFormData({
                        ...formData,
                        exerciseFrequency
                    })}
                />
                <SetEmergencyCode
                    key={"9"}
                    onNextPress={goToNextStep}
                    emergencyCode={formData.emergencyCode}
                    emergencyCodeConfirmation={formData.emergencyCodeConfirmation}
                    onChangeEmergencyCode={(emergencyCode) => setFormData({...formData, emergencyCode})}
                    onChangeEmergencyCodeConfirmation={(emergencyCodeConfirmation) => setFormData({
                        ...formData,
                        emergencyCodeConfirmation
                    })}
                />
                <SetAgeRange
                    key={"10"}
                    onNextPress={goToNextStep}
                    ageRange={formData.ageRange}
                    onChangeAgeRange={(ageRange) => setFormData({...formData, ageRange})}
                />
                <SetProfession
                    key={"11"}
                    profession={formData.profession}
                    onChangeProfession={(profession, customProfession) => {
                        setFormData({
                            ...formData,
                            profession,
                            customProfession
                        });
                    }}
                    onNextPress={register}
                />
            </PagerView>

        </ScreenTemplate>
    );
}

