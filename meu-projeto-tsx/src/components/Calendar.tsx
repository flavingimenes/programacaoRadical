import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockEvents } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronLeft, ChevronRight, MapPin, Users, Clock, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { EventType, EventStatus } from '../types/event';

const eventTypeColors = {
  academico: 'bg-blue-500',
  institucional: 'bg-purple-500',
  cultural: 'bg-pink-500',
  extensao: 'bg-green-500',
  cientifico: 'bg-orange-500'
};

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<EventStatus | 'all'>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Ajustar para começar na segunda-feira
  const startDayOfWeek = monthStart.getDay();
  const daysToAdd = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(calendarStart.getDate() - daysToAdd);

  const calendarDays: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(calendarStart);
    day.setDate(day.getDate() + i);
    calendarDays.push(day);
  }

  const filteredEvents = mockEvents.filter(event => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    if (filterStatus !== 'all' && event.status !== filterStatus) return false;
    if (filterDepartment !== 'all' && event.department !== filterDepartment) return false;
    return true;
  });

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      return day >= eventStart && day <= eventEnd;
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDay(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>
              {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(new Date())}
              >
                Hoje
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="space-y-1">
              <label className="text-slate-600 flex items-center gap-2">
                <Filter className="w-3 h-3" />
                Tipo de Evento
              </label>
              <Select value={filterType} onValueChange={(value) => setFilterType(value as EventType | 'all')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="academico">Acadêmico</SelectItem>
                  <SelectItem value="institucional">Institucional</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="extensao">Extensão</SelectItem>
                  <SelectItem value="cientifico">Científico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 flex items-center gap-2">
                <Filter className="w-3 h-3" />
                Status
              </label>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as EventStatus | 'all')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="aguardando_pro_reitoria">Aguardando Pró-Reitoria</SelectItem>
                  <SelectItem value="aguardando_cerimonial">Aguardando Cerimonial</SelectItem>
                  <SelectItem value="aguardando_audiovisual">Aguardando Audiovisual</SelectItem>
                  <SelectItem value="aguardando_marketing">Aguardando Marketing</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="em_execucao">Em Execução</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 flex items-center gap-2">
                <Filter className="w-3 h-3" />
                Departamento
              </label>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Engenharia Civil">Engenharia Civil</SelectItem>
                  <SelectItem value="Medicina">Medicina</SelectItem>
                  <SelectItem value="Ciência da Computação">Ciência da Computação</SelectItem>
                  <SelectItem value="Pró-Reitoria de Pesquisa">Pró-Reitoria de Pesquisa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {/* Week days header */}
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
              <div key={day} className="text-center p-2 text-slate-600">
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    min-h-20 p-1 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors
                    ${!isCurrentMonth ? 'bg-slate-50 text-slate-400' : 'bg-white'}
                    ${isSelected ? 'ring-2 ring-blue-500' : ''}
                    ${isToday ? 'border-blue-500' : ''}
                  `}
                >
                  <div className={`text-right mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-white text-[10px] p-0.5 rounded truncate ${eventTypeColors[event.type]}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-slate-600">
                        +{dayEvents.length - 2} mais
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500"></div>
              <span className="text-slate-600">Acadêmico</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-purple-500"></div>
              <span className="text-slate-600">Institucional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-pink-500"></div>
              <span className="text-slate-600">Cultural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-slate-600">Extensão</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span className="text-slate-600">Científico</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events for selected date */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Selecione uma data'}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length} evento(s) neste dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-slate-900">{event.title}</h4>
                    <Badge className={eventTypeColors[event.type]}>
                      {event.type}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600">{event.description}</p>
                  
                  <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {format(event.startDate, 'dd/MM')} - {format(event.endDate, 'dd/MM')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.expectedAttendees} participantes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              {selectedDate 
                ? 'Nenhum evento agendado para esta data'
                : 'Clique em uma data para ver os eventos'
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}