import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: 'Authentication Error',
            description: error.message,
            variant: 'destructive'
          });
          navigate('/');
          return;
        }

        if (data.session) {
          toast({
            title: 'Welcome!',
            description: 'You have been successfully authenticated.',
          });
          navigate('/');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        toast({
          title: 'Authentication Error',
          description: 'An unexpected error occurred during authentication.',
          variant: 'destructive'
        });
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">Completing Authentication</h2>
          <p className="text-muted-foreground text-center">
            Please wait while we complete your authentication...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;