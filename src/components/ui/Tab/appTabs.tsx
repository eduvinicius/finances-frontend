import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Tabs } from "./tabs"
import { TabsList } from "./tabsList"
import { TabsTrigger } from "./tabsTrigger"
import { TabsContent } from "./tabsContent"
import type { tabsListVariants } from "."

export interface TabItem {
  readonly value: string
  readonly label: React.ReactNode
  readonly content: React.ReactNode
  readonly disabled?: boolean
}

export interface AppTabsProps
  extends Omit<React.ComponentProps<typeof Tabs>, "children">,
    VariantProps<typeof tabsListVariants> {
  readonly tabs: TabItem[]
  readonly listClassName?: string
  readonly triggerClassName?: string
  readonly contentClassName?: string
}

function AppTabs({
  tabs,
  defaultValue,
  variant,
  listClassName,
  triggerClassName,
  contentClassName,
  ...props
}: AppTabsProps) {
  return (
    <Tabs defaultValue={defaultValue ?? tabs[0]?.value} {...props}>
      <TabsList variant={variant} className={listClassName}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={triggerClassName}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className={contentClassName}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export { AppTabs }
