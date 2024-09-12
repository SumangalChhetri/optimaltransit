"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Bell, ChevronsLeft, ChevronsRight, HelpCircle, Home, LayoutDashboard, LogOut, Settings, Truck, Users, Wrench, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Section = 'home' | 'maintenance' | 'logistics' | 'analysis' | 'thirdPartyLogistics' | 'dispatch'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [showAuth, setShowAuth] = useState(false)
  const [authenticatedSections, setAuthenticatedSections] = useState<Section[]>(['home'])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleAuth = (action: 'login' | 'signup') => {
    setAuthenticatedSections(prev => [...prev, activeSection])
    setShowAuth(false)
  }

  const handleLogout = () => {
    setAuthenticatedSections(['home'])
    setActiveSection('home')
  }

  const isAuthenticated = (section: Section) => authenticatedSections.includes(section)

  const renderContent = () => {
    if (showAuth) {
      return <AuthInterface section={activeSection} onClose={() => setShowAuth(false)} onAuth={handleAuth} />
    }

    if (!isAuthenticated(activeSection) && activeSection !== 'home') {
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please log in to access {activeSection} features.</p>
            <Button className="mt-4" onClick={() => setShowAuth(true)}>Log In / Sign Up</Button>
          </CardContent>
        </Card>
      )
    }

    switch (activeSection) {
      case 'maintenance':
        return <MaintenanceContent />
      case 'logistics':
        return <LogisticsContent />
      case 'analysis':
        return <AnalysisContent />
      case 'thirdPartyLogistics':
        return <ThirdPartyLogisticsContent />
      case 'dispatch':
        return <DispatchContent />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100 lg:flex-row">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-blue-800 to-indigo-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-full lg:w-64' : 'w-20'} ${sidebarOpen ? 'h-auto' : 'h-screen'} lg:h-screen`}>
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && (
            <Image
              src="/logo.png"
              alt="Opti-Transit Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {sidebarOpen ? <ChevronsLeft className="h-6 w-6" /> : <ChevronsRight className="h-6 w-6" />}
          </Button>
        </div>
        <nav className="mt-8">
          <NavItem icon={<Home />} label="Home" active={activeSection === 'home'} expanded={sidebarOpen} onClick={() => setActiveSection('home')} />
          <NavItem icon={<Wrench />} label="Maintenance" active={activeSection === 'maintenance'} expanded={sidebarOpen} onClick={() => setActiveSection('maintenance')} />
          <NavItem icon={<Truck />} label="Logistics" active={activeSection === 'logistics'} expanded={sidebarOpen} onClick={() => setActiveSection('logistics')} />
          <NavItem icon={<Users />} label="Data Analysis" active={activeSection === 'analysis'} expanded={sidebarOpen} onClick={() => setActiveSection('analysis')} />
          <NavItem icon={<LayoutDashboard />} label="Third Party Logistics" active={activeSection === 'thirdPartyLogistics'} expanded={sidebarOpen} onClick={() => setActiveSection('thirdPartyLogistics')} />
          <NavItem icon={<MapPin />} label="Dispatch" active={activeSection === 'dispatch'} expanded={sidebarOpen} onClick={() => setActiveSection('dispatch')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-semibold text-gray-800">Opti-Transit Overview</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              {authenticatedSections.length > 1 && (
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="p-6">
          <ScrollArea className="h-[calc(100vh-5rem)]">
            {renderContent()}
          </ScrollArea>
        </div>
      </main>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  expanded: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, expanded, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full flex items-center space-x-4 rounded-lg transition-all duration-300 font-bold
        ${active ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'}
        ${expanded ? 'px-6 py-4 text-lg' : 'px-5 py-3 text-base'}
        mb-2
      `}
      onClick={onClick}
    >
      {icon}
      {expanded && <span className="ml-4">{label}</span>}
    </Button>
  );
}

interface AuthInterfaceProps {
  section: Section
  onClose: () => void
  onAuth: (action: 'login' | 'signup') => void
}

function AuthInterface({ section, onClose, onAuth }: AuthInterfaceProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{section.charAt(0).toUpperCase() + section.slice(1)} Access</CardTitle>
        <CardDescription>Sign up or log in to access {section} features</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => { e.preventDefault(); onAuth('login'); }}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-id">ID</Label>
                  <Input id="login-id" placeholder="Enter your ID" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" placeholder="Enter your password" />
                </div>
                <Button type="submit">Log in</Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={(e) => { e.preventDefault(); onAuth('signup'); }}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Choose a password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input id="signup-confirm-password" type="password" placeholder="Confirm your password" />
                </div>
                <Button type="submit">Sign up</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
        <Button variant="outline" className="mt-4 w-full" onClick={onClose}>
          Back to Dashboard
        </Button>
      </CardContent>
    </Card>
  )
}

function HomeContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Opti-Transit</CardTitle>
          <CardDescription className="text-blue-100">Your comprehensive transit management solution</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Select a section from the sidebar to get started with our powerful features.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/quick-stats.png" alt="Quick Stats" width={200} height={100} className="mb-4" />
          <p>View key performance indicators at a glance.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/recent-activities.png" alt="Recent Activities" width={200} height={100} className="mb-4" />
          <p>Stay updated with the latest events and actions.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/system-status.png" alt="System Status" width={200} height={100} className="mb-4" />
          <p>Monitor the health and performance of your transit system.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function MaintenanceContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/maintenance-dashboard.png" alt="Maintenance Dashboard" width={300} height={150} className="mb-4" />
          <p>View and manage vehicle maintenance schedules and status.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Predictive Maintenance Alerts</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/predictive-maintenance.png" alt="Predictive Maintenance" width={300} height={150} className="mb-4" />
          <p>Stay ahead of potential issues with AI-driven predictions.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Status Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/vehicle-status.png" alt="Vehicle Status" width={300} height={150} className="mb-4" />
          <p>Real-time updates on vehicle conditions and performance.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function LogisticsContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Logistics Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/logistics-dashboard.png" alt="Logistics Dashboard" width={300} height={150} className="mb-4" />
          <p>Overview of current logistics operations and key metrics.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Real-Time GPS Tracking</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/gps-tracking.png" alt="GPS Tracking" width={300} height={150} className="mb-4" />
          <p>Track your fleet's location and status in real-time.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Load Management</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/load-management.png" alt="Load Management" width={300} height={150} className="mb-4" />
          <p>Monitor and optimize load distribution across your fleet.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalysisContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/performance-analysis.png" alt="Performance Analysis" width={300} height={150} className="mb-4" />
          <p>In-depth analysis of fleet and driver performance metrics.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>MIS Reporting</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/mis-reporting.png" alt="MIS Reporting" width={300} height={150} className="mb-4" />
          <p>Generate comprehensive reports for management insights.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Optimization Insights</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/optimization-insights.png" alt="Optimization Insights" width={300} height={150} className="mb-4" />
          <p>AI-driven recommendations for improving operations.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ThirdPartyLogisticsContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Book Available Transit</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/book-transit.png" alt="Book Transit" width={300} height={150} className="mb-4" />
          <p>Reserve capacity for your shipments with ease.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Tracking</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/real-time-tracking.png" alt="Real-Time Tracking" width={300} height={150} className="mb-4" />
          <p>Monitor your booked transits in real-time.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/notifications.png" alt="Notifications" width={300} height={150} className="mb-4" />
          <p>Receive instant updates on your shipments.</p>
        </CardContent>
      </Card>
    </div>
  )
}

function DispatchContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Scheduling System</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/scheduling-system.png" alt="Scheduling System" width={300} height={150} className="mb-4" />
          <p>Manage and optimize your dispatch schedules.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Route Optimization</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/route-optimization.png" alt="Route Optimization" width={300} height={150} className="mb-4" />
          <p>Find the most efficient routes for your fleet.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Load Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image src="/load-distribution.png" alt="Load Distribution" width={300} height={150} className="mb-4" />
          <p>Optimize load assignments across your fleet.</p>
        </CardContent>
      </Card>
    </div>
  )
}