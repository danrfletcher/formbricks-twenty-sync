import { z } from "zod";

const FieldTypeEnum = z.enum(["UUID", "TEXT", "PHONES", "EMAILS", "DATE_TIME", "DATE", "BOOLEAN", "NUMBER", "NUMERIC", "LINKS", "CURRENCY", "FULL_NAME", "RATING", "SELECT", "MULTI_SELECT", "RELATION", "POSITION", "ADDRESS", "RAW_JSON", "RICH_TEXT", "ACTOR", "ARRAY", "TS_VECTOR"]);

export const TwentyFieldMetadataSchema = z.object({
  id: z.string().uuid(),
  type: FieldTypeEnum,
  name: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  defaultValue: z.any(),
  isNullable: z.boolean(),
  settings: z.record(z.any()).optional(),
  options: z.array(z.record(z.any())).nullable(),
  isCustom: z.boolean(),
  isActive: z.boolean(),
  isSystem: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  fromRelationMetadata: z.record(z.any()).nullable(),
  toRelationMetadata: z.record(z.any()).nullable(),
});

export const TwentyObjectSchema = z.object({
  id: z.string().uuid(),
  dataSourceId: z.string().uuid(),
  nameSingular: z.string(),
  namePlural: z.string(),
  labelSingular: z.string(),
  labelPlural: z.string(),
  description: z.string(),
  icon: z.string(),
  isCustom: z.boolean(),
  isActive: z.boolean(),
  isSystem: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  labelIdentifierFieldMetadataId: z.string().uuid(),
  imageIdentifierFieldMetadataId: z.string().uuid().nullable(),
  fields: z.array(TwentyFieldMetadataSchema),
});

const TwentyObjectPageInfoSchema = z.object({
  hasNextPage: z.boolean(),
  startCursor: z.string(),
  endCursor: z.string(),
});

export const TwentyDataObjectResponse = z.object({
  data: z.object({
    objects: z.array(TwentyObjectSchema),
  }),
  pageInfo: TwentyObjectPageInfoSchema,
});

export type TwentyDataObject = z.infer<typeof TwentyObjectSchema>;
export type TwentyObjectField = z.infer<typeof TwentyFieldMetadataSchema>;

