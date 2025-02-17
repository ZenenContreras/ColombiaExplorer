import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Clock, Phone, Globe } from "lucide-react";

interface LocationCardProps {
  title?: string;
  description?: string;
  image?: string;
  address?: string;
  hours?: string;
  phone?: string;
  website?: string;
  tags?: string[];
  onClose?: () => void;
}

const LocationCard = ({
  title = "Cartagena Historic Center",
  description = "A UNESCO World Heritage site featuring colorful colonial architecture, cobblestone streets, and historic fortifications.",
  image = "https://images.unsplash.com/photo-1583997052103-b4a1cb974ce3?w=800&auto=format&fit=crop&q=60",
  address = "Centro Histórico, Cartagena, Colombia",
  hours = "Open 24/7",
  phone = "+57 5 6600380",
  website = "https://cartagena.gov.co",
  tags = ["Historic", "Cultural", "Architecture"],
  onClose = () => {},
}: LocationCardProps) => {
  return (
    <Card className="w-[400px] bg-white shadow-lg">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-500" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
