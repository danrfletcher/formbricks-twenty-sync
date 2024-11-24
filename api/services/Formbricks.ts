import { getSurveyById } from "@/endpoints";
import { getAllResponsesById } from "@/endpoints/Formbricks";
import { FormbricksSurveyResponseSchema, FormbricksUserResponseSchema } from "@/schemas";
import axios from "axios";

export const getSurveyData = async (id: string) => {
  try {
    const surveyFieldData = await axios.get(getSurveyById(id), {
      headers: {
        "x-api-key": `${process.env.FORMBRICKS_API_TOKEN}`,
      },
    });
    
    const validatedData = FormbricksSurveyResponseSchema.parse(
      surveyFieldData.data
    );
    return validatedData.data;
  } catch (e) {
    console.error("Error:", e);
    throw e;
  }
};

export const getSurveyResponses = async (id: string) => {
  try {
    const surveyResponses = await axios.get(getAllResponsesById(id), {
      headers: {
        "x-api-key": `${process.env.FORMBRICKS_API_TOKEN}`,
      },
    });
    
    const validatedSurveyResponses = FormbricksUserResponseSchema.parse(surveyResponses);

    //const validatedData = FormbricksSurveyResponseSchema.parse(surveyFieldData.data);
    //return validatedData.data;
  } catch (e) {
    console.error("Error:", e);
    throw e;
  }
};