import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockResources, mockEvents } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, MapPin, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import type { Resource } from '../types/event';

export function ResourceManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  const getResourceUsage = (resourceId: string) => {
    return mockEvents.filter(event => 
      event.resources.some(r => r.id === resourceId)
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestão de Recursos</CardTitle>
          <CardDescription>
            Controle e visualize a disponibilidade de espaços e equipamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="sala">Salas</SelectItem>
                <SelectItem value="equipamento">Equipamentos</SelectItem>
                <SelectItem value="material">Materiais</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="available">Disponíveis</TabsTrigger>
              <TabsTrigger value="unavailable">Em Uso</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              <ResourceList resources={filteredResources} getResourceUsage={getResourceUsage} />
            </TabsContent>

            <TabsContent value="available" className="space-y-3">
              <ResourceList 
                resources={filteredResources.filter(r => r.available)} 
                getResourceUsage={getResourceUsage} 
              />
            </TabsContent>

            <TabsContent value="unavailable" className="space-y-3">
              <ResourceList 
                resources={filteredResources.filter(r => !r.available)} 
                getResourceUsage={getResourceUsage} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Salas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-900">
                  {mockResources.filter(r => r.type === 'sala').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Disponíveis</span>
                <span className="text-green-600">
                  {mockResources.filter(r => r.type === 'sala' && r.available).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Em uso</span>
                <span className="text-red-600">
                  {mockResources.filter(r => r.type === 'sala' && !r.available).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-900">
                  {mockResources.filter(r => r.type === 'equipamento').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Disponíveis</span>
                <span className="text-green-600">
                  {mockResources.filter(r => r.type === 'equipamento' && r.available).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Em uso</span>
                <span className="text-red-600">
                  {mockResources.filter(r => r.type === 'equipamento' && !r.available).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Materiais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-900">
                  {mockResources.filter(r => r.type === 'material').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Disponíveis</span>
                <span className="text-green-600">
                  {mockResources.filter(r => r.type === 'material' && r.available).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Em uso</span>
                <span className="text-red-600">
                  {mockResources.filter(r => r.type === 'material' && !r.available).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ResourceList({ 
  resources, 
  getResourceUsage 
}: { 
  resources: Resource[];
  getResourceUsage: (resourceId: string) => any[];
}) {
  const typeLabels = {
    sala: 'Sala',
    equipamento: 'Equipamento',
    material: 'Material'
  };

  if (resources.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        Nenhum recurso encontrado
      </div>
    );
  }

  return (
    <>
      {resources.map((resource) => {
        const usage = getResourceUsage(resource.id);
        
        return (
          <div key={resource.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-slate-900">{resource.name}</h3>
                  <Badge variant="outline">{typeLabels[resource.type]}</Badge>
                </div>
                {resource.location && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{resource.location}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {resource.available ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <Badge className="bg-green-600">Disponível</Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <Badge className="bg-red-600">Em Uso</Badge>
                  </>
                )}
              </div>
            </div>

            {usage.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Eventos programados ({usage.length})</span>
                </div>
                <div className="space-y-1">
                  {usage.slice(0, 3).map((event) => (
                    <div key={event.id} className="text-slate-600 pl-6">
                      • {event.title} - {event.startDate.toLocaleDateString('pt-BR')}
                    </div>
                  ))}
                  {usage.length > 3 && (
                    <div className="text-slate-500 pl-6">
                      + {usage.length - 3} outros eventos
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
