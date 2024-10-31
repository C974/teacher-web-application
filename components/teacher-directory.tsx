"use client";

import * as React from "react";
import { BookOpen, Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useToast, ToastProvider } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "Literature", "History", "Geography", "Art", "Music",
  "Physical Education", "Economics", "Psychology", "Sociology", "Philosophy",
  "Foreign Languages", "Environmental Science", "Political Science"
];

const firstNames = [
  "Youssef", "Nour", "Ibrahim", "Sara", "Khaled", "Hana", "Tariq", "Rania", "Samir", "Dina", "Amira", "Khalid", "Nada", "Omar", "Noura", "Lina",
];

const lastNames = [
  "Al-Farsi", "Al-Mansouri", "Al-Haddad", "Al-Sayed", "Al-Najjar", "Al-Rashid", "Al-Zahrani", "Al-Khalifa", "Al-Mutairi", "Al-Sharif", "Al-Ghamdi", "Al-Subaie", "Al-Ahmadi", "Al-Mazrouei", "Al-Balushi",
];

const profilePics = [
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/76.jpg",
  "https://randomuser.me/api/portraits/men/77.jpg",
  "https://randomuser.me/api/portraits/women/79.jpg",
  "https://randomuser.me/api/portraits/men/79.jpg",
  "https://randomuser.me/api/portraits/women/80.jpg",
  "https://randomuser.me/api/portraits/men/81.jpg",
  "https://randomuser.me/api/portraits/women/82.jpg",
  "https://randomuser.me/api/portraits/men/83.jpg",
  "https://randomuser.me/api/portraits/women/84.jpg",
  "https://randomuser.me/api/portraits/women/86.jpg",
  "https://randomuser.me/api/portraits/men/87.jpg",
  "https://randomuser.me/api/portraits/women/29.jpg",
  "https://randomuser.me/api/portraits/men/89.jpg",
  "https://randomuser.me/api/portraits/women/91.jpg",
  "https://randomuser.me/api/portraits/women/90.jpg"
];

const generateTeachers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Dr. ${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    subject: subjects[i % subjects.length],
    description: `Experienced educator specializing in ${subjects[i % subjects.length]}. Passionate about helping students excel.`,
    image: profilePics[i % profilePics.length],
  }));
};

const teachers = generateTeachers(20);

const sidebarItems = [
  {
    title: "Campus Events",
    url: "#",
    items: [
      { title: "Orientation", url: "#" },
      { title: "Career Fair", url: "#" },
      { title: "Guest Lecture", url: "#" },
      { title: "Sports Day", url: "#" },
      { title: "Cultural Fest", url: "#" },
    ],
  },
  {
    title: "Student Clubs",
    url: "#",
    items: [
      { title: "Robotics Club", url: "#" },
      { title: "Drama Club", url: "#" },
      { title: "Music Club", url: "#" },
      { title: "Art Club", url: "#" },
      { title: "Debate Club", url: "#" },
    ],
  },
  {
    title: "Help",
    url: "#",
    items: [
      { title: "FAQ", url: "#" },
      { title: "Contact Support", url: "#" },
      { title: "User Guide", url: "#" },
      { title: "Feedback", url: "#" },
      { title: "Report Issue", url: "#" },
    ],
  },
];

function TeacherCard({ teacher }) {
  const { toast } = useToast();

  const handleBookClass = () => {
    toast({
      title: "Class Booked Successfully",
      description: `You've booked a class with ${teacher.name}`,
      action: <button onClick={() => console.log('Dismissed')}>Dismiss</button>,
    });
  };

  return (
    <Card className="flex flex-col">
      <div className="flex justify-center mt-4">
        <Image
          src={teacher.image}
          alt={teacher.name}
          width={96} // Set an explicit width
          height={96} // Set an explicit height
          className="rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
      </div>
      <CardHeader>
        <CardTitle>{teacher.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-semibold mb-2">{teacher.subject}</p>
        <p className="text-sm">{teacher.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleBookClass}>Book Class</Button>
      </CardFooter>
    </Card>
  );
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const TeacherDirectory = () => {
  return (
    <ThemeProvider attribute="class">
      <ToastProvider>
        <SidebarProvider>
          <div className="flex h-screen">
            <Sidebar className="w-64">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <BookOpen className="size-4" />
                      </div>
                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-semibold">Teacher Directory</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Subjects</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {subjects.map((subject) => (
                        <SidebarMenuItem key={subject}>
                          <SidebarMenuButton asChild>
                            <a href="#">{subject}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                {sidebarItems.map((group) => (
                  <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
              <SidebarRail />
            </Sidebar>
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-3xl font-bold">Our Teachers</h1>
                  <ThemeToggle />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {teachers.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                  ))}
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default TeacherDirectory;