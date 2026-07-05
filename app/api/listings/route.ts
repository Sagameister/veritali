import { NextResponse } from "next/server";
import { getListings } from "../../../lib/listings";

export async function GET() {
  try {
    const listings = await getListings();
    return NextResponse.json(listings);
  } catch (error) {
    console.error("Failed to fetch listings in API route:", error);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}
