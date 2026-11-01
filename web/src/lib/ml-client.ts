import "server-only";

import { z } from "zod";

export interface ScoreRequest {
  question: string;
  reference_answer: string;
  max_score: number;
  answers: Array<{
    id: string;
    text: string;
  }>;
}

export interface ScoreResult {
  id: string;
  suggested_score: number;
  confidence: number;
  needs_review: boolean;
}

export interface ScoreResponse {
  model_version: string;
  results: ScoreResult[];
}

const scoreResponseSchema: z.ZodType<ScoreResponse> = z.object({
  model_version: z.string().min(1),
  results: z.array(
    z.object({
      id: z.string(),
      suggested_score: z.number().finite(),
      confidence: z.number().min(0).max(1),
      needs_review: z.boolean(),
    }),
  ),
});

export async function scoreAnswers(
  request: ScoreRequest,
): Promise<ScoreResponse> {
  const serviceUrl = process.env.ML_SERVICE_URL;
  if (!serviceUrl) {
    throw new Error("ML_SERVICE_URL is required to call the scoring service.");
  }

  const endpoint = new URL("/score", serviceUrl);
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`ML scoring service returned HTTP ${response.status}.`);
  }

  const responseBody: unknown = await response.json();
  const parsedResponse = scoreResponseSchema.safeParse(responseBody);

  if (!parsedResponse.success) {
    throw new Error(
      `ML scoring service returned an invalid response: ${parsedResponse.error.message}`,
    );
  }

  return parsedResponse.data;
}
