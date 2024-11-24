import { findManyObjects } from "@/endpoints";
import { TwentyDataObject, TwentyDataObjectResponseSchema } from "@/schemas";
import axios from "axios";

export const getTwentyDataObjects = async () => {
  try {
    const twentyDataObjects = await axios.get(findManyObjects, {
      headers: {
        Authorization: `Bearer ${process.env.TWENTY_API_TOKEN}`,
      },
    });

    const validatedData = TwentyDataObjectResponseSchema.parse(twentyDataObjects.data);

    const nonSystemObjects = validatedData.data.objects
      .filter((object: TwentyDataObject) => !object.isSystem)
      .map((object: TwentyDataObject) => ({
        ...object,
        fields: object.fields.filter((field) => !field.isSystem),
      }));

    return nonSystemObjects;

  } catch (e) {
    console.error("Error:", e);
    throw e;
  }
};
