// file:  hooks/usePrefetchRoutes.ts
import {Href, useRouter} from "expo-router";
import {useEffect} from "react";

export function usePrefetchRoutes(routes: Href[]) {
    const router = useRouter();

    useEffect(() => {
        routes.forEach((route) => router.prefetch(route));
    }, [routes.join('')]);
}