import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { User, Mail, GraduationCap, Calendar, Edit2, Save, X } from "lucide-react";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  role: string;
}

export const StudentDashboard = () => {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    course: "",
  });

  const courses = [
    "MERN Bootcamp",
    "Full Stack Development",
    "Frontend Mastery",
    "Backend Engineering",
    "DevOps Fundamentals",
    "Mobile Development",
  ];

  useEffect(() => {
    // Get user data from localStorage (mock authentication)
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setStudent(parsedUser);
      setEditForm({
        name: parsedUser.name,
        email: parsedUser.email,
        course: parsedUser.course || "MERN Bootcamp",
      });
    }
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditForm({
        name: student?.name || "",
        email: student?.email || "",
        course: student?.course || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.email || !editForm.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const updatedStudent = {
      ...student!,
      ...editForm,
    };

    setStudent(updatedStudent);
    localStorage.setItem("user", JSON.stringify(updatedStudent));
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysEnrolled = () => {
    if (!student?.enrollmentDate) return 0;
    const enrollmentDate = new Date(student.enrollmentDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - enrollmentDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Welcome back, {student.name}!</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <User className="h-3 w-3 mr-1" />
          Student
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Course</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{student.course}</div>
            <p className="text-xs text-muted-foreground">
              Your enrolled program
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Enrolled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{getDaysEnrolled()}</div>
            <p className="text-xs text-muted-foreground">
              Since enrollment
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-success">Active</div>
            <p className="text-xs text-muted-foreground">
              Account status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profile Card */}
      <Card className="shadow-[var(--shadow-medium)] border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
                    size="sm"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleEditToggle}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleEditToggle}
                  size="sm"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-3 bg-secondary/50 rounded-md">
                    {student.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="p-3 bg-secondary/50 rounded-md">
                    {student.email}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Course
                </Label>
                {isEditing ? (
                  <Select onValueChange={(value) => setEditForm({ ...editForm, course: value })} value={editForm.course}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-3 bg-secondary/50 rounded-md">
                    {student.course}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Enrollment Date
                </Label>
                <div className="p-3 bg-secondary/50 rounded-md">
                  {student.enrollmentDate ? formatDate(student.enrollmentDate) : "Not specified"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Information */}
      <Card className="shadow-[var(--shadow-medium)] border-0">
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Details about your enrolled course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
              <div>
                <h3 className="font-semibold">{student.course}</h3>
                <p className="text-sm text-muted-foreground">
                  Enrolled since {student.enrollmentDate ? formatDate(student.enrollmentDate) : "N/A"}
                </p>
              </div>
              <Badge className="bg-success text-success-foreground">
                Active
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>
                You are currently enrolled in the {student.course} program. 
                Keep up the great work and don't hesitate to reach out to your instructors if you need any help!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};