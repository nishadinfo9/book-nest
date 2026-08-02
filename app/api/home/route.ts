import { HomeService } from "@/services/home.service";

export async function GET() {
    const data = await HomeService.getHomePage();
    return Response.json(data);
}