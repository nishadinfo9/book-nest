import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RevenueCard = ({item}: {item: any}) => {
  return (
    <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>

              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{item.amount}</div>

              <p className="text-xs text-muted-foreground">
                {item.percentage}
              </p>
            </CardContent>
          </Card>
  )
}

export default RevenueCard