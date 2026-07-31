import { HomeService } from "@/services/home.service";

export async function GET() {
    const data = await HomeService.getHomePage();

    console.log('data', data)

    return Response.json({
        success: true,
        data,
    });
}