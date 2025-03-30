
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { subscriptionPlans, user } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState(
    subscriptionPlans.find(plan => 
      plan.name === user.subscriptionTier
    )?.id || subscriptionPlans[0].id
  );
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Subscription Updated",
        description: "Your subscription has been successfully updated.",
      });
      navigate("/profile");
    }, 1000);
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
        <h1 className="text-lg font-semibold">Subscription</h1>
        <div className="w-10" />
      </header>
      
      <main className="flex flex-col w-full pb-16 px-4">
        <div className="py-6">
          <h2 className="text-2xl font-bold">Choose Your Plan</h2>
          <p className="text-muted-foreground mt-1">Subscribe to get drinks from your favorite vendors</p>
        </div>
        
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
          {subscriptionPlans.map((plan) => {
            const isCurrentPlan = plan.name === user.subscriptionTier;
            
            return (
              <div
                key={plan.id}
                className={cn(
                  "border rounded-lg overflow-hidden",
                  selectedPlan === plan.id ? "border-primary" : "border-border"
                )}
              >
                <div className="flex items-start p-4">
                  <RadioGroupItem
                    value={plan.id}
                    id={plan.id}
                    className="mt-1"
                  />
                  <div className="ml-3 w-full">
                    <div className="flex justify-between items-center">
                      <Label 
                        htmlFor={plan.id} 
                        className="text-lg font-semibold"
                      >
                        {plan.name}
                        {isCurrentPlan && (
                          <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">
                            Current Plan
                          </span>
                        )}
                      </Label>
                      <div className="text-right">
                        <p className="font-bold">{plan.price}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex text-sm">
                          <Check className="h-4 w-4 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </RadioGroup>
        
        <div className="mt-8 space-y-4">
          <Button 
            className="w-full h-12"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Processing..." : "Update Subscription"}
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Secure payment processed by Stripe
            </p>
            <div className="flex justify-center">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
