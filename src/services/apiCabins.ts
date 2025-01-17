import { createSupabaseCabinFromCabin, handleError } from "@/utils/helpers";
import supabase from "./supabaseClient";
import { Cabin } from "@/types/interfaces";
import { SupabaseBuckets } from "./supabaseTypes";

export const getCabins = async () => {
    try {
        const { data: cabins, error } = await supabase
            .from("cabins")
            .select("*");
        if (!cabins || error) {
            throw error;
        }
        return cabins;
    } catch (error) {
        throw handleError(error);
    }
};

export const createCabin = async (cabin: Cabin) => {
    const newCabin = createSupabaseCabinFromCabin(cabin);
    try {
        if (cabin?.image) {
            // upload the image to the bucket
            const { publicUrl } = await uploadImageToBucket(
                cabin.image,
                "cabin-images"
            );
            newCabin.image_url = publicUrl;
        }
        const { data, error } = await supabase
            .from("cabins")
            .insert(newCabin)
            .select();
        if (error) throw error;
        return data;
    } catch (error) {
        const newError = handleError(error);
        console.log({ newError });
        throw handleError(newError);
    }
};

export const removeCabin = async (id: number) => {
    try {
        const { data, error } = await supabase
            .from("cabins")
            .delete()
            .eq("id", id)
            .select();
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        throw handleError(error);
    }
};

export const uploadImageToBucket = async (
    file: string,
    bucketName: SupabaseBuckets
) => {
    try {
        const { name } = file as unknown as File;
        if (!name) {
            throw new Error("Invalid file. Failed to upload");
        }

        const fileName = `${Date.now()}-${name}`;

        const { error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file);
        if (error) throw error;
        const {
            data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(fileName);
        return { fileName, publicUrl };
    } catch (error) {
        throw handleError(error);
    }
};
