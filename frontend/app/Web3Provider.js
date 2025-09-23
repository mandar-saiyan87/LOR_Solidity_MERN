"use client"
import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import {
    sepolia
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
    appName: 'LOR Portal',
    projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_APP_ID,
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL)
    }

});

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
