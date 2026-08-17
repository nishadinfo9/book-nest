import { Badge } from '@/components/ui/badge'
import { OrderResponse } from '@/types/order.type'

const LowCostComp = ({book}: {book: OrderResponse}) => {
  return (
    <div
               
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{book.title}</p>

                    <p className="text-sm text-muted-foreground">
                      Remaining Stock
                    </p>
                  </div>

                  <Badge variant="destructive">
                    {book.stock}
                  </Badge>
                </div>
  )
}

export default LowCostComp