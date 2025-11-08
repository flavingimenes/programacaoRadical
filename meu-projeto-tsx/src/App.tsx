import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { EventForm } from './components/EventForm';
import { Calendar } from './components/Calendar';
import { ResourceManagement } from './components/ResourceManagement';
import { WorkflowPanel } from './components/WorkflowPanel';
import { NotificationsPanel } from './components/NotificationsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { CalendarDays, LayoutDashboard, FileText, Cog, GitBranch } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm" >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900 " style={{color: "blue"}}>Uniforms</h1>
              <p className="text-slate-600">Gestão dos Eventos Institucionais</p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationsPanel />
              <div className="text-right">
                <p className="text-slate-900">Dhiogo Nascimento</p>
                <p className="text-slate-600">Coordenador Engenharia de Software</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                JS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="nova-solicitacao" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Nova Solicitação</span>
            </TabsTrigger>
            <TabsTrigger value="calendario" className="gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="hidden sm:inline">Calendário</span>
            </TabsTrigger>
            <TabsTrigger value="workflow" className="gap-2">
              <GitBranch className="w-4 h-4" />
              <span className="hidden sm:inline">Workflow</span>
            </TabsTrigger>
            <TabsTrigger value="recursos" className="gap-2">
              <Cog className="w-4 h-4" />
              <span className="hidden sm:inline">Recursos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="nova-solicitacao" className="space-y-4">
            <EventForm />
          </TabsContent>

          <TabsContent value="calendario" className="space-y-4">
            <Calendar />
          </TabsContent>

          <TabsContent value="workflow" className="space-y-4">
            <WorkflowPanel />
          </TabsContent>

          <TabsContent value="recursos" className="space-y-4">
            <ResourceManagement />
          </TabsContent>
        </Tabs>
      </div>
      
      <Toaster />
    </div>
  );
}