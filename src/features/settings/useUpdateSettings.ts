import { updateSetting } from "@/services/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Setting } from "./settingsTypes";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending: isUpdating } = useMutation({
        mutationFn: (newSetting: Setting) => updateSetting(newSetting),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
            return toast(error.message);
        },
    });
    return { mutate, isUpdating };
};
