import React from "react";
import { useAdminAppointments } from "@/hooks/useAdminAppointments";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { api } from "@/lib/api";
import { CalendarClock, History, Archive, Menu, X, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/lib/LocaleContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Appointment {
  _id: string;
  customerId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
  };
  staffId: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  startAt: string;
  endAt: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string | null;
  is_rescheduled?: boolean;
}

export default function AdminDashboard() {
  const { data, isLoading, error, refetch } = useAdminAppointments();

  const { signOut } = useAuth();
  const { t, locale, setLocale } = useLocale();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const handleLogout = async () => {
    await signOut();
    // No need to navigate here as it's handled in AuthContext
  };

  const handleMarkDone = async (id: string) => {
    try {
      await api.updateAppointment(id, { status: 'completed' });
      await refetch();
    } catch (e) {
      console.error('Failed to mark appointment as completed', e);
    }
  };

  const [view, setView] = React.useState<'scheduled' | 'rescheduled' | 'old'>('scheduled');

  return (
    <div className="container mx-auto p-4 md:p-6" style={{ background: '#F9F6F3' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ color: '#1C352D' }}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          )}
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#1C352D' }}>{t('dashboard.admin.title')}</h2>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" style={{ color: '#1C352D', background: '#F5C9B0' }}>
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={{ background: '#F9F6F3', borderColor: '#A6B28B' }}>
              <DropdownMenuItem onClick={() => setLocale("en")} style={locale === "en" ? { background: '#A6B28B', color: '#1C352D' } : {}}>
                <span role="img" aria-label="English" className="mr-2">🇬🇧</span> English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale("fr")} style={locale === "fr" ? { background: '#A6B28B', color: '#1C352D' } : {}}>
                <span role="img" aria-label="Français" className="mr-2">🇫🇷</span> Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocale("ar")} style={locale === "ar" ? { background: '#A6B28B', color: '#1C352D' } : {}}>
                <span role="img" aria-label="العربية" className="mr-2">🇹🇳</span> العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleLogout} variant="outline" size="sm" style={{ color: '#1C352D', borderColor: '#A6B28B' }}>{t('header.logout')}</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className={`md:col-span-3 lg:col-span-2 ${
          isMobile ? (sidebarOpen ? 'block' : 'hidden') : 'block'
        }`}>
          <div className="sticky top-4 space-y-2 rounded-lg border p-3" style={{ background: '#F9F6F3', borderColor: '#A6B28B' }}>
            <Button
              variant={view === 'scheduled' ? 'default' : 'ghost'}
              className="w-full justify-start"
              style={view === 'scheduled' ? { background: '#1C352D', color: '#F9F6F3' } : { color: '#1C352D', background: '#F5C9B0' }}
              onClick={() => {
                setView('scheduled');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <CalendarClock className="w-4 h-4 mr-2" /> {t('dashboard.admin.sidebar.scheduled')}
            </Button>
            <Button
              variant={view === 'rescheduled' ? 'default' : 'ghost'}
              className="w-full justify-start"
              style={view === 'rescheduled' ? { background: '#1C352D', color: '#F9F6F3' } : { color: '#1C352D', background: '#F5C9B0' }}
              onClick={() => {
                setView('rescheduled');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <History className="w-4 h-4 mr-2" /> {t('dashboard.admin.sidebar.rescheduled')}
            </Button>
            <Button
              variant={view === 'old' ? 'default' : 'ghost'}
              className="w-full justify-start"
              style={view === 'old' ? { background: '#1C352D', color: '#F9F6F3' } : { color: '#1C352D', background: '#F5C9B0' }}
              onClick={() => {
                setView('old');
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <Archive className="w-4 h-4 mr-2" /> {t('dashboard.admin.sidebar.old')}
            </Button>
          </div>
        </aside>
        {/* Main content */}
        <main className="md:col-span-9 lg:col-span-10">
          {isLoading && <div style={{ color: '#A6B28B' }}>{t('dashboard.admin.loading')}</div>}
          {error && <div style={{ color: '#F5C9B0' }}>{t('dashboard.admin.error')}</div>}
          {data && (() => {
            const all = (data as Appointment[]);
            const scheduled = all.filter((r) => r.status === 'scheduled' && !r.is_rescheduled);
            const rescheduled = all.filter((r) => r.status === 'scheduled' && r.is_rescheduled);
            const completed = all.filter((r) => r.status === 'completed');

            if (view === 'scheduled') {
              return (
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#1C352D' }}>{t('dashboard.admin.sections.scheduled')}</h3>
                  <div className="rounded-lg border border-zinc-200 bg-white shadow-sm overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-zinc-50">
                          <TableHead className="text-zinc-700">{t('dashboard.admin.table.id')}</TableHead>
                          <TableHead className="text-zinc-700">{t('dashboard.admin.table.customer')}</TableHead>
                          <TableHead className="text-zinc-700">{t('dashboard.admin.table.contact')}</TableHead>

                          <TableHead className="text-zinc-700">{t('dashboard.admin.table.datetime')}</TableHead>
                          <TableHead className="text-zinc-700">{t('dashboard.admin.table.status')}</TableHead>
                          <TableHead className="text-zinc-700">{t('dashboard.admin.table.actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scheduled.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-zinc-500">{t('dashboard.admin.empty.scheduled')}</TableCell>
                          </TableRow>
                        ) : (
                          scheduled.map((row) => (
                            <TableRow key={row._id} className="hover:bg-zinc-50">
                              <TableCell className="font-medium text-zinc-900">#{row._id}</TableCell>
                              <TableCell className="text-zinc-700">
                                {row.customerId?.firstName} {row.customerId?.lastName}
                              </TableCell>
                              <TableCell>
                                <div className="text-zinc-700">{row.customerId?.email}</div>
                                <div className="text-sm text-zinc-500">{row.customerId?.phone || t('dashboard.admin.na')}</div>
                              </TableCell>

                              <TableCell>
                                <div className="text-zinc-700">{new Date(row.startAt).toLocaleDateString()}</div>
                                <div className="text-sm text-zinc-500">
                                  {new Date(row.startAt).toLocaleTimeString()} - {new Date(row.endAt).toLocaleTimeString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                                  ${row.status === 'scheduled' ? 'bg-indigo-100 text-indigo-800' : 
                                    row.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 
                                    row.status === 'cancelled' ? 'bg-rose-100 text-rose-800' : 
                                    'bg-zinc-100 text-zinc-800'}`}>
                                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  variant="secondary" 
                                  onClick={() => handleMarkDone(row._id)}
                                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                                >
                                  {t('dashboard.admin.actions.done')}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              );
            }

            if (view === 'rescheduled') {
              return (
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#1C352D' }}>{t('dashboard.admin.sections.rescheduled')}</h3>
                  <div className="rounded-lg border bg-white overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('dashboard.admin.table.id')}</TableHead>
                          <TableHead>{t('dashboard.admin.table.customer')}</TableHead>
                          <TableHead>{t('dashboard.admin.table.contact')}</TableHead>

                          <TableHead>{t('dashboard.admin.table.datetime')}</TableHead>
                          <TableHead>{t('dashboard.admin.table.status')}</TableHead>
                          <TableHead>{t('dashboard.admin.table.actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rescheduled.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-muted-foreground">{t('dashboard.admin.empty.rescheduled')}</TableCell>
                          </TableRow>
                        ) : (
                          rescheduled.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell className="font-medium">#{row._id}</TableCell>
                              <TableCell>
                                {row.customerId?.firstName} {row.customerId?.lastName}
                              </TableCell>
                              <TableCell>
                                <div>{row.customerId?.email}</div>
                                <div className="text-sm text-muted-foreground">{row.customerId?.phone || t('dashboard.admin.na')}</div>
                              </TableCell>

                              <TableCell>
                                <div>{new Date(row.startAt).toLocaleDateString()}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(row.startAt).toLocaleTimeString()} - {new Date(row.endAt).toLocaleTimeString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                                  ${row.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                                    row.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                    row.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                    'bg-gray-100 text-gray-800'}`}>
                                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="secondary" onClick={() => handleMarkDone(row._id)}>
                                  {t('dashboard.admin.actions.done')}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              );
            }

            // Old/completed view
            const groups = completed.reduce((acc: Record<string, Appointment[]>, appt) => {
              const d = new Date(appt.startAt);
              const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
              acc[key] = acc[key] || [];
              acc[key].push(appt);
              return acc;
            }, {} as Record<string, Appointment[]>);

            const dayKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

            return (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold" style={{ color: '#1C352D' }}>{t('dashboard.admin.sections.oldByDay')}</h3>
                {completed.length === 0 ? (
                  <div className="text-muted-foreground">{t('dashboard.admin.empty.completed')}</div>
                ) : (
                  dayKeys.map((day) => {
                    const list = groups[day].slice().sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
                    const displayDate = new Date(day + 'T00:00:00').toLocaleDateString();
                    return (
                      <div key={day}>
                        <h4 className="font-medium mb-2">{displayDate}</h4>
                        <div className="rounded-lg border bg-white overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>{t('dashboard.admin.table.id')}</TableHead>
                                <TableHead>{t('dashboard.admin.table.customer')}</TableHead>

                                <TableHead>{t('dashboard.admin.table.time')}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {list.map((row) => (
                                <TableRow key={row._id}>
                                  <TableCell className="font-medium">#{row._id}</TableCell>
                                  <TableCell>{row.customerId?.firstName} {row.customerId?.lastName}</TableCell>

                                  <TableCell>
                                    {new Date(row.startAt).toLocaleTimeString()} - {new Date(row.endAt).toLocaleTimeString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })()}
        </main>
      </div>
    </div>
  );
}
