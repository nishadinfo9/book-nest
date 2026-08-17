import { getDashboardData } from "@/services/dashboard.service";

export async function GET() {
  try {
    const dashboard = await getDashboardData();

    return Response.json(dashboard, {status: 200});
    
  } catch (error) {
    console.error("Dashboard API error:", error);
    return Response.json({ success: false, message: "Failed to load dashboard" },
      { status: 500 });
  }
}