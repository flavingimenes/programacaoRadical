import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, BellOff, CheckCheck, Calendar, MessageSquare, AlertCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Notification {
  id: string;
  type: 'approval' | 'comment' | 'deadline' | 'alert';
  title: string;
  message: string;
  eventTitle: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Evento Aprovado',
    message: 'Pró-Reitoria aprovou sua solicitação',
    eventTitle: 'Semana de Engenharia 2025',
    timestamp: new Date('2025-11-01T10:30:00'),
    read: false
  },
  {
    id: '2',
    type: 'comment',
    title: 'Novo Comentário',
    message: 'Ana Paula comentou no evento',
    eventTitle: 'Semana de Engenharia 2025',
    timestamp: new Date('2025-11-02T14:15:00'),
    read: false
  },
  {
    id: '3',
    type: 'deadline',
    title: 'Prazo Próximo',
    message: 'Deadline de aprovação de layouts em 3 dias',
    eventTitle: 'Colação de Grau - Medicina',
    timestamp: new Date('2025-11-03T09:00:00'),
    read: false
  },
  {
    id: '4',
    type: 'alert',
    title: 'Recurso Indisponível',
    message: 'Auditório Principal não está disponível na data',
    eventTitle: 'Simpósio de Pesquisa Científica',
    timestamp: new Date('2025-11-04T11:45:00'),
    read: true
  },
  {
    id: '5',
    type: 'approval',
    title: 'Aguardando Aprovação',
    message: 'Seu evento está aguardando análise do Cerimonial',
    eventTitle: 'Semana de Engenharia 2025',
    timestamp: new Date('2025-11-05T08:20:00'),
    read: true
  }
];

const notificationIcons = {
  approval: CheckCheck,
  comment: MessageSquare,
  deadline: Calendar,
  alert: AlertCircle
};

const notificationColors = {
  approval: 'text-green-600',
  comment: 'text-blue-600',
  deadline: 'text-yellow-600',
  alert: 'text-red-600'
};

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative gap-2">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-slate-900">Notificações</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="gap-2"
              >
                <CheckCheck className="w-4 h-4" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-slate-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 ${notificationColors[notification.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-slate-900">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-slate-600 mb-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-slate-600">
                          {notification.eventTitle}
                        </Badge>
                        <span className="text-slate-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500">
              <BellOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma notificação</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes}m atrás`;
  } else if (hours < 24) {
    return `${hours}h atrás`;
  } else if (days < 7) {
    return `${days}d atrás`;
  } else {
    return date.toLocaleDateString('pt-BR');
  }
}
