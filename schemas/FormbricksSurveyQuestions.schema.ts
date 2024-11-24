import { z } from "zod";

const LocalizedStringSchema = z.object({
  default: z.string(),
});

const WelcomeCardSchema = z.object({
  html: z.object({
    default: z.string(),
  }),
  enabled: z.boolean(),
  fileUrl: z.string(),
  headline: LocalizedStringSchema,
  timeToFinish: z.boolean(),
  showResponseCount: z.boolean(),
});

const BaseQuestionSchema = z.object({
  id: z.string(),
  type: z.string(),
  headline: LocalizedStringSchema,
  required: z.boolean(),
});

const OpenTextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("openText"),
  inputType: z.string(),
  subheader: LocalizedStringSchema,
  placeholder: LocalizedStringSchema,
});

const ChoiceSchema = z.object({
  id: z.string(),
  label: LocalizedStringSchema,
});

const MultipleChoiceMultiQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal("multipleChoiceMulti"),
  choices: z.array(ChoiceSchema),
  shuffleOption: z.string(),
});

const QuestionSchema = z.discriminatedUnion("type", [OpenTextQuestionSchema, MultipleChoiceMultiQuestionSchema]);

const EndingSchema = z.object({
  id: z.string(),
  type: z.string(),
  headline: LocalizedStringSchema,
  subheader: LocalizedStringSchema,
  buttonLink: z.string(),
  buttonLabel: LocalizedStringSchema,
});

const HiddenFieldsSchema = z.object({
  enabled: z.boolean(),
  fieldIds: z.array(z.string()),
});

const SingleUseSchema = z.object({
  enabled: z.boolean(),
  isEncrypted: z.boolean(),
});

const SurveySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  type: z.string(),
  environmentId: z.string(),
  createdBy: z.string(),
  status: z.string(),
  welcomeCard: WelcomeCardSchema,
  questions: z.array(QuestionSchema),
  endings: z.array(EndingSchema),
  hiddenFields: HiddenFieldsSchema,
  displayOption: z.string(),
  recontactDays: z.null(),
  displayLimit: z.null(),
  autoClose: z.null(),
  runOnDate: z.null(),
  closeOnDate: z.null(),
  delay: z.number(),
  displayPercentage: z.null(),
  autoComplete: z.null(),
  isVerifyEmailEnabled: z.boolean(),
  redirectUrl: z.null(),
  productOverwrites: z.null(),
  styling: z.null(),
  surveyClosedMessage: z.null(),
  singleUse: SingleUseSchema,
  pin: z.null(),
  resultShareKey: z.null(),
  showLanguageSwitch: z.null(),
  languages: z.array(z.string()),
  triggers: z.array(z.string()),
  segment: z.null(),
});

export const FormbricksSurveyResponseSchema = z.object({
  data: SurveySchema,
});

// Type inference
export type FormbricksSurveyResponse = z.infer<typeof FormbricksSurveyResponseSchema>;
