import { HomeRepository } from "@/repositories/home.repository";

export const HomeService = {
  async getHomePage() {
    const [
      bestSeller,
      newArrival,
      englishBooks,
      pupularAuthor,
      selfImprovement,
      academicBooks,
      autoBiogrephy,
      historyBooks,
      sciFiBooks,
      fictionBooks,
      nonFictionBooks,
      popularPublishers,
    ] = await Promise.all([
      HomeRepository.getBestSeller(),
      HomeRepository.getNewArrival(),
      HomeRepository.getEnglishBooks(),
      HomeRepository.getPupularAuthor(),
      HomeRepository.getCategoryBooks("self-improvement"),
      HomeRepository.getCategoryBooks("academic"),
      HomeRepository.getCategoryBooks("biography"),
      HomeRepository.getCategoryBooks("history"),
      HomeRepository.getCategoryBooks("sci-fi"),
      HomeRepository.getCategoryBooks("fiction"),
      HomeRepository.getCategoryBooks("non-fiction"),
      HomeRepository.getPopularPublishers(),
    ]);

    return {
      bestSeller,
      newArrival,
      englishBooks,
      pupularAuthor,
      selfImprovement,
      academicBooks,
      autoBiogrephy,
      historyBooks,
      sciFiBooks,
      fictionBooks,
      nonFictionBooks,
      popularPublishers,
    };
  },
};