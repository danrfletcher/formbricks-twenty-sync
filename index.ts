import axios from "axios";
import dotenv from "dotenv";
import {
  getSurveyData,
  getTwentyDataObjects,
  getSurveyResponses,
} from "@/services";
import { FormbricksQuestion, FormbricksSubquestion } from "@/schemas";

dotenv.config();

interface FormbricksField {
  fieldName: string;
  type: string;
  id: string;
}

/**
 * @description gets all available formbricks fields from the specified form
 * @returns an object containing the formbricks fields available on the form to match with twenty CRM properties
 * @author danrfletcher
 * @param {string} formbricksSurveyId
 */
const getAvailableFormbricksQuestionFields = async (formbricksSurveyId: string) => {
  try {
    const surveyData = await getSurveyData(formbricksSurveyId);

    const fieldDisplayNames: Record<string, string> = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      zip: "ZIP Code",
      city: "City",
      country: "Country",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      state: "State",
    };

    const transformQuestions = (
      questions: FormbricksQuestion[]
    ): FormbricksQuestion[] => {
      return questions
        .filter(
          (question) =>
            question.type === "contactInfo" || question.type === "address"
        )
        .flatMap((question) => {
          // Filter out hidden subquestions
          Object.keys(question).forEach((key) => {
            const value = question[key as keyof FormbricksQuestion];
            if (isSubQuestionfield(value) && value.show === false) {
              delete question[key as keyof FormbricksQuestion];
            }
          });

          // Get all visible subquestion keys
          const visibleKeys = Object.keys(question).filter((key) =>
            isSubQuestionfield(question[key as keyof FormbricksQuestion])
          );

          // Handle name fields specially
          const hasFirstName = visibleKeys.includes("firstName");
          const hasLastName = visibleKeys.includes("lastName");

          if (hasFirstName || hasLastName) {
            // Remove firstName and lastName from visible keys
            const otherKeys = visibleKeys.filter(
              (key) => key !== "firstName" && key !== "lastName"
            );

            // Add combined name field
            return [
              {
                ...question,
                subType: "name",
                headline: {
                  default: `${question.headline.default} > Name`,
                },
              },
              // Map remaining fields normally
              ...otherKeys.map((key) => ({
                ...question,
                subType: key,
                headline: {
                  default: `${question.headline.default} > ${
                    fieldDisplayNames[key] || key
                  }`,
                },
              })),
            ];
          }

          // Handle non-name fields normally
          return visibleKeys.map((key) => ({
            ...question,
            subType: key,
            headline: {
              default: `${question.headline.default} > ${
                fieldDisplayNames[key] || key
              }`,
            },
          }));
        });
    };

    const subQuestions = transformQuestions(surveyData.questions).map(
      (question) => ({
        fieldName: question.headline.default,
        type: question.type,
        id: `${question.id}_${question.subType}`,
      })
    );

    function isSubQuestionfield(
      value: unknown
    ): value is FormbricksSubquestion {
      return (
        typeof value === "object" &&
        value !== null &&
        "show" in value &&
        "required" in value
      );
    }

    const otherQuestions = surveyData.questions
      .filter(
        (question) =>
          question.type !== "contactInfo" && question.type !== "address"
      )
      .map((question) => ({
        fieldName: question.headline.default,
        type: question.type,
        id: question.id,
      }));

    return [
      ...subQuestions,
      ...otherQuestions,
      {
        fieldName: "Created At",
        type: "date",
        id: "createdAt",
      },
      {
        fieldName: "Source",
        type: "openText",
        id: "source"
      },
    ];
  } catch (e) {
    console.error("Error getting available fields from Formbricks", e);
    throw e;
  }
};

/**
 * @description gets all available form fields from twenty CRM
 * @returns an object with 2 properties containing available formbricks fields for the specified form & the available data fields in twenty CRM
 * @author danrfletcher
 * @param {string} formbricksSurveyId
 */
const getTwentyDataObjectsAndFields = async () => {
  try {
    const twentyDataObjectsAndFields = await getTwentyDataObjects();

    const twentyDataObjects = twentyDataObjectsAndFields.map((obj) => ({
      dataObjectName: obj.labelPlural,
      id: obj.id,
    }));

    const twentyFields = twentyDataObjectsAndFields.flatMap((dataObject) =>
      dataObject.fields.map((field) => ({
        fieldName: `${dataObject.labelPlural} > ${field.label}`,
        dataObject: dataObject.id,
        type: field.type,
        id: field.id,
      }))
    );

    return { twentyDataObjects, twentyFields };
  } catch (e) {
    console.error("Error getting data objects & fields from Twenty", e);
    throw e;
  }
};

/**
 * @description gets all survey response data from formbricks to sync
 * @returns an object containing survey response data from formbricks
 * @author danrfletcher
 * @param {string} formbricksSurveyId
 */
const getFormbricksData = async (formbricksSurveyId: string) => {
  try {
    const responses = await getSurveyResponses(formbricksSurveyId);
    
   
  } catch (e) {
    console.error("Error retrieving survey data from Formbricks: ", e);
    throw e;
  }
};

const doFieldModifications = async (formbnricksFields: FormbricksField[]) => {};

const logFields = async () => {
  try {
    const fields = await getFormbricksData("cm3vvhxf50002opqh0ijks21n");
    console.log(fields);
  } catch (error) {
    console.error("Error:", error);
  }
};

logFields();
