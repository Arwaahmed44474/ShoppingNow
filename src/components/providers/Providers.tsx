"use client"

import { Provider } from "react-redux"
import {creatStore, preloadedState, storeType} from '../../store/store'
import { ReactNode, useRef } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"



export default function Providers({ children, preloadedAuth }:
    {
        children: ReactNode,
        preloadedAuth: preloadedState
    }) {

    // const myStore = creatStore(preloadedAuth);

    const myStore =  useRef<null | storeType>(null);

    if (myStore.current == null) {
        myStore.current = creatStore(preloadedAuth);
    }


    const myClient = new QueryClient();
    return <>    
        <Provider store={myStore.current}>
            <QueryClientProvider client={myClient}>
                
                {children}

                <ReactQueryDevtools initialIsOpen={ false}  position="bottom"/>

            </QueryClientProvider>
        </Provider>
    </>
}
