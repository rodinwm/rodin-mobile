import {Subscription} from "@/utils/interfaces";
import {SubscriptionRecurrence} from "@/utils/enums";

export const subscriptions: Subscription[] = [
    {
        title: "Premium",
        description: "Travaille dans un endroit calme et bien éclairé",
        price: {
            [SubscriptionRecurrence.Yearly]: 0.99,
            [SubscriptionRecurrence.Monthly]: 1.99
        },
        content: [
            "Lorem ipsum dolor sit ame",
            "Lorem ipsum dolor sit ame sfdf sdfd fdsdf sdf sdfsd",
            "Lorem ipsum dolor sit ame"
        ]
    },
    {
        title: "Premium +",
        description: "Travaille dans un endroit calme et bien éclairé",
        price: {
            [SubscriptionRecurrence.Yearly]: 1.99,
            [SubscriptionRecurrence.Monthly]: 2.99
        },
        content: [
            "Lorem ipsum dolor sit ame",
            "Lorem ipsum dolor sit ame"
        ]
    },
];
