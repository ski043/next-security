import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import arcjet, { detectBot, fixedWindow } from "@/app/utils/arcjet";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
    allow: ["CATEGORY:SEARCH_ENGINE", "CURL"],
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      fixedWindow({
        mode: "LIVE",
        max: 10,
        window: "60s",
      })
    );
  } else {
    return aj.withRule(
      fixedWindow({
        mode: "LIVE",
        max: 2,
        window: "60s",
      })
    );
  }
}

export async function GET(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const desicion = await getClient(!!user).protect(req);

  if (desicion.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: desicion.reason },
      { status: 429 }
    );
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // set font
  pdf.setFont("helvetica");

  //set header
  pdf.setFontSize(24);
  pdf.text("Test Invoice", 20, 20);

  // From Section
  pdf.setFontSize(12);
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text(["Test Name", "test@test.com", "Test Address"], 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text(["Test Name", "test@test.com", "Test Address"], 20, 75);

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(`Invoice Number: #123456`, 120, 40);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date())}`,
    120,
    45
  );
  pdf.text(`Due Date: Net ${new Date().toISOString()}`, 120, 50);

  // Item table header
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 20, 100);
  pdf.text("Quantity", 100, 100);
  pdf.text("Rate", 130, 100);
  pdf.text("Total", 160, 100);

  // draw header line
  pdf.line(20, 102, 190, 102);

  // Item Details
  pdf.setFont("helvetica", "normal");
  pdf.text("Test Item", 20, 110);
  pdf.text("1", 100, 110);
  pdf.text("100", 130, 110);
  pdf.text("100", 160, 110);

  // Total Section
  pdf.line(20, 115, 190, 115);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Total (USD)`, 130, 130);
  pdf.text("100", 160, 130);

  //Additional Note
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text("Note:", 20, 150);
  pdf.text("Test Note", 20, 155);

  // generate pdf as buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  //return pdf as download

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
