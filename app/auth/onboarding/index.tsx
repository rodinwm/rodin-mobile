import React, {useRef, useState} from "react";
import ScreenTemplate from "@/components/layouts/ScreenTemplate";
import PagerView from "react-native-pager-view";
import ChoosePseudo from "@/app/auth/onboarding/steps/choose-pseudo";
import SetPhoneNumber from "@/app/auth/onboarding/steps/set-phone-number";

export default function Page() {
    const pagerRef = useRef<PagerView | null>(null);
    const [step, setStep] = useState(0);
    const goToNextStep = () => {
        pagerRef.current?.setPage(step + 1);
    }

    return (
        <ScreenTemplate
            headerLeftBtn={"backBtn"}
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
                <SetPhoneNumber key={"2"}
                                
                />
            </PagerView>

        </ScreenTemplate>
    );
}

