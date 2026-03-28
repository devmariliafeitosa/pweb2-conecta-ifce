import { getRecommendations } from "@/features/follow/services/follow.services"
import type { RecommendationsDTO } from "@/features/follow/types/dto/RecommendationsDTO"
import { useEffect, useState } from "react"

export function useRecommendations() {
  const [recommendations, setRecommendatoins] = useState<RecommendationsDTO | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)

      const responseData = await getRecommendations()
      setRecommendatoins(responseData)

      setIsLoading(false)
    }
  }, [])

  return {
    recommendations,
    isLoading
  }
}