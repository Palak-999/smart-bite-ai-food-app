'use client'

import { useMemo } from 'react'
import { Download, FileText, Flame, List, Zap } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'

function getCsvContent(items: { name: string; quantity: number; calories: number; price: number }[]) {
  const header = ['Food item', 'Quantity', 'Calories per item', 'Total calories', 'Price']
  const rows = items.map((item) => [
    item.name,
    item.quantity.toString(),
    item.calories.toString(),
    (item.quantity * item.calories).toString(),
    `$${item.price.toFixed(2)}`,
  ])
  return [header, ...rows].map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n')
}

export function ExcelCalorieReport() {
  const { items } = useCart()

  const reportItems = useMemo(
    () =>
      items.map((item) => ({
        name: item.food.name,
        quantity: item.quantity,
        calories: item.food.nutrition.calories,
        price: item.food.price,
      })),
    [items],
  )

  const totalCalories = useMemo(
    () => reportItems.reduce((sum, item) => sum + item.calories * item.quantity, 0),
    [reportItems],
  )

  const totalPrice = useMemo(
    () => reportItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [reportItems],
  )

  const handleDownload = () => {
    const csv = getCsvContent(reportItems)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'smartbite-calorie-report.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        title="Excel Calorie Report"
        subtitle="Download a calorie summary report for the items in your cart."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 text-foreground">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Generate report
              </p>
              <h2 className="mt-2 text-2xl font-bold">Save your calorie details</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4 rounded-3xl border border-border bg-background p-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Zap className="size-4 text-primary" />
              <span>{items.length} selected item{items.length === 1 ? '' : 's'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Flame className="size-4 text-amber-500" />
              <span>{totalCalories.toLocaleString()} kcal total</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <List className="size-4 text-sky-500" />
              <span>${totalPrice.toFixed(2)} estimated order value</span>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            size="lg"
            className="mt-6 w-full rounded-full"
            disabled={items.length === 0}
          >
            <Download className="mr-2 size-4" />
            Download CSV
          </Button>

          {items.length === 0 && (
            <p className="mt-4 rounded-2xl border border-dashed border-border bg-muted px-4 py-4 text-sm text-muted-foreground">
              Add items to your cart to generate a calorie report.
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            What’s included
          </p>
          <ul className="mt-4 space-y-3 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 p-2 text-primary">
                1
              </span>
              Item name, quantity, calories, and price
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 p-2 text-primary">
                2
              </span>
              Total calories per item and overall total
            </li>
            <li className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 p-2 text-primary">
                3
              </span>
              CSV download ready for Excel or Google Sheets
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
