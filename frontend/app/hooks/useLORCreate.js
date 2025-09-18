import { contractConfig } from "@/app/utils/contractConfig";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export function useLORCreate() {
    const { writeContract, data: txHash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

    function createLOR(lor) {
        return writeContract({
            ...contractConfig,
            functionName: "createLORRequest",
            args: [
                lor.requestId,
                lor.studentAddress,
                lor.name,
                lor.program,
                lor.university
            ]
        });
    }


    return { createLOR, txHash, isPending, isConfirming, isSuccess, error };
}