export const getSurveyById = (id: string) => `https://app.formbricks.com/api/v1/management/surveys/${id}`;
export const getAllResponsesById = (id: string) =>
  `https://app.formbricks.com/api/v1/management/responses?surveyId=${id}&limit=9999999999`;