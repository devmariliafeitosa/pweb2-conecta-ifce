import type { RecommendationsDTO } from "@/features/follow/types/dto/RecommendationsDTO";
import { http } from "@/infra/http/http-client";

export async function getRecommendations(): Promise<RecommendationsDTO> {
  const responseData = await http.get<RecommendationsDTO>("follow/recommendations")
  return responseData
}