"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { submitApplicationAction } from "@/app/akademi/basvuru/actions"

const schema = z.object({
  fullName: z.string().min(2, "Ad soyad gerekli"),
  email: z.string().email("Geçerli e-posta girin"),
  phone: z.string().min(10, "Telefon gerekli"),
  program: z.string().min(1, "Program seçin"),
  experience: z.string().min(1, "Deneyim seçin"),
  message: z.string().max(1000).optional(),
  privacy: z.boolean().refine((v) => v === true, "Onay gerekli"),
  company: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof schema>

type ApplicationFormProps = {
  programOptions: Array<{ value: string; label: string }>
  initialProgram?: string
}

function ApplicationForm({ programOptions, initialProgram }: ApplicationFormProps) {
  const [result, setResult] = useState<
    | { ok: true; message: string }
    | { ok: false; message: string }
    | null
  >(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      program: initialProgram ?? "",
      experience: "",
      message: "",
      privacy: false,
      company: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setResult(null)
    const res = await submitApplicationAction(values)
    setResult(res)
    if (res.ok) form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
          {...form.register("company")}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ad soyad</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İlgilendiğiniz program</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deneyim seviyesi</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seçin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Başlangıç</SelectItem>
                  <SelectItem value="intermediate">Orta</SelectItem>
                  <SelectItem value="advanced">İleri</SelectItem>
                  <SelectItem value="other">Belirtmek istemiyorum</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kısa mesaj</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel className="font-normal">
                  Gizlilik metnini okudum; başvurumun değerlendirilmesi için
                  iletişim bilgilerimin işlenmesini kabul ediyorum.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Gönderiliyor…" : "Başvuruyu gönder"}
        </Button>

        {result ? (
          <p
            role="status"
            className={
              result.ok ? "text-sm text-foreground" : "text-sm text-destructive"
            }
          >
            {result.message}
          </p>
        ) : null}
      </form>
    </Form>
  )
}

export { ApplicationForm }
