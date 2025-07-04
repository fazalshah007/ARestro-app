import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Subscriptions",
    value: "+2350",
    change: "+180.1% from last month",
    icon: Users,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201 since last hour",
    icon: TrendingUp,
  },
]

const StatsCards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default StatsCards;