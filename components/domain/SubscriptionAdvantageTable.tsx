import React from "react";
import {useColorScheme} from "@/utils/hooks/useColorScheme";
import {Row, Rows, Table} from 'react-native-table-component';
import {subscriptionAdvantages} from "@/utils/mocks";
import {Colors} from "@/utils/colors";

type Props = {};

export function SubscriptionAdvantageTable({}: Props) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <Table
            borderStyle={{borderWidth: 1, borderColor: Colors.foreground[colorScheme] + '33'}}
        >
            <Row
                data={['Head', 'Head2', 'Head3', 'Head4']}
                textStyle={{color: Colors.foreground[colorScheme]}}
            />
            <Rows
                data={subscriptionAdvantages}
                textStyle={{color: Colors.foreground[colorScheme]}}
            />
        </Table>
    );
}
