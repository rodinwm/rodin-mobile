import React, {useRef, useState} from "react";
import {MessageSheet, ScreenTemplate} from "@/components";
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
import {AgeRange, ExerciseFrequency, Prisma, Profession} from "@rodinwm/rodin-models/frontend";

export default function Page() {
    const router = useRouter();
    const pagerRef = useRef<PagerView | null>(null);
    const [step, setStep] = useState(0);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [formData, setFormData] = useState<Prisma.UserCreateInput>({
        firstname: 'Alexandre',
        lastname: 'TAHI',
        pseudo: 'alexxtahi',
        ageRange: AgeRange.AGE_18_24,
        profession: Profession.ETUDIANT,
        email: 'alexandretahi7@gmail.com',
        phoneNumber: '+33602030405',
        password: 'Azerty123#',
        passwordConfirmation: 'Azerty123#',
        cgu: false,
        defaultWorkTime: {hours: 0, minutes: 45, seconds: 0},
        defaultBreakTime: {hours: 0, minutes: 45, seconds: 0},
        exerciseFrequency: ExerciseFrequency.ONE_PER_SESSION,
        emergencyCode: '1234',
    });

    const goToNextStep = () => {
        pagerRef.current?.setPage(step + 1);
    }
    const goToPreviousStep = () => {
        pagerRef.current?.setPage(step - 1);
    }

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
                <MessageSheet
                    title={"Enregistrer vos informations de connexions ?"}
                    subtitle={"Pour que vous n’ayez pas à les entrer lors de votre prochaine connexion."}
                    isOpen={isBottomSheetOpen}
                    onClose={() => {
                        setIsBottomSheetOpen(false);
                    }}
                    confirm={{
                        text: "Oui",
                        onPress: () => {
                            setIsBottomSheetOpen(false);
                            goToNextStep();
                        }
                    }}
                    cancel={{
                        text: "Plus tard",
                        onPress: () => {
                            setIsBottomSheetOpen(false);
                            goToNextStep();
                        }
                    }}
                />
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
                    onNextPress={goToNextStep}
                />
                <ChoosePseudo
                    key={"2"}
                    onNextPress={goToNextStep}
                />
                <SetEmailAddress
                    key={"3"}
                    onNextPress={goToNextStep}
                />
                <SetPhoneNumber
                    key={"4"}
                    onNextPress={goToNextStep}
                />
                <SetPassword
                    key={"5"}
                    onNextPress={() => {
                        setIsBottomSheetOpen(true);
                    }}
                />
                <ReadCGU
                    key={"6"}
                    onNextPress={goToNextStep}
                />
                <SetDefaultTimer
                    key={"7"}
                    onNextPress={goToNextStep}
                />
                <SetExerciseFrequency
                    key={"8"}
                    onNextPress={goToNextStep}
                />
                <SetEmergencyCode
                    key={"9"}
                    onNextPress={goToNextStep}
                />
                <SetAgeRange
                    key={"10"}
                    onNextPress={goToNextStep}
                />
                <SetProfession
                    key={"11"}
                    onNextPress={() => router.push('/(auth)/onboarding/finish')}
                />
            </PagerView>

        </ScreenTemplate>
    );
}

