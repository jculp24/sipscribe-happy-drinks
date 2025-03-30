
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="sipscribe-container min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sipscribe</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover and enjoy drinks from local vendors with our subscription service
        </p>
        
        <Button 
          asChild 
          className="w-full"
          size="lg"
        >
          <Link to="/home">
            Enter App
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
