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
      HomeRepository.getCategoryBooks("history"),
      HomeRepository.getCategoryBooks("science-fiction"),
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
      historyBooks,
      sciFiBooks,
      fictionBooks,
      nonFictionBooks,
      popularPublishers,
    };
  },
};