import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderResponse } from '@/types/order.type'

const RecentOrdersComp = ({order}: {order: OrderResponse}) => {
  return (
     <TableRow >
                    <TableCell className="font-medium">
                      #{order.id.slice(0, 8)}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          order.paymentStatus === "PAID"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      ৳{order.amount}
                    </TableCell>
                  </TableRow>
  )
}

export default RecentOrdersComp