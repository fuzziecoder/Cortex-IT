"use client";

import { Users, UserPlus, ChevronDown, Activity, FolderGit2, Briefcase, Handshake } from "lucide-react";
import { useState } from "react";

interface AdminDashboardClientProps {
  data: {
    stats: {
      contacts: number;
      subscribers: number;
      applications: number;
      projects: number;
      partners: number;
      jobs: number;
    };
    activityMap: Record<number, number>;
  }
}

export default function AdminDashboardClient({ data }: AdminDashboardClientProps) {
  const [chartRange, setChartRange] = useState(15);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  // Build real data for the Bar Chart from the activityMap.
  const today = new Date().getDate();
  const taskProgressMock = [];
  
  for (let i = chartRange - 1; i >= 0; i--) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    const day = d.getDate();
    const value = data.activityMap[day] || 0;
    
    const maxVal = Math.max(...Object.values(data.activityMap), 10); 
    const percentage = value === 0 ? 0 : Math.ceil((value / maxVal) * 100);

    taskProgressMock.push({
      day,
      value: percentage,
      rawCount: value,
      label: value > 0 ? `+${value}` : "0",
      active: i === 0, // Today is active
    });
  }

  // Real data for Calendar: 31 days.
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const count = data.activityMap[day] || 0;
    
    let type = "empty"; 
    if (day === today) type = "active";
    else if (count > 2) type = "filled"; 
    else if (count > 0) type = "disabled"; 
    
    return { day, type, count };
  });

  return (
    <div className="w-full">
      <h1 className="text-3xl font-heading mb-8">Dashboard Overview</h1>
      
      {/* ── Top Cards Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        {/* Total Subscribers Card */}
        <div className="bg-[#141414] border border-white/10 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Users size={18} className="text-gray-400" />
            </div>
            <span className="text-gray-300 font-medium">Subscribers</span>
          </div>
          <div className="mt-6">
            <h2 className="text-5xl font-light text-white mb-2">{data.stats.subscribers}</h2>
            <p className="text-xs text-[#C8F542]">Active Newsletter Audience</p>
          </div>
        </div>

        {/* Total Applicants Card */}
        <div className="bg-[#141414] border border-white/10 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <UserPlus size={18} className="text-gray-400" />
            </div>
            <span className="text-gray-300 font-medium">Applications</span>
          </div>
          <div className="mt-6">
            <h2 className="text-5xl font-light text-white mb-2">{data.stats.applications}</h2>
            <p className="text-xs text-[#C8F542]">Total Resumes Received</p>
          </div>
        </div>

        {/* Total Projects Card */}
        <div className="bg-[#141414] border border-white/10 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <FolderGit2 size={18} className="text-gray-400" />
            </div>
            <span className="text-gray-300 font-medium">Projects</span>
          </div>
          <div className="mt-6">
            <h2 className="text-5xl font-light text-white mb-2">{data.stats.projects}</h2>
            <p className="text-xs text-[#C8F542]">Portfolio Case Studies</p>
          </div>
        </div>

        {/* Total Contacts/Partners Card */}
        <div className="bg-[#141414] border border-white/10 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Handshake size={18} className="text-gray-400" />
            </div>
            <span className="text-gray-300 font-medium">Contacts</span>
          </div>
          <div className="mt-6">
            <h2 className="text-5xl font-light text-white mb-2">{data.stats.contacts}</h2>
            <p className="text-xs text-[#C8F542]">Inbound Service Inquiries</p>
          </div>
        </div>

      </div>

      {/* ── Bottom Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tasks Progress Bar Chart Area */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl lg:col-span-2 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-medium text-white shadow-sm">Application Velocity</h3>
            <div className="relative">
              <select 
                value={chartRange}
                onChange={(e) => setChartRange(Number(e.target.value))}
                className="flex items-center gap-2 text-sm text-gray-400 bg-[#222222] pl-4 pr-8 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors appearance-none outline-none cursor-pointer z-20"
              >
                <option value={7}>Past 7 Days</option>
                <option value={15}>Past 15 Days</option>
                <option value={30}>Past 30 Days</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto scrollbar-hide pb-2">
            <div className="flex items-end justify-between h-[280px] min-w-max gap-4 pt-12 px-2">
              {taskProgressMock.map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-end h-full group relative min-w-[2.5rem]">
                  {/* Bubble label */}
                  {item.active ? (
                    <div className="absolute -top-12 bg-[#C8F542] text-black text-sm font-bold py-1.5 px-3 rounded-full z-10 shadow-[0_0_15px_rgba(200,245,66,0.2)] whitespace-nowrap">
                      {item.rawCount} New
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-solid border-t-[#C8F542] border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                    </div>
                  ) : (
                    <div className="absolute -top-8 text-[11px] font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {item.rawCount} app(s)
                    </div>
                  )}
                  
                  {/* Bar */}
                  <div 
                    className={`w-8 md:w-10 rounded-full transition-all duration-500 ease-out relative ${
                      item.active 
                        ? "bg-[#C8F542]" 
                        : "bg-[#222222] group-hover:bg-[#333333]"
                    }`}
                    style={{ height: `${Math.max(item.value, 15)}%` }} // Dynamic minimum height
                  >
                    {item.active && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#C8F542] rounded-full border-[3px] border-[#141414]"></div>
                    )}
                  </div>
                  
                  {/* X Axis Label */}
                  <span className={`mt-6 text-sm ${item.active ? "text-[#C8F542] font-medium" : "text-gray-500"}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Working Days Calendar Area */}
        <div className="bg-[#141414] border border-white/10 p-8 rounded-3xl flex flex-col">
          <h3 className="text-xl font-medium text-white mb-6">Monthly Insights</h3>
          
          <div className="flex items-center justify-between mb-8 pb-2">
            <div className="relative">
              <select 
                className="flex items-center gap-2 text-sm text-gray-400 bg-transparent pr-6 transition-colors appearance-none outline-none cursor-pointer hover:text-white"
              >
                <option value="applications" className="bg-[#141414]">Application Heatmap</option>
                <option value="contacts" className="bg-[#141414]">Contact Heatmap</option>
                <option value="subscribers" className="bg-[#141414]">Subscriber Heatmap</option>
              </select>
              <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <Activity className="text-[#C8F542]" size={18} />
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 mb-4 place-items-center">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs text-gray-500 font-medium">{day}</span>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-4 gap-x-2 place-items-center flex-1">
            {calendarDays.map((date, i) => {
              
              const baseClass = "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm transition-colors cursor-pointer select-none font-medium";
              
              let styleClass = "";
              if (date.type === "empty") {
                styleClass = "bg-[#1a1a1a] opacity-40 hover:bg-white/5 text-xs text-gray-600";
              } else if (date.type === "disabled") {
                styleClass = "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5";
              } else if (date.type === "filled") {
                styleClass = "text-black border shadow-[0_0_15px_rgba(200,245,66,0.3)] bg-gradient-to-tr from-[#9bce19] to-[#C8F542]";
              } else if (date.type === "active") {
                styleClass = "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] border-2 border-[#141414] ring-2 ring-white";
              }

              const isSelected = selectedDate === date.day;

              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedDate(date.day)}
                  className={`${baseClass} ${styleClass} ${isSelected && date.type !== 'active' ? 'ring-2 ring-[#C8F542] ring-offset-2 ring-offset-[#141414]' : ''}`}
                >
                  {date.day}
                </div>
              );
            })}
          </div>

          {/* Dynamic Selection Popover Data */}
          {selectedDate && (
            <div className="mt-8 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300 flex items-center justify-between">
               <div>
                 <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Date: {selectedDate}th</span>
                 <p className="text-sm text-gray-300">
                    <strong className="text-white text-lg font-medium mr-2">
                      {calendarDays.find(d => d.day === selectedDate)?.count || 0}
                    </strong> 
                    application(s) received.
                 </p>
               </div>
               <button 
                  onClick={() => setSelectedDate(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 transition-colors"
               >
                 ✕
               </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
