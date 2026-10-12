import React, { useState } from 'react';
import {
  KanbanSquare,
  ListTodo,
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  FileCheck2,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  Edit3,
} from 'lucide-react';
import {
  ApplicationTrackerItem,
  ApplicationStatus,
  Opportunity,
} from '../types';

interface ApplicationTrackerViewProps {
  trackerItems: ApplicationTrackerItem[];
  opportunities: Opportunity[];
  onUpdateTrackerItem: (item: ApplicationTrackerItem) => void;
  onRemoveTrackerItem: (itemId: string) => void;
  onOpenReport: (oppId: string) => void;
}

const STATUS_COLUMNS: { id: ApplicationStatus; label: string; color: string }[] = [
  { id: 'saved', label: 'Saved', color: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300' },
  { id: 'researching', label: 'Researching', color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300' },
  { id: 'preparing', label: 'Preparing', color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300' },
  { id: 'submitted', label: 'Submitted', color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300' },
  { id: 'accepted', label: 'Accepted', color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300' },
  { id: 'rejected', label: 'Decided', color: 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400' },
];

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  trackerItems,
  opportunities,
  onUpdateTrackerItem,
  onRemoveTrackerItem,
  onOpenReport,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<string | null>(
    trackerItems[0]?.id || null
  );

  const [newChecklistText, setNewChecklistText] = useState('');

  // Map opportunity helper
  const getOpp = (oppId: string) => opportunities.find((o) => o.id === oppId);

  // Active selected item for detailed right-side drawer/modal
  const activeItem = trackerItems.find((i) => i.id === selectedItemForEdit);
  const activeOpp = activeItem ? getOpp(activeItem.opportunityId) : null;

  const handleStatusChange = (item: ApplicationTrackerItem, newStatus: ApplicationStatus) => {
    onUpdateTrackerItem({
      ...item,
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  const handleToggleChecklist = (
    item: ApplicationTrackerItem,
    chkId: string
  ) => {
    const updatedChecklist = item.checklist.map((chk) =>
      chk.id === chkId ? { ...chk, completed: !chk.completed } : chk
    );
    onUpdateTrackerItem({
      ...item,
      checklist: updatedChecklist,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  const handleAddChecklistItem = (item: ApplicationTrackerItem) => {
    if (!newChecklistText.trim()) return;
    const newItem = {
      id: `chk-${Date.now()}`,
      label: newChecklistText.trim(),
      completed: false,
    };
    onUpdateTrackerItem({
      ...item,
      checklist: [...item.checklist, newItem],
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    setNewChecklistText('');
  };

  const handleUpdateNotes = (item: ApplicationTrackerItem, notes: string) => {
    onUpdateTrackerItem({
      ...item,
      notes,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  // Sort applications by urgency (nearest deadline first)
  const sortedItems = [...trackerItems].sort((a, b) => {
    const oppA = getOpp(a.opportunityId);
    const oppB = getOpp(b.opportunityId);
    if (!oppA || !oppB) return 0;
    return new Date(oppA.deadlineDate).getTime() - new Date(oppB.deadlineDate).getTime();
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
              Pipeline Management
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Sorted by Deadline Urgency
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
            Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Track submissions, application document checklists, and personal strategic notes.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center gap-1 border border-black/[0.04] dark:border-white/[0.04]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Board View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Timeline List
            </button>
          </div>
        </div>
      </div>

      {trackerItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.06] space-y-3">
          <KanbanSquare size={32} className="text-neutral-400 mx-auto" />
          <h3 className="font-semibold text-base text-neutral-900 dark:text-white">
            No tracked applications yet
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Browse the Discover tab and click the bookmark icon on any opportunity card to start your pipeline.
          </p>
        </div>
      ) : viewMode === 'kanban' ? (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STATUS_COLUMNS.map((col) => {
            const itemsInCol = trackerItems.filter((i) => i.status === col.id);

            return (
              <div
                key={col.id}
                className="rounded-3xl bg-neutral-50/70 dark:bg-neutral-900/40 border border-black/[0.05] dark:border-white/[0.06] p-4 flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.05] dark:border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${col.color}`}>
                        {col.label}
                      </span>
                      <span className="text-xs font-medium text-neutral-400">
                        {itemsInCol.length}
                      </span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-3">
                    {itemsInCol.map((item) => {
                      const opp = getOpp(item.opportunityId);
                      if (!opp) return null;

                      const completedCount = item.checklist.filter((c) => c.completed).length;
                      const totalCount = item.checklist.length;
                      const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 hover:border-blue-500/40 transition"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                                {opp.organizer}
                              </span>
                              <h4
                                onClick={() => setSelectedItemForEdit(item.id)}
                                className="font-bold text-sm text-neutral-900 dark:text-white hover:text-blue-600 transition cursor-pointer"
                              >
                                {opp.title}
                              </h4>
                            </div>

                            <button
                              onClick={() => onRemoveTrackerItem(item.id)}
                              className="text-neutral-400 hover:text-rose-500 transition p-1"
                              title="Remove application"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          {/* Deadline */}
                          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                            <Clock size={12} className="text-neutral-400" />
                            <span>Deadline: <strong className="text-neutral-800 dark:text-neutral-200">{opp.deadline}</strong></span>
                          </div>

                          {/* Checklist progress */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-neutral-500">
                              <span>Checklist Progress</span>
                              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                                {completedCount}/{totalCount} ({progressPct}%)
                              </span>
                            </div>
                            <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>

                          {/* Move status dropdown */}
                          <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(item, e.target.value as ApplicationStatus)}
                              className="text-[11px] font-medium px-2 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-black/[0.04] dark:border-white/[0.06] cursor-pointer"
                            >
                              {STATUS_COLUMNS.map((s) => (
                                <option key={s.id} value={s.id}>
                                  Move to: {s.label}
                                </option>
                              ))}
                            </select>

                            <button
                              onClick={() => onOpenReport(opp.id)}
                              className="text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Evidence Report
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TIMELINE LIST VIEW */
        <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm divide-y divide-black/[0.04] dark:divide-white/[0.04]">
          {sortedItems.map((item) => {
            const opp = getOpp(item.opportunityId);
            if (!opp) return null;

            const completedCount = item.checklist.filter((c) => c.completed).length;
            const totalCount = item.checklist.length;

            return (
              <div
                key={item.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-neutral-400 uppercase">
                      {opp.organizer}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                      {opp.category}
                    </span>
                  </div>
                  <h3
                    onClick={() => setSelectedItemForEdit(item.id)}
                    className="font-bold text-base text-neutral-900 dark:text-white hover:text-blue-600 transition cursor-pointer"
                  >
                    {opp.title}
                  </h3>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-3">
                    <span>Deadline: <strong className="text-neutral-800 dark:text-neutral-200">{opp.deadline}</strong></span>
                    <span>•</span>
                    <span>Checklist: {completedCount}/{totalCount} tasks completed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item, e.target.value as ApplicationStatus)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] cursor-pointer"
                  >
                    {STATUS_COLUMNS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setSelectedItemForEdit(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium"
                  >
                    Details & Checklist
                  </button>

                  <button
                    onClick={() => onRemoveTrackerItem(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Application Modal / Drawer when an item is clicked */}
      {activeItem && activeOpp && (
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase">
                Active Application Pipeline
              </span>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {activeOpp.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeOpp.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition inline-flex items-center gap-1"
              >
                <span>Open Application Portal</span>
                <ExternalLink size={12} />
              </a>
              <button
                onClick={() => onOpenReport(activeOpp.id)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
              >
                Evidence Report
              </button>
            </div>
          </div>

          {/* Checklist Management */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              Application Document Checklist
            </h4>

            <div className="space-y-2">
              {activeItem.checklist.map((chk) => (
                <label
                  key={chk.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.04] dark:border-white/[0.04] text-xs text-neutral-800 dark:text-neutral-200 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                >
                  <input
                    type="checkbox"
                    checked={chk.completed}
                    onChange={() => handleToggleChecklist(activeItem, chk.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className={chk.completed ? 'line-through text-neutral-400' : 'font-medium'}>
                    {chk.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Add new checklist item input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                placeholder="Add custom task (e.g. Schedule guidance counselor interview)..."
                className="flex-1 px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddChecklistItem(activeItem);
                  }
                }}
              />
              <button
                onClick={() => handleAddChecklistItem(activeItem)}
                className="px-3 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium cursor-pointer"
              >
                Add Task
              </button>
            </div>
          </div>

          {/* Strategic Application Notes */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              Application Strategy & Personal Notes
            </h4>
            <textarea
              rows={3}
              value={activeItem.notes}
              onChange={(e) => handleUpdateNotes(activeItem, e.target.value)}
              placeholder="Record essay themes, recommenders contacted, or specific questions..."
              className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/[0.08] dark:border-white/[0.08] text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
