"use server"

export type ApplicationPayload = {
  fullName: string
  email: string
  phone: string
  program: string
  experience: string
  message?: string
  privacy: boolean
  company?: string
}

export async function submitApplicationAction(
  data: ApplicationPayload
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  if (data.company) {
    return { ok: false, message: "Gönderim reddedildi." }
  }

  if (!data.privacy) {
    return { ok: false, message: "Gizlilik onayı gerekli." }
  }

  const endpoint = process.env.APPLICATION_WEBHOOK_URL

  if (!endpoint) {
    return {
      ok: false,
      message:
        "Başvuru altyapısı henüz yapılandırılmadı. Lütfen info@atlasperformans.com veya WhatsApp üzerinden iletişime geçin.",
    }
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        company: undefined,
        receivedAt: new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      return {
        ok: false,
        message:
          "Gönderim başarısız. Lütfen e-posta veya WhatsApp ile tekrar deneyin.",
      }
    }

    return {
      ok: true,
      message: "Başvurunuz iletildi. En kısa sürede dönüş yapılacak.",
    }
  } catch {
    return {
      ok: false,
      message:
        "Bağlantı hatası. Lütfen info@atlasperformans.com adresine yazın.",
    }
  }
}
