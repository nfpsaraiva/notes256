import { Card } from "@mantine/core";
import { FC, ReactNode } from "react";

interface WidgetProps {
  children: ReactNode
}

const Widget: FC<WidgetProps> = ({children}: WidgetProps) => {
  return (
    <Card radius={"lg"} shadow="xs" withBorder>
      {children}
    </Card>
  )
}

export default Widget;