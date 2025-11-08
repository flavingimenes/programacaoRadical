import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockEvents } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Calendar, Users, Clock, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Progress } from './ui/progress';

const statusColors = {
  rascunho: 'bg-slate-500',
  aguardando_pro_reitoria: 'bg-yellow-500',
  aguardando_cerimonial: 'bg-blue-500',
  aguardando_audiovisual: 'bg-purple-500',
  aguardando_marketing: 'bg-pink-500',
  aprovado: 'bg-green-500',
  em_execucao: 'bg-orange-500',
  concluido: 'bg-emerald-500',
  cancelado: 'bg-red-500'
};

const statusLabels = {
  rascunho: 'Rascunho',
  aguardando_pro_reitoria: 'Aguardando Pró-Reitoria',
  aguardando_cerimonial: 'Aguardando Cerimonial',
  aguardando_audiovisual: 'Aguardando Audiovisual',
  aguardando_marketing: 'Aguardando Marketing',
  aprovado: 'Aprovado',
  em_execucao: 'Em Execução',
  concluido: 'Concluído',
  cancelado: 'Cancelado'
};

export function Dashboard() {
  const totalEvents = mockEvents.length;
  const pendingApproval = mockEvents.filter(e => e.status.startsWith('aguardando')).length;
  const approved = mockEvents.filter(e => e.status === 'aprovado').length;
  const totalAttendees = mockEvents.reduce((sum, e) => sum + e.expectedAttendees, 0);

  const upcomingEvents = mockEvents
    .filter(e => e.startDate > new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total de Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{totalEvents}</div>
            <p className="text-muted-foreground">eventos cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Aguardando Aprovação</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{pendingApproval}</div>
            <p className="text-muted-foreground">em análise</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Aprovados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{approved}</div>
            <p className="text-muted-foreground">prontos para execução</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Participantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-slate-900">{totalAttendees}</div>
            <p className="text-muted-foreground">previstos total</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
          <CardDescription>Eventos agendados para os próximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const approvedSteps = event.approvals.filter(a => a.status === 'aprovado').length;
              const totalSteps = event.approvals.length;
              const progress = (approvedSteps / totalSteps) * 100;

              return (
                <div key={event.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1">{event.title}</h3>
                      <p className="text-slate-600">{event.description}</p>
                    </div>
                    <Badge className={statusColors[event.status]}>
                      {statusLabels[event.status]}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.startDate.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.expectedAttendees} participantes</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Progresso de Aprovação</span>
                      <span>{approvedSteps}/{totalSteps} setores</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="flex gap-2 mt-3 flex-wrap">
                    {event.requiresCeremony && (
                      <Badge variant="outline">Cerimonial</Badge>
                    )}
                    {event.requiresAudiovisual && (
                      <Badge variant="outline">Audiovisual</Badge>
                    )}
                    {event.requiresMarketing && (
                      <Badge variant="outline">Marketing</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Department Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Status por Setor</CardTitle>
            <CardDescription>Solicitações pendentes em cada departamento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: 'Pró-Reitoria', pending: mockEvents.filter(e => e.status === 'aguardando_pro_reitoria').length },
                { dept: 'Cerimonial', pending: mockEvents.filter(e => e.status === 'aguardando_cerimonial').length },
                { dept: 'Audiovisual', pending: mockEvents.filter(e => e.status === 'aguardando_audiovisual').length },
                { dept: 'Marketing', pending: mockEvents.filter(e => e.status === 'aguardando_marketing').length }
              ].map((item) => (
                <div key={item.dept} className="flex items-center justify-between">
                  <span className="text-slate-700">{item.dept}</span>
                  <div className="flex items-center gap-2">
                    {item.pending > 0 ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-slate-900">{item.pending} pendente(s)</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-slate-600">Em dia</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Eventos</CardTitle>
            <CardDescription>Distribuição por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Acadêmico', count: mockEvents.filter(e => e.type === 'academico').length, color: 'bg-blue-500' },
                { type: 'Institucional', count: mockEvents.filter(e => e.type === 'institucional').length, color: 'bg-purple-500' },
                { type: 'Cultural', count: mockEvents.filter(e => e.type === 'cultural').length, color: 'bg-pink-500' },
                { type: 'Extensão', count: mockEvents.filter(e => e.type === 'extensao').length, color: 'bg-green-500' },
                { type: 'Científico', count: mockEvents.filter(e => e.type === 'cientifico').length, color: 'bg-orange-500' }
              ].map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between text-slate-700">
                    <span>{item.type}</span>
                    <span>{item.count}</span>
                  </div>
                  <Progress value={(item.count / totalEvents) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
