import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import heroImage from "@/assets/education-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary))/0.9 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70" />
        
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn. Grow. Succeed.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join our comprehensive educational platform and advance your skills with expert-led courses and interactive learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-[var(--shadow-medium)] text-lg px-8 py-3"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-white text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Why Choose EduPlatform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience a modern approach to learning with our comprehensive platform designed for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-[var(--shadow-medium)] border-0 hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Expert Courses</CardTitle>
                <CardDescription>
                  Learn from industry experts with real-world experience in cutting-edge technologies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-[var(--shadow-medium)] border-0 hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Join a vibrant community of learners and get support when you need it most.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-[var(--shadow-medium)] border-0 hover:shadow-[var(--shadow-strong)] transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Certification</CardTitle>
                <CardDescription>
                  Earn recognized certificates that validate your skills and boost your career prospects.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary via-primary to-primary/90">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of students who are already advancing their careers with our platform.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/signup")}
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-[var(--shadow-medium)] text-lg px-8 py-3"
          >
            Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
