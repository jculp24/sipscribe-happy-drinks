
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VendorHoursProps {
  vendorId: string;
  initialHours: string;
}

type DayHours = {
  open: string;
  close: string;
  closed: boolean;
};

type WeekHours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

export function VendorHours({ vendorId, initialHours }: VendorHoursProps) {
  const { toast } = useToast();
  
  // Parse initial hours or set defaults
  const defaultHours = {
    open: "09:00",
    close: "17:00",
    closed: false
  };
  
  const [hours, setHours] = useState<WeekHours>({
    monday: { ...defaultHours },
    tuesday: { ...defaultHours },
    wednesday: { ...defaultHours },
    thursday: { ...defaultHours },
    friday: { ...defaultHours },
    saturday: { ...defaultHours },
    sunday: { ...defaultHours, closed: true },
  });
  
  const updateHours = (
    day: keyof WeekHours, 
    field: keyof DayHours, 
    value: string | boolean
  ) => {
    setHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };
  
  const saveHours = () => {
    // Format hours for display
    const formattedHours = Object.entries(hours).map(([day, { open, close, closed }]) => {
      const dayName = day.charAt(0).toUpperCase() + day.slice(1);
      return `${dayName}: ${closed ? 'Closed' : `${open} - ${close}`}`;
    }).join(', ');
    
    // In a real app, this would save to the database
    console.log("Saving hours for vendor", vendorId, hours);
    
    toast({
      title: "Hours updated",
      description: "Your business hours have been updated.",
    });
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-1">
        <h3 className="font-semibold">Set Your Business Hours</h3>
        <p className="text-sm text-muted-foreground">
          Let customers know when they can visit your location.
        </p>
      </div>
      
      <div className="space-y-4">
        {(Object.keys(hours) as Array<keyof WeekHours>).map((day) => (
          <div key={day} className="flex items-center space-x-4 border-b border-border pb-2">
            <div className="w-24 font-medium capitalize">{day}</div>
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="checkbox"
                id={`closed-${day}`}
                checked={hours[day].closed}
                onChange={(e) => updateHours(day, 'closed', e.target.checked)}
                className="mr-1 h-4 w-4"
              />
              <label htmlFor={`closed-${day}`} className="text-sm">Closed</label>
            </div>
            
            {!hours[day].closed && (
              <>
                <div className="flex items-center space-x-2">
                  <label htmlFor={`open-${day}`} className="text-sm sr-only">
                    Open
                  </label>
                  <input
                    type="time"
                    id={`open-${day}`}
                    value={hours[day].open}
                    onChange={(e) => updateHours(day, 'open', e.target.value)}
                    className="border border-input px-2 py-1 rounded-md text-sm"
                  />
                </div>
                <div className="text-sm text-muted-foreground">to</div>
                <div className="flex items-center space-x-2">
                  <label htmlFor={`close-${day}`} className="text-sm sr-only">
                    Close
                  </label>
                  <input
                    type="time"
                    id={`close-${day}`}
                    value={hours[day].close}
                    onChange={(e) => updateHours(day, 'close', e.target.value)}
                    className="border border-input px-2 py-1 rounded-md text-sm"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      <Button onClick={saveHours} className="w-full">
        Save Hours
      </Button>
    </div>
  );
}
