import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Row, Rows, Table} from 'react-native-table-component';
import {subscriptionAdvantages} from "@/utils/mocks";
import {Colors} from "@/utils/colors";
import {FontHelper} from "@/utils/helpers/fontHelper";
import {FontWeightEnum} from "@/utils/enums";

type Props = {};

export function SubscriptionAdvantageTable({}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Table
            borderStyle={{
                //borderWidth: 1,
                borderColor: Colors.foreground[colorScheme] + '33',
                gap: 0,
            }}
        >
            <Row
                flexArr={[2, 1, 1]}
                data={['Fonctionnalités', 'Gratuit', 'Premium']}
                style={{
                    //backgroundColor: Colors.foreground[colorScheme],
                    borderBottomWidth: 1,
                    borderColor: Colors.foreground[colorScheme] + '33',
                    paddingVertical: 10,
                    gap: 5,
                }}
                textStyle={{
                    color: Colors.foreground[colorScheme],
                    fontFamily: FontHelper.getMainFontStatic(FontWeightEnum.ExtraBold),
                }}
            />
            <Rows
                flexArr={[2, 1, 1]}
                data={subscriptionAdvantages}
                style={{
                    borderBottomWidth: 1,
                    borderColor: Colors.foreground[colorScheme] + '33',
                    paddingVertical: 10,
                    gap: 5,
                }}
                textStyle={{
                    color: Colors.foreground[colorScheme],
                    fontFamily: FontHelper.getMainFontVariable(),
                }}
            />
        </Table>
    );
}
