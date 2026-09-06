import { ExternalLinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { MediaRecord } from "@/content/types"

type MediaConsentCardProps = {
  item: MediaRecord
}

function MediaConsentCard({ item }: MediaConsentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{item.title}</CardTitle>
        {item.captionSummary ? (
          <CardDescription>{item.captionSummary}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Üçüncü taraf Instagram içeriği gizlilik ve izin nedeniyle burada
          otomatik yüklenmez. Resmi gönderiye gidebilirsiniz.
        </p>
        <Button asChild variant="outline" size="sm">
          <a href={item.postUrl} target="_blank" rel="noopener noreferrer">
            Kaynağı aç
            <ExternalLinkIcon className="size-3.5" />
            <span className="sr-only">(dış bağlantı)</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

export { MediaConsentCard }
