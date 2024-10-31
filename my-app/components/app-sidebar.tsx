import * as React from "react"
import { SearchForm } from "@/components/search-form"
import { StudentSwitcher } from "@/components/version-switcher"
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
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  categories: ["Science", "Mathematics", "Campus Events", "Student Clubs", "Grab Coffee with Alumni", "Help"],
  defaultCategory: "Science",
  navMain: [
    {
      title: "Student Resources",
      url: "#",
      items: [
        {
          title: "Science",
          url: "#",
          items: [
            {
              title: "Biology",
              url: "#",
            },
            {
              title: "Chemistry",
              url: "#",
            },
            {
              title: "Physics",
              url: "#",
            },
          ],
        },
        {
          title: "Mathematics",
          url: "#",
          items: [
            {
              title: "Algebra",
              url: "#",
            },
            {
              title: "Geometry",
              url: "#",
            },
            {
              title: "Calculus",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      title: "Campus Events",
      url: "#",
      items: [
        {
      
              title: "Orientation",
              url: "#",
            },
            {
              title: "Career Fair",
              url: "#",
            },
            {
              title: "Guest Lecture",
              url: "#",
            },
            {
              title: "Sports Day",
              url: "#",
            },
            {
              title: "Cultural Fest",
              url: "#",
     
        },
      ],
    },
    {
      title: "Student Clubs",
      url: "#",
      items: [
        {
          title: "Robotics Club",
          url: "#",
        },
        {
          title: "Drama Club",
          url: "#",
        },
        {
          title: "Music Club",
          url: "#",
        },
        {
          title: "Art Club",
          url: "#",
        },
        {
          title: "Debate Club",
          url: "#",
        },
      ],
    },
    {  title: "Help",
      url: "#",
      items: [
        {
          title: "FAQ",
          url: "#",
        },
        {
          title: "Contact Support",
          url: "#",
        },
        {
          title: "User Guide",
          url: "#",
        },
        {
          title: "Feedback",
          url: "#",
        },
        {
          title: "Report Issue",
          url: "#",
        },
      ],
  
      
      
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <StudentSwitcher
          categories={data.categories}
          defaultCategory={data.defaultCategory}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                      <a href={subItem.url}>{subItem.title}</a>
                    </SidebarMenuButton>
                    {subItem.items && (
                      <SidebarMenu>
                        {subItem.items.map((nestedItem) => (
                          <SidebarMenuItem key={nestedItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={nestedItem.url}>{nestedItem.title}</a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}