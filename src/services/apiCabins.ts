import {
    checkIsTableCabin,
    createSupabaseCabinFromCabin,
    handleError,
} from "@/utils/helpers";
import supabase from "./supabaseClient";
import { Cabin } from "@/types/interfaces";
import { BucketNames, bucketNames, supabaseTables } from "@/types/constants";
import { Tables } from "./supabaseTypes";

export const getCabins = async () => {
    try {
        const { data: cabins, error } = await supabase
            .from(supabaseTables.cabins)
            .select("*");
        if (!cabins || error) {
            throw error;
        }
        return cabins;
    } catch (error) {
        throw handleError(error);
    }
};

export const deleteCabinImage = async (cabin: Cabin | Tables<"cabins">) => {
    try {
        const bucketName = bucketNames.cabinImages;
        const fileUrl = new URL(
            checkIsTableCabin(cabin) ? cabin.image_url || "" : cabin.imageUrl
        );
        const filePath = fileUrl.pathname.replace(
            `/storage/v1/object/public/${bucketName}/`,
            ""
        );
        if (!filePath) {
            throw new Error("Invalid image path. Failed to delete cabin image");
        }
        const { error } = await supabase.storage
            .from(bucketName)
            .remove([filePath]);
        if (error) {
            throw error;
        }
    } catch (error) {
        throw handleError(error);
    }
};

export const createOrUpdateCabin = async (cabin: Cabin, id?: number) => {
    const newCabin = createSupabaseCabinFromCabin(cabin);
    const bucketName = bucketNames.cabinImages;
    const query = supabase.from(supabaseTables.cabins);
    // newCabin gets old imageUrl in case of updating a cabin
    // and if cabin object has image prop we upload it to supabase
    console.log({ newCabin });
    // return;
    try {
        // if we have cabin image -> we're either updating
        // existing cabin or we're creating new cabin
        if (cabin?.image) {
            // if id exists -> updating an image
            if (id) {
                // 1. removing old image
                deleteCabinImage(cabin);
            }
            // 2. uploading the image to the bucket
            const { publicUrl } = await uploadImageToBucket(
                cabin.image,
                bucketName
            );
            newCabin.image_url = publicUrl;
        }
        // now dealing with other data
        // if id exists -> updating cabin
        if (id) {
            const { data, error } = await query
                .update({ ...newCabin, id })
                .eq("id", id)
                .select()
                .single();
            if (error) {
                throw error;
            }
            return data;
        } else {
            // creating new cabin
            const { data, error } = await query
                .insert(newCabin)
                .select()
                .single();
            if (error) throw error;
            return data;
        }
    } catch (error) {
        const newError = handleError(error);
        console.log({ newError });
        throw handleError(newError);
    }
};

export const removeCabin = async (cabin: Tables<"cabins">) => {
    try {
        // 1. removing cabin image from cabin-images storage bucket
        deleteCabinImage(cabin);

        // 2. removing cabin entry from cabins table
        const { data, error } = await supabase
            .from(supabaseTables.cabins)
            .delete()
            .eq("id", cabin.id)
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
    file: File,
    bucketName: BucketNames
) => {
    try {
        const { name } = file;
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
