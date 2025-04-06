
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { format } from "date-fns";

const OrderStatusBadge = ({ status }: { status: string }) => {
  const getBadgeColor = () => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const History = () => {
  const navigate = useNavigate();
  const { orderHistory } = useCart();
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div className="sipscribe-container">
      <header className="w-full py-3 px-4 flex items-center justify-between bg-background border-b border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          className="touch-target" 
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Order History</h1>
        <div className="w-10" />
      </header>
      
      <main className="flex flex-col w-full pb-16 px-4 py-3">
        <h2 className="text-lg font-medium mb-3">Your Orders</h2>

        {orderHistory.length > 0 ? (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-card rounded-lg overflow-hidden">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Order {order.id.replace('order_', '#')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(order.date), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{order.totalCredits} Credits</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>

                {expandedOrders[order.id] && (
                  <div className="px-4 pb-4 pt-2 border-t border-border">
                    <h3 className="text-sm font-medium mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={`${order.id}-${idx}`} className="flex justify-between text-sm">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-8 w-8 object-cover rounded-md mr-2" 
                            />
                            <div>
                              <span>{item.name}</span>
                              <p className="text-xs text-muted-foreground">{item.vendorName}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span>{item.credits} × {item.quantity}</span>
                            <p className="text-xs text-muted-foreground">{item.credits * item.quantity} Credits</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total</span>
                      <span>{order.totalCredits} Credits</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 h-[40vh]">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-center text-muted-foreground mb-4">
              Your order history will appear here once you've made a purchase.
            </p>
            <Button onClick={() => navigate('/home')}>
              Browse Drinks
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
