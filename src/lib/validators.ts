import { z } from "zod";

// ─── Auth Schemas ────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "USER"]).optional().default("USER"),
});

// ─── Translation Schemas ─────────────────────────────────────────────────────

export const PlatformTranslationSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
});

export const CategoryTranslationSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().min(1).max(50),
  domain: z.string().max(50).optional(),
});

export const CountryTranslationSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().min(1).max(100),
});

export const ManufacturerTranslationSchema = z.object({
  locale: z.enum(["en", "ar"]),
  name: z.string().min(1).max(150),
  specialization: z.string().max(100).optional(),
});

export const BlogTranslationSchema = z.object({
  locale: z.enum(["en", "ar"]),
  title: z.string().min(1).max(255),
  summary: z.string().optional(),
  content: z.string().min(1),
});

// ─── Entity Schemas ──────────────────────────────────────────────────────────

export const CreatePlatformSchema = z.object({
  unitCostUsd: z.number().positive().optional().nullable(),
  operationalStatus: z.string().max(50).optional().nullable(),
  technicalSpecs: z.record(z.unknown()).optional().nullable(),
  imageUrl: z.string().url().max(512).optional().nullable(),
  categoryId: z.string().uuid(),
  manufacturerId: z.string().uuid(),
  countryId: z.string().uuid(),
  translations: z.array(PlatformTranslationSchema).min(1).max(2),
});

export const UpdatePlatformSchema = CreatePlatformSchema.partial();

export const CreateCategorySchema = z.object({
  translations: z.array(CategoryTranslationSchema).min(1).max(2),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const CreateCountrySchema = z.object({
  translations: z.array(CountryTranslationSchema).min(1).max(2),
});

export const UpdateCountrySchema = CreateCountrySchema.partial();

export const CreateManufacturerSchema = z.object({
  countryId: z.string().uuid(),
  translations: z.array(ManufacturerTranslationSchema).min(1).max(2),
});

export const UpdateManufacturerSchema = CreateManufacturerSchema.partial();

export const CreateBlogSchema = z.object({
  translations: z.array(BlogTranslationSchema).min(1).max(2),
});

export const UpdateBlogSchema = CreateBlogSchema.partial();

export const CreateBlogTranslationSchema = z.object({
  locale: z.enum(["en", "ar"]),
  title: z.string().min(1).max(255),
  summary: z.string().optional(),
  content: z.string().min(1),
});

export const UpdateBlogTranslationSchema = CreateBlogTranslationSchema.partial();

// ─── Inferred Types ──────────────────────────────────────────────────────────

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreatePlatformInput = z.infer<typeof CreatePlatformSchema>;
export type UpdatePlatformInput = z.infer<typeof UpdatePlatformSchema>;
export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type CreateCountryInput = z.infer<typeof CreateCountrySchema>;
export type UpdateCountryInput = z.infer<typeof UpdateCountrySchema>;
export type CreateManufacturerInput = z.infer<typeof CreateManufacturerSchema>;
export type UpdateManufacturerInput = z.infer<typeof UpdateManufacturerSchema>;
export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>;
export type CreateBlogTranslationInput = z.infer<typeof CreateBlogTranslationSchema>;
export type UpdateBlogTranslationInput = z.infer<typeof UpdateBlogTranslationSchema>;
