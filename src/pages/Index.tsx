
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-cover bg-center"
      style={{ 
        backgroundImage: `url('/lovable-uploads/f56005aa-1931-4dfb-9d87-6b709f2fa96d.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-black">Welcome to Sipscribe</h1>
        <p className="text-xl text-gray-700 mb-8">
          Discover and enjoy drinks from local vendors with our subscription service
        </p>
        
        <Button 
          asChild 
          className="w-full bg-black text-white hover:bg-gray-800"
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
