import { NextRequest, NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
export const runtime = "nodejs";

function lerPdfBuffer(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    let textoBrutoCompleto = "";

    new PdfReader(null).parseBuffer(buffer, (err, item) => {
      if (err) {
        reject(err);
      } else if (!item) {
        resolve(textoBrutoCompleto);
      } else if (item && item.text) {
        textoBrutoCompleto += item.text + " ";
      }
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(bytes);
    const textoBruto = await lerPdfBuffer(pdfBuffer);
    console.log("--- INÍCIO DO TEXTO EXTRAÍDO DO PDF ---");
    console.log(textoBruto);
    console.log("--- FIM DO TEXTO EXTRAÍDO DO PDF ---");

    return NextResponse.json({
      message: "PDF lido com sucesso! (Texto bruto abaixo)",
      rawText: textoBruto,
    });
  } catch (error) {
    console.error("Erro ao processar upload:", error);
    return NextResponse.json(
      { error: "Erro ao processar arquivo", details: (error as Error).message },
      { status: 500 }
    );
  }
}
