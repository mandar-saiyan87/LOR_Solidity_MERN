import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { chainconfig } from "../config.js";

import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
    appName: 'LOR project',
    projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_APP_ID,
    chains: chainconfig,
    // ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();