import { z } from "zod";

const FieldTypeEnum = z.enum(["UUID", "TEXT", "PHONES", "EMAILS", "DATE_TIME", "DATE", "BOOLEAN", "NUMBER", "NUMERIC", "LINKS", "CURRENCY", "FULL_NAME", "RATING", "SELECT", "MULTI_SELECT", "RELATION", "POSITION", "ADDRESS", "RAW_JSON", "RICH_TEXT", "ACTOR", "ARRAY", "TS_VECTOR"]);

export const TwentyFieldMetadataSchema = z.object({
  id: z.string().uuid(),
  type: FieldTypeEnum,
  name: z.string(),
  label: z.string(),
  isCustom: z.boolean(),
  isActive: z.boolean(),
  isSystem: z.boolean(),
}).passthrough();

export const TwentyObjectSchema = z.object({
  id: z.string().uuid(),
  nameSingular: z.string(),
  namePlural: z.string(),
  labelSingular: z.string(),
  labelPlural: z.string(),
  icon: z.string(),
  isCustom: z.boolean(),
  isActive: z.boolean(),
  isSystem: z.boolean(),
  fields: z.array(TwentyFieldMetadataSchema),
}).passthrough();

export const TwentyDataObjectResponseSchema = z.object({
  data: z.object({
    objects: z.array(TwentyObjectSchema),
  }),
}).passthrough();

export type TwentyDataObject = z.infer<typeof TwentyObjectSchema>;
export type TwentyObjectField = z.infer<typeof TwentyFieldMetadataSchema>;
