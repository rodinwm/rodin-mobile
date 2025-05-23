import React, {useRef, useState} from "react";
import {MessageSheet, ScreenTemplate} from "@/components";
import PagerView from "react-native-pager-view";
import ChoosePseudo from "@/app/auth/onboarding/steps/choose-pseudo";
import SetPhoneNumber from "@/app/auth/onboarding/steps/set-phone-number";
import SetEmailAddress from "@/app/auth/onboarding/steps/set-email-address";
import SetPassword from "@/app/auth/onboarding/steps/set-password";
import {useRouter} from "expo-router";
import ReadCGU from "@/app/auth/onboarding/steps/read-cgu";
import SetDefaultTimer from "@/app/auth/onboarding/steps/set-default-timer";
import SetExerciseFrequency from "@/app/auth/onboarding/steps/set-exercise-frequency";
import SetEmergencyCode from "@/app/auth/onboarding/steps/set-emergency-code";
import SetAgeRange from "@/app/auth/onboarding/steps/set-age-range";
import SetProfession from "@/app/auth/onboarding/steps/set-profession";

export default function Page() {
    const pagerRef = useRef<PagerView | null>(null);
    const [step, setStep] = useState(0);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const router = useRouter();

    const goToNextStep = () => {
        pagerRef.current?.setPage(step + 1);
    }
    const goToPreviousStep = () => {
        pagerRef.current?.setPage(step - 1);
    }

    return (
        <ScreenTemplate
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
                <ChoosePseudo
                    key={"1"}
                    onNextPress={goToNextStep}
                />
                <SetPhoneNumber
                    key={"2"}
                    onNextPress={goToNextStep}
                />
                <SetEmailAddress
                    key={"3"}
                    onNextPress={goToNextStep}
                />
                <SetPassword
                    key={"4"}
                    onNextPress={() => {
                        setIsBottomSheetOpen(true);
                    }}
                />
                <ReadCGU
                    key={"5"}
                    onNextPress={goToNextStep}
                />
                <SetDefaultTimer
                    key={"6"}
                    onNextPress={goToNextStep}
                />
                <SetExerciseFrequency
                    key={"7"}
                    onNextPress={goToNextStep}
                />
                <SetEmergencyCode
                    key={"8"}
                    onNextPress={goToNextStep}
                />
                <SetAgeRange
                    key={"9"}
                    onNextPress={goToNextStep}
                />
                <SetProfession
                    key={"10"}
                    onNextPress={() => router.push('/auth/onboarding/finish')}
                />
            </PagerView>

        </ScreenTemplate>
    );
}

