import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockEvents } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { CheckCircle2, XCircle, Clock, ArrowRight, Calendar, Users, MapPin, ClipboardList, Palette } from 'lucide-react';
import { toast } from 'sonner';
import type { Event, Department } from '../types/event';
import { CeremonialChecklist } from './CeremonialChecklist';
import { MarketingPanel } from './MarketingPanel';
import { EventComments } from './EventComments';

const departmentLabels = {
  pro_reitoria: 'Pró-Reitoria',
  cerimonial: 'Cerimonial',
  audiovisual: 'Audiovisual',
  marketing: 'Marketing'
};

const statusColors = {
  pendente: 'bg-yellow-500',
  aprovado: 'bg-green-500',
  rejeitado: 'bg-red-500'
};

export function WorkflowPanel() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [notes, setNotes] = useState('');
  const [activeDetailTab, setActiveDetailTab] = useState('approval');

  const pendingEvents = mockEvents.filter(e => e.status.startsWith('aguardando'));

  const handleApproval = (eventId: string, department: Department, approved: boolean) => {
    toast.success(
      approved ? 'Evento aprovado!' : 'Evento rejeitado',
      { description: `${departmentLabels[department]} processou a solicitação.` }
    );
    setSelectedEvent(null);
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Aprovação</CardTitle>
          <CardDescription>
            Gerencie as aprovações de eventos por cada setor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pro_reitoria">Pró-Reitoria</TabsTrigger>
              <TabsTrigger value="cerimonial">Cerimonial</TabsTrigger>
              <TabsTrigger value="audiovisual">Audiovisual</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {pendingEvents.map((event) => (
                <EventWorkflowCard 
                  key={event.id} 
                  event={event} 
                  onSelect={setSelectedEvent}
                />
              ))}
              {pendingEvents.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  Nenhum evento aguardando aprovação
                </div>
              )}
            </TabsContent>

            {(['pro_reitoria', 'cerimonial', 'audiovisual', 'marketing'] as Department[]).map((dept) => (
              <TabsContent key={dept} value={dept} className="space-y-4">
                {pendingEvents
                  .filter(e => e.approvals.some(a => a.department === dept && a.status === 'pendente'))
                  .map((event) => (
                    <EventWorkflowCard 
                      key={event.id} 
                      event={event} 
                      onSelect={setSelectedEvent}
                      highlightDepartment={dept}
                    />
                  ))}
                {pendingEvents.filter(e => e.approvals.some(a => a.department === dept && a.status === 'pendente')).length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    Nenhum evento aguardando aprovação de {departmentLabels[dept]}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Approval Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogDescription>
                Gestão completa do evento com aprovações, checklist e materiais
              </DialogDescription>
            </DialogHeader>

            <Tabs value={activeDetailTab} onValueChange={setActiveDetailTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="approval" className="gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Aprovação
                </TabsTrigger>
                <TabsTrigger value="checklist" className="gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Checklist
                </TabsTrigger>
                <TabsTrigger value="marketing" className="gap-2">
                  <Palette className="w-4 h-4" />
                  Marketing
                </TabsTrigger>
                <TabsTrigger value="communication" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Comunicação
                </TabsTrigger>
              </TabsList>

              {/* Approval Tab */}
              <TabsContent value="approval" className="space-y-4">
                <div className="space-y-4">
                  {/* Event Details */}
                  <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                    <h3 className="text-slate-900">Detalhes do Evento</h3>
                    <p className="text-slate-600">{selectedEvent.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {selectedEvent.startDate.toLocaleDateString('pt-BR')} - {selectedEvent.endDate.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{selectedEvent.expectedAttendees} participantes</span>
                      </div>
                      <div>
                        <span>Solicitante: {selectedEvent.requestedBy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  {selectedEvent.resources.length > 0 && (
                    <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                      <h3 className="text-slate-900">Recursos Solicitados</h3>
                      <div className="space-y-2">
                        {selectedEvent.resources.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span className="text-slate-700">{resource.name}</span>
                            <Badge variant={resource.available ? 'default' : 'destructive'}>
                              {resource.available ? 'Disponível' : 'Indisponível'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Approval Timeline */}
                  <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                    <h3 className="text-slate-900">Status de Aprovação</h3>
                    <div className="space-y-3">
                      {selectedEvent.approvals.map((approval, index) => (
                        <div key={approval.department} className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100">
                            {approval.status === 'aprovado' ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : approval.status === 'rejeitado' ? (
                              <XCircle className="w-5 h-5 text-red-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-900">{departmentLabels[approval.department]}</span>
                              <Badge className={statusColors[approval.status]}>
                                {approval.status}
                              </Badge>
                            </div>
                            {approval.approvedBy && (
                              <p className="text-slate-600">
                                Por {approval.approvedBy} em {approval.approvedAt?.toLocaleDateString('pt-BR')}
                              </p>
                            )}
                            {approval.notes && (
                              <p className="text-slate-600 italic">{approval.notes}</p>
                            )}
                          </div>

                          {index < selectedEvent.approvals.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-slate-900">Observações</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Adicione observações sobre a aprovação..."
                      rows={3}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproval(selectedEvent.id, 'cerimonial', true)}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleApproval(selectedEvent.id, 'cerimonial', false)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Checklist Tab */}
              <TabsContent value="checklist">
                <CeremonialChecklist event={selectedEvent} />
              </TabsContent>

              {/* Marketing Tab */}
              <TabsContent value="marketing">
                <MarketingPanel event={selectedEvent} />
              </TabsContent>

              {/* Communication Tab */}
              <TabsContent value="communication">
                <EventComments eventId={selectedEvent.id} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function EventWorkflowCard({ 
  event, 
  onSelect,
  highlightDepartment 
}: { 
  event: Event; 
  onSelect: (event: Event) => void;
  highlightDepartment?: Department;
}) {
  const approvedSteps = event.approvals.filter(a => a.status === 'aprovado').length;
  const totalSteps = event.approvals.length;

  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-slate-900 mb-1">{event.title}</h3>
          <p className="text-slate-600">{event.requestedBy} - {event.department}</p>
        </div>
        <Button size="sm" onClick={() => onSelect(event)}>
          Revisar
        </Button>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {event.approvals.map((approval) => (
          <div
            key={approval.department}
            className={`flex items-center gap-1 px-2 py-1 rounded text-white ${statusColors[approval.status]} ${
              highlightDepartment === approval.department ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {approval.status === 'aprovado' ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : approval.status === 'rejeitado' ? (
              <XCircle className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            <span>{departmentLabels[approval.department]}</span>
          </div>
        ))}
      </div>

      <div className="text-slate-600">
        Progresso: {approvedSteps}/{totalSteps} aprovações
      </div>
    </div>
  );
}