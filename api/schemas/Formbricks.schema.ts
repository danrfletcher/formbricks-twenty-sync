import { z } from "zod";

const SubfieldSchema = z.object({
  show: z.boolean(),
  required: z.boolean(),
});

const QuestionSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    email: SubfieldSchema.optional(),
    phone: SubfieldSchema.optional(),
    firstName: SubfieldSchema.optional(),
    lastName: SubfieldSchema.optional(),
    company: SubfieldSchema.optional(),
    zip: SubfieldSchema.optional(),
    city: SubfieldSchema.optional(),
    country: SubfieldSchema.optional(),
    addressLine1: SubfieldSchema.optional(),
    addressLine2: SubfieldSchema.optional(),
    headline: z
      .object({
        default: z.string(),
      })
      .passthrough(),
    required: z.boolean(),
  })
  .passthrough();

const SurveySchema = z
  .object({
    name: z.string(),
    questions: z.array(QuestionSchema),
  })
  .passthrough();

export const FormbricksSurveyResponseSchema = z.object({
  data: SurveySchema,
});

export type FormbricksSurveyResponse = z.infer<
  typeof FormbricksSurveyResponseSchema
>;
export type FormbricksQuestion = z.infer<typeof QuestionSchema>;
export type FormbricksSubquestion = z.infer<typeof SubfieldSchema>;

export const FormbricksUserResponseSchema = z.object({
  data: z
    .object({
      id: z.string().optional(),
      createdAt: z.string().optional(),
      data: z.any(),
      meta: z.object({
        source: z.string()
      }).passthrough().optional(),
    })
    .passthrough(),
});
