import axios from "axios";
import dotenv from "dotenv";
import { FormbricksSurveyResponseSchema, TwentyDataObject, TwentyDataObjectResponseSchema } from "@/schemas";

dotenv.config();

const setupFormbricksSyncProperties = async () => {
  //get the API token for formbricks

  //get the form credentials to sync
  try {
    const surveyFieldData = await axios.get("https://app.formbricks.com/api/v1/management/surveys/cm2hsaizj0000zu9nzzvic778", {
      headers: {
        "x-api-key": `${process.env.FORMBRICKS_API_TOKEN}`,
      },
    });

    FormbricksSurveyResponseSchema.parse(surveyFieldData.data);

  } catch (e) {
    console.error("Error:", e);
    throw e;
  }

  //get the data object models from twenty
  try {
    const twentyDataObjects = await axios.get("https://twenty.stalotto.com/rest/metadata/objects", {
      headers: {
        Authorization: `Bearer ${process.env.TWENTY_API_TOKEN}`,
      },
    });

    TwentyDataObjectResponseSchema.parse(twentyDataObjects.data);

    const nonSystemObjects = twentyDataObjects.data.data.objects
      .filter((object: TwentyDataObject) => !object.isSystem)
      .map((object: TwentyDataObject) => ({
        ...object,
        fields: object.fields.filter((field) => !field.isSystem),
      }));
  } catch (e) {
    console.error("Error:", e);
    throw e;
  }

  //for each form, map the form properties to the twenty properties
};

const syncFormbricksToTwenty = async () => {
  try {
    //get all form entries from formbricks
    const formbricksResponses = await axios.get("https://app.formbricks.com/api/v1/management/responses?surveyId=cm2hsaizj0000zu9nzzvic778&limit=1000", {
      headers: {
        "x-api-key": `${process.env.FORMBRICKS_API_TOKEN}`,
      },
    });

    //format responses for twenty

    //check for duplicates

    //send responses to twenty
  } catch (e) {
    console.error("Error:", e);
    throw e;
  }
};

//syncFormbricksToTwenty();

setupFormbricksSyncProperties();
