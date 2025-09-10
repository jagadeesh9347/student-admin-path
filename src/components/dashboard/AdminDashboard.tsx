import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Users, Plus, Edit2, Trash2, Search, GraduationCap } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
}

export const AdminDashboard = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      course: "MERN Bootcamp",
      enrollmentDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Full Stack Development",
      enrollmentDate: "2024-02-01"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      course: "Frontend Mastery",
      enrollmentDate: "2024-01-20"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const courses = [
    "MERN Bootcamp",
    "Full Stack Development",
    "Frontend Mastery",
    "Backend Engineering",
    "DevOps Fundamentals",
    "Mobile Development",
  ];

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const student: Student = {
      id: Math.random().toString(36).substr(2, 9),
      ...newStudent,
      enrollmentDate: new Date().toISOString().split('T')[0]
    };

    setStudents([...students, student]);
    setNewStudent({ name: "", email: "", course: "" });
    setShowAddForm(false);
    
    toast({
      title: "Student Added",
      description: `${student.name} has been added successfully.`,
    });
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.name,
      email: student.email,
      course: student.course,
    });
    setShowAddForm(true);
  };

  const handleUpdateStudent = () => {
    if (!editingStudent) return;

    const updatedStudents = students.map(s =>
      s.id === editingStudent.id
        ? { ...s, ...newStudent }
        : s
    );

    setStudents(updatedStudents);
    setEditingStudent(null);
    setNewStudent({ name: "", email: "", course: "" });
    setShowAddForm(false);
    
    toast({
      title: "Student Updated",
      description: "Student information has been updated successfully.",
    });
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    setStudents(students.filter(s => s.id !== id));
    
    toast({
      title: "Student Removed",
      description: `${student?.name} has been removed from the system.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage students and track enrollment</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              Active enrollments
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Offered</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              Available programs
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => new Date(s.enrollmentDate).getMonth() === new Date().getMonth()).length}
            </div>
            <p className="text-xs text-muted-foreground">
              New enrollments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="shadow-[var(--shadow-medium)] border-0">
          <CardHeader>
            <CardTitle>{editingStudent ? "Edit Student" : "Add New Student"}</CardTitle>
            <CardDescription>
              {editingStudent ? "Update student information" : "Enter student details to add them to the system"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Full Name</Label>
                <Input
                  id="studentName"
                  placeholder="Enter student name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentEmail">Email</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  placeholder="Enter student email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="studentCourse">Course</Label>
                <Select onValueChange={(value) => setNewStudent({ ...newStudent, course: value })} value={newStudent.course}>
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
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button
                onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
                className="bg-[var(--gradient-primary)] hover:opacity-90 transition-opacity"
              >
                {editingStudent ? "Update Student" : "Add Student"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingStudent(null);
                  setNewStudent({ name: "", email: "", course: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      <Card className="shadow-[var(--shadow-medium)] border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage all student enrollments</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No students match your search." : "No students enrolled yet."}
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary">{student.course}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};