import { AppShell } from "@/components/Layout";
import { Stack, Text, Title } from "@mantine/core";
import { FC, ReactNode } from "react";

interface PageShellProps {
  title: string,
  subtitle?: string,
  children: ReactNode
}

const PageShell: FC<PageShellProps> = ({title, subtitle, children}: PageShellProps) => {
  return (
    <AppShell userMenu={<></>}>
      <Stack>
        <Stack gap={2}>
          <Title order={2} size={"h1"}>{title}</Title>
          {
            subtitle && <Text c={"dimmed"}>{subtitle}</Text>
          }
        </Stack>
        {children}
      </Stack>
    </AppShell>
  )
}

export default PageShell;