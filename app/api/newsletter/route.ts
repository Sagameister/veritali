import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    // Fallback: If credentials are not set in the environment yet, return mock success
    // so the frontend doesn't crash, but warn in the server logs.
    if (!apiKey || !audienceId) {
      console.warn("Mailchimp API Key or Audience ID is not configured. Simulating subscription.");
      return NextResponse.json({ message: "Mock success (Mailchimp variables missing)" });
    }

    // Mailchimp data center is the suffix of the API key (e.g. 123456789-us21 -> us21)
    const dc = apiKey.split("-")[1] || "us1";
    const url = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed", // adds them directly to the list
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // If the email is already subscribed, Mailchimp returns a 400.
      // We treat this as a success for the subscriber to maintain a smooth experience.
      if (data.title === "Member Exists") {
        return NextResponse.json({ message: "Already subscribed" });
      }
      throw new Error(data.detail || "Failed to subscribe to Mailchimp");
    }

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (error: any) {
    console.error("Mailchimp subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
