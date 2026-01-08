import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-background to-yellow-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-3xl shadow-xl border border-border/50 p-8">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="mb-6 -ml-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </Link>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
                <p className="text-muted-foreground">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-12 h-12 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold" data-testid="button-reset">
                    Send Reset Link
                  </Button>
                </motion.div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to<br />
                <span className="font-semibold text-foreground">{email}</span>
              </p>
              
              <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground mb-6">
                <p>Didn't receive the email? Check your spam folder or try again.</p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl"
                  onClick={() => setIsSubmitted(false)}
                  data-testid="button-try-again"
                >
                  Try Another Email
                </Button>
                
                <Link href="/login">
                  <Button className="w-full h-12 rounded-xl" data-testid="button-back-login">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{' '}
              <Link href="/login">
                <span className="text-primary font-semibold hover:underline cursor-pointer" data-testid="link-login">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help?{' '}
          <a href="#" className="text-primary hover:underline">Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
}
