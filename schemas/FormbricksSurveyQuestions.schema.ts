import { z } from "zod";

const SurveySchema = z.object({
  name: z.string(),
  questions: z.array(z.record(z.any())),
}).passthrough();

export const FormbricksSurveyResponseSchema = z.object({
  data: SurveySchema,
});

export type FormbricksSurveyResponse = z.infer<typeof FormbricksSurveyResponseSchema>;
