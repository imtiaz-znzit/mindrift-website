import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[Contact API] Received inquiry submission:", {
      fullName: body?.fullName,
      workEmail: body?.workEmail,
      companyName: body?.companyName,
      projectType: body?.projectType,
    });

    // Server-side Zod validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      const issueDetails = validationResult.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      console.error("[Contact API Validation Issues]:", issueDetails);

      return NextResponse.json(
        {
          success: false,
          message: `Validation failed: ${issueDetails}`,
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const referenceId = `MDR-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Google Sheets Webhook Integration
    const sheetWebhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      "https://script.google.com/macros/s/AKfycbzjS77kDb203bprEzFsSc7xB96KKkxDoymBVZHxCuO1zdqbri3ihSUqksmyQyNpMxrucA/exec";

    let sheetSaved = false;

    if (sheetWebhookUrl) {
      try {
        const sheetPayload = {
          referenceId,
          fullName: data.fullName,
          workEmail: data.workEmail,
          companyName: data.companyName,
          projectType: data.projectType,
          estimatedBudget: data.estimatedBudget || "Not specified",
          projectTimeline: data.projectTimeline || "Not specified",
          projectDescription: data.projectDescription,
          submittedAt: new Date().toISOString(),
        };

        const sheetRes = await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(sheetPayload),
          redirect: "follow",
        });

        const sheetResponseText = await sheetRes.text();
        console.log(`[Google Sheets] Webhook response:`, sheetResponseText.slice(0, 300));
        sheetSaved = true;
      } catch (sheetErr) {
        console.error("[Google Sheets] Network error syncing sheet:", sheetErr);
      }
    }

    // 2. Email Notification (Resend / SMTP) if configured
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const destinationEmail = process.env.CONTACT_DESTINATION_EMAIL || "contact@mindriftagency.com";

    if (hasResend) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Mindrift Inquiries <inquiries@mindriftagency.com>",
            to: destinationEmail,
            subject: `[New Inquiry ${referenceId}] ${data.projectType} — ${data.companyName}`,
            text: `
New project inquiry received.

Reference ID: ${referenceId}
Full Name: ${data.fullName}
Work Email: ${data.workEmail}
Company: ${data.companyName}
Practice Area: ${data.projectType}
Budget: ${data.estimatedBudget || "Not specified"}
Timeline: ${data.projectTimeline || "Not specified"}

Project Description:
${data.projectDescription}
            `,
          }),
        });

        if (!emailRes.ok) {
          console.error("Resend delivery failed:", await emailRes.text());
        }
      } catch (emailErr) {
        console.error("Failed to connect to email provider:", emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: "Inquiry processed successfully.",
        sheetSaved,
        deliveryStatus: hasResend ? "dispatched" : "verified",
        destination: destinationEmail,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Contact API internal error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}
