import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Heart, 
  Download, 
  Eye,
  Grid3X3,
  List,
  Sparkles
} from 'lucide-react';

const Gallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for tattoo designs
  const designs = [
    {
      id: 1,
      title: "Geometric Dragon",
      style: "Geometric",
      size: "Large",
      placement: "Back",
      likes: 245,
      downloads: 67,
      views: 1200,
      tags: ["dragon", "geometric", "large"],
      artist: "AI Studio",
      image: "/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png"
    },
    {
      id: 2,
      title: "Minimalist Rose",
      style: "Minimalist",
      size: "Small",
      placement: "Wrist",
      likes: 189,
      downloads: 45,
      views: 890,
      tags: ["rose", "minimalist", "small"],
      artist: "AI Studio",
      image: "/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png"
    },
    {
      id: 3,
      title: "Tribal Phoenix",
      style: "Tribal",
      size: "Medium",
      placement: "Shoulder",
      likes: 321,
      downloads: 89,
      views: 1567,
      tags: ["phoenix", "tribal", "medium"],
      artist: "AI Studio",
      image: "/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png"
    },
    {
      id: 4,
      title: "Blackwork Mandala",
      style: "Blackwork",
      size: "Large",
      placement: "Chest",
      likes: 412,
      downloads: 123,
      views: 2100,
      tags: ["mandala", "blackwork", "large"],
      artist: "AI Studio",
      image: "/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png"
    },
    {
      id: 5,
      title: "Watercolor Butterfly",
      style: "Watercolor",
      size: "Medium",
      placement: "Arm",
      likes: 298,
      downloads: 76,
      views: 1345,
      tags: ["butterfly", "watercolor", "medium"],
      artist: "AI Studio",
      image: "/lovable-uploads/95cb13d9-91c3-4ee8-a152-cb943f647c69.png"
    },
    {
      id: 6,
      title: "Neo-Traditional Wolf",
      style: "Traditional",
      size: "Large",
      placement: "Leg",
      likes: 367,
      downloads: 98,
      views: 1789,
      tags: ["wolf", "traditional", "large"],
      artist: "AI Studio",
      image: "/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png"
    }
  ];

  const categories = [
    { name: "All", count: designs.length, active: true },
    { name: "Geometric", count: 45, active: false },
    { name: "Traditional", count: 67, active: false },
    { name: "Minimalist", count: 34, active: false },
    { name: "Blackwork", count: 56, active: false },
    { name: "Watercolor", count: 23, active: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Design Gallery
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore thousands of AI-generated tattoo designs from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input/50 border-border/30 focus:border-primary/50"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="border-l border-border/30 pl-2 flex space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant={category.active ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 ${
                  category.active 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                    : 'border-border/30 hover:border-primary/50'
                }`}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {designs.map((design) => (
            <Card 
              key={design.id} 
              className="group border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-muted/20 to-muted/5 relative overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Trending badge */}
                  {design.likes > 300 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-secondary to-accent text-black">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {design.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {design.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-border/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{design.likes}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{design.downloads}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{design.views}</span>
                      </span>
                    </div>
                    <span className="text-xs">{design.style}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
            Load More Designs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;