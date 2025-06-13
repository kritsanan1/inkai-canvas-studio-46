import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  Edit,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { user, signOut, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || '',
    username: user?.user_metadata?.username || '',
  });

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: 'Sign Out Failed',
          description: error.message,
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Sign Out Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await updateProfile(formData);
      if (error) {
        toast({
          title: 'Update Failed',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setIsEditing(false);
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been updated successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Update Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      full_name: user?.user_metadata?.full_name || '',
      username: user?.user_metadata?.username || '',
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Profile</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-primary/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20 border-2 border-primary/20">
              <AvatarImage 
                src={user.user_metadata?.avatar_url} 
                alt={user.user_metadata?.full_name || user.email} 
              />
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-primary/20 to-secondary/20">
                {user.user_metadata?.full_name 
                  ? getInitials(user.user_metadata.full_name)
                  : user.email?.charAt(0).toUpperCase()
                }
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {user.user_metadata?.full_name || 'User'}
              </h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="border-primary/30">
                  <Mail className="w-3 h-3 mr-1" />
                  {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                </Badge>
                <Badge variant="outline" className="border-secondary/30">
                  Free Plan
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Enter your full name"
                  className="bg-background/50"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-md">
                  {user.user_metadata?.full_name || 'Not set'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              {isEditing ? (
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter your username"
                  className="bg-background/50"
                />
              ) : (
                <div className="p-3 bg-muted/20 rounded-md">
                  {user.user_metadata?.username || 'Not set'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="p-3 bg-muted/20 rounded-md">
                {user.email}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Member Since</Label>
              <div className="p-3 bg-muted/20 rounded-md flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                {formatDate(user.created_at)}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-muted-foreground/30"
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4 mr-2" />
              )}
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;