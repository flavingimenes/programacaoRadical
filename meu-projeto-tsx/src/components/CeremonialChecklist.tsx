import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button.tsx';
import { Progress } from './ui/progress';
import { ClipboardList, Calendar, AlertCircle } from 'lucide-react';
import type { Event } from '../types/event';

interface ChecklistTask {
  id: string;
  title: string;
  category: 'pre_evento' | 'durante_evento' | 'pos_evento';
  completed: boolean;
  daysBeforeEvent: number;
  deadline?: Date;
}

const generateChecklist = (event: Event): ChecklistTask[] => {
  const eventDate = new Date(event.startDate);
  
  const tasks: ChecklistTask[] = [
    // Pré-evento
    {
      id: 'check_location',
      title: 'Verificar disponibilidade do local',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 30,
      deadline: new Date(eventDate.getTime() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'reserve_equipment',
      title: 'Reservar equipamentos necessários (projetores, microfones, etc.)',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 25,
      deadline: new Date(eventDate.getTime() - 25 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'confirm_catering',
      title: 'Confirmar serviço de coffee break/catering',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 20,
      deadline: new Date(eventDate.getTime() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'setup_seating',
      title: 'Organizar disposição de cadeiras e mesas',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 15,
      deadline: new Date(eventDate.getTime() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'prepare_materials',
      title: 'Preparar materiais (crachás, certificados, pastas)',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 10,
      deadline: new Date(eventDate.getTime() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'coordinate_staff',
      title: 'Coordenar equipe de apoio e recepcionistas',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 7,
      deadline: new Date(eventDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'test_equipment',
      title: 'Testar todos os equipamentos audiovisuais',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 3,
      deadline: new Date(eventDate.getTime() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'final_inspection',
      title: 'Inspeção final do local e setup',
      category: 'pre_evento',
      completed: false,
      daysBeforeEvent: 1,
      deadline: new Date(eventDate.getTime() - 1 * 24 * 60 * 60 * 1000)
    },
    
    // Durante evento
    {
      id: 'reception_setup',
      title: 'Montar recepção e credenciamento',
      category: 'durante_evento',
      completed: false,
      daysBeforeEvent: 0,
      deadline: eventDate
    },
    {
      id: 'guest_reception',
      title: 'Recepcionar convidados e autoridades',
      category: 'durante_evento',
      completed: false,
      daysBeforeEvent: 0,
      deadline: eventDate
    },
    {
      id: 'ceremony_coordination',
      title: 'Coordenar protocolo e cerimônia',
      category: 'durante_evento',
      completed: false,
      daysBeforeEvent: 0,
      deadline: eventDate
    },
    {
      id: 'monitor_logistics',
      title: 'Monitorar logística durante o evento',
      category: 'durante_evento',
      completed: false,
      daysBeforeEvent: 0,
      deadline: eventDate
    },
    
    // Pós-evento
    {
      id: 'collect_feedback',
      title: 'Coletar feedback dos participantes',
      category: 'pos_evento',
      completed: false,
      daysBeforeEvent: -1,
      deadline: new Date(eventDate.getTime() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'return_equipment',
      title: 'Devolver equipamentos e materiais',
      category: 'pos_evento',
      completed: false,
      daysBeforeEvent: -1,
      deadline: new Date(eventDate.getTime() + 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'final_report',
      title: 'Elaborar relatório final do evento',
      category: 'pos_evento',
      completed: false,
      daysBeforeEvent: -3,
      deadline: new Date(eventDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    }
  ];
  
  return tasks;
};

const categoryLabels = {
  pre_evento: 'Pré-Evento',
  durante_evento: 'Durante o Evento',
  pos_evento: 'Pós-Evento'
};

export function CeremonialChecklist({ event }: { event: Event }) {
  const [tasks, setTasks] = useState<ChecklistTask[]>(generateChecklist(event));

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  const isOverdue = (deadline?: Date) => {
    if (!deadline) return false;
    return new Date() > deadline;
  };

  const tasksByCategory = {
    pre_evento: tasks.filter(t => t.category === 'pre_evento'),
    durante_evento: tasks.filter(t => t.category === 'durante_evento'),
    pos_evento: tasks.filter(t => t.category === 'pos_evento')
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Checklist de Tarefas Logísticas
            </CardTitle>
            <CardDescription>
              Gerenciamento automático de demandas para {event.title}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-slate-900">{completedTasks}/{totalTasks}</div>
            <p className="text-slate-600">tarefas concluídas</p>
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-slate-900 flex items-center gap-2">
              {categoryLabels[category as keyof typeof categoryLabels]}
              <Badge variant="outline">
                {categoryTasks.filter(t => t.completed).length}/{categoryTasks.length}
              </Badge>
            </h3>
            
            <div className="space-y-2">
              {categoryTasks.map((task) => {
                const overdue = !task.completed && isOverdue(task.deadline);
                
                return (
                  <div 
                    key={task.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      task.completed 
                        ? 'bg-green-50 border-green-200' 
                        : overdue 
                          ? 'bg-red-50 border-red-200'
                          : 'bg-white border-slate-200'
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <div className={`${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                        {task.title}
                      </div>
                      
                      {task.deadline && (
                        <div className="flex items-center gap-2 mt-1">
                          {overdue && <AlertCircle className="w-3 h-3 text-red-600" />}
                          <span className={`text-slate-600 ${overdue ? 'text-red-600' : ''}`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Prazo: {task.deadline.toLocaleDateString('pt-BR')}
                            {overdue && ' - ATRASADO'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {task.completed && (
                      <Badge className="bg-green-600">Concluído</Badge>
                    )}
                    {overdue && !task.completed && (
                      <Badge className="bg-red-600">Atrasado</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
