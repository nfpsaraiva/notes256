import { Stack, Text, Title } from "@mantine/core";
import { FC } from "react";

interface MainTitleProps {
  title: string,
  subtitle?: string
}

const MainTitle: FC<MainTitleProps> = ({ title, subtitle }: MainTitleProps) => {
  return (
    <Stack gap={2}>
      <Title>{title}</Title>
      <Text c={"dimmed"}>{subtitle}</Text>
    </Stack>
  )
}

export default MainTitle;