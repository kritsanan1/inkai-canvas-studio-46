import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Palette,
  Award,
  Verified,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

const Artists = () => {
  const artists = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "@sarahink",
      location: "Los Angeles, CA",
      specialties: ["Geometric", "Minimalist", "Blackwork"],
      rating: 4.9,
      reviews: 234,
      designs: 89,
      followers: 12500,
      joinDate: "2022",
      verified: true,
      featured: true,
      bio: "Award-winning tattoo artist specializing in geometric and minimalist designs. 15+ years of experience.",
      avatar: "/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png",
      portfolio: [
        "/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png",
        "/lovable-uploads/30ac5a9c-3418-4b26-8bd9-a948f30ce8c3.png",
        "/lovable-uploads/2772e444-0bc9-4c71-9d49-5b7515865c6a.png"
      ]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      username: "@marcusart",
      location: "Miami, FL",
      specialties: ["Traditional", "Neo-Traditional", "Color"],
      rating: 4.8,
      reviews: 189,
      designs: 156,
      followers: 8900,
      joinDate: "2021",
      verified: true,
      featured: false,
      bio: "Traditional tattoo artist bringing classic styles into the modern era with vibrant colors and bold designs.",
      avatar: "/lovable-uploads/95cb13d9-91c3-4ee8-a152-cb943f647c69.png",
      portfolio: [
        "/lovable-uploads/5827edae-7f78-4e63-ab17-27b32f9a720f.png",
        "/lovable-uploads/d909f8ec-1ccd-4c56-ad02-a761c2bcc9c7.png",
        "/lovable-uploads/8c8186c9-c126-48bd-9e85-8d1bbb272db2.png"
      ]
    },
    {
      id: 3,
      name: "Alex Kim",
      username: "@alexkimtattoo",
      location: "Seattle, WA",
      specialties: ["Watercolor", "Abstract", "Fine Line"],
      rating: 4.9,
      reviews: 167,
      designs: 203,
      followers: 15200,
      joinDate: "2020",
      verified: true,
      featured: true,
      bio: "Pushing the boundaries of tattoo artistry with watercolor techniques and abstract compositions.",
      avatar: "/lovable-uploads/1e3643eb-d440-4399-a7b5-ed6623d2075c.png",
      portfolio: [
        "/lovable-uploads/5d92c02a-fae5-400d-beb5-27d780fbc9aa.png",
        "/lovable-uploads/dff4538d-c0da-4c9a-9a49-868dd441466b.png",
        "/lovable-uploads/754e8be8-2196-4573-b62a-744706e401a4.png"
      ]
    }
  ];

  const featuredArtists = artists.filter(artist => artist.featured);
  const allArtists = artists;

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-black via-background to-card pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Featured Artists
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with world-class tattoo artists and bring your AI designs to life
          </p>
        </div>

        {/* Featured Artists Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Award className="w-6 h-6 text-accent" />
              <span>Featured Artists</span>
            </h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Card key={artist.id} className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden group">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 border-2 border-primary/20">
                      <AvatarImage src={artist.avatar} alt={artist.name} />
                      <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {artist.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Verified className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    {artist.featured && (
                      <div className="absolute -top-2 -left-2">
                        <Badge className="bg-gradient-to-r from-secondary to-accent text-black">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{artist.username}</p>
                  
                  <div className="flex items-center justify-center space-x-1 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{artist.location}</span>
                  </div>

                  <div className="flex items-center justify-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(artist.rating)
                              ? 'text-accent fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{artist.rating}</span>
                    <span className="text-sm text-muted-foreground">({artist.reviews})</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {artist.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {artist.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs border-border/30">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Portfolio Preview */}
                  <div className="grid grid-cols-3 gap-2">
                    {artist.portfolio.slice(0, 3).map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted/20">
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="font-semibold text-primary">{artist.designs}</div>
                      <div className="text-muted-foreground">Designs</div>
                    </div>
                    <div>
                      <div className="font-semibold text-secondary">{artist.followers.toLocaleString()}</div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-accent">{artist.joinDate}</div>
                      <div className="text-muted-foreground">Joined</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Artists Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Users className="w-6 h-6 text-primary" />
              <span>All Artists</span>
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Sort by Rating</Button>
            </div>
          </div>

          <div className="space-y-4">
            {allArtists.map((artist) => (
              <Card key={artist.id} className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={artist.avatar} alt={artist.name} />
                        <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {artist.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Verified className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer">
                          {artist.name}
                        </h3>
                        {artist.featured && (
                          <Badge className="bg-gradient-to-r from-secondary to-accent text-black text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{artist.username} • {artist.location}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {artist.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs border-border/30">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-accent fill-current" />
                          <span>{artist.rating} ({artist.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Palette className="w-4 h-4" />
                          <span>{artist.designs} designs</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{artist.followers.toLocaleString()} followers</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Artists;