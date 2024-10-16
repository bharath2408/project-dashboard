"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, LayoutGrid, Link, List, Search } from "lucide-react";
import { useState } from "react";

// Sample project data
const projects = [
  {
    id: 1,
    name: "Real Estate Chatbot application",
    description:
      "A Real Estate Chatbot application assists users in finding properties by providing listings, scheduling viewings, and answering queries through automated chat. It improves customer engagement and streamlines the property search process for real estate businesses",
    status: "Live",
    category: "Web",
    lastUpdated: "10/5/2024",
    link: "https://main.dtcngl2lqsmq5.amplifyapp.com/",
  },
  {
    id: 2,
    name: "Retail Chatbot application (ACE)",
    description:
      "A Retail Chatbot application helps customers browse products, check availability, and track orders through automated chat. It enhances the shopping experience and boosts customer engagement for retail businesses.",
    status: "In Development",
    category: "Web",
    lastUpdated: "10/5/2024",
    link: "https://main.d2axcmmvnw8pt3.amplifyapp.com",
  },
  {
    id: 3,
    name: "Retail Chatbot application (Lenovo)",
    description:
      "A Retail Chatbot application helps customers browse products, check availability, and track orders through automated chat. It enhances the shopping experience and boosts customer engagement for retail businesses.",
    status: "In Development",
    category: "Web",
    lastUpdated: "10/5/2024",
    link: "https://main.d1wqhvzglz9yn6.amplifyapp.com/",
  },
  {
    id: 4,
    name: "Chat with Document",
    description:
      "Chat with Document lets users chat with documents, quickly retrieving and summarizing information using a natural language interface, powered by AI for easy data extraction.",
    status: "Live",
    category: "Web",
    lastUpdated: "10/7/2024",
    link: "http://54.164.209.139:8501/",
  },
];

const statusColors = {
  Live: "bg-green-500",
  "In Development": "bg-blue-500",
  Planning: "bg-yellow-500",
  Beta: "bg-purple-500",
};

export default function ImprovedProjectDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 1500);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "All" || project.category === activeTab)
  );

  function redirectToNewWindow(url) {
    if (!url) {
      console.error("URL is required");
      return;
    }

    // Open the URL in a new window or tab
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const ProjectCard = ({ project }) => (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {project.name}
          <Badge className={`${statusColors[project.status]} text-white`}>
            {project.status}
          </Badge>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Category: {project.category}
          </span>
          <span className="text-sm text-gray-500">
            Updated: {project.lastUpdated}
          </span>
        </div>
        <Button
          onClick={() => redirectToNewWindow(project.link)}
          className="bg-white hover:bg-white shadow-none px-0 inline-flex items-center mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Demo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Project Dashboard
        </h1>

        <div className="mb-8 flex items-center space-x-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={20} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List size={20} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="All" className="mb-8">
          <TabsList>
            <TabsTrigger value="All" onClick={() => setActiveTab("All")}>
              All
            </TabsTrigger>
            <TabsTrigger value="Web" onClick={() => setActiveTab("Web")}>
              Web
            </TabsTrigger>
            <TabsTrigger value="Mobile" onClick={() => setActiveTab("Mobile")}>
              Mobile
            </TabsTrigger>
            <TabsTrigger
              value="Desktop"
              onClick={() => setActiveTab("Desktop")}
            >
              Desktop
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
