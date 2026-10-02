import React from "react";
import {
  Users,
  DollarSign,
  Clock,
  FileText,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Bell,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  UserCheck,
  CreditCard,
  CalendarDays,
  Clock3,
  BarChart2,
  Settings,
  UserPlus,
} from "lucide-react";
import { LogoIcon } from "./Logo";

export function HeroLaptopMockup() {
  return (
    <div className="relative w-full max-w-2xl lg:max-w-none mx-auto select-none group">
      {/* Ambient glowing backlight & ethereal wave reflections */}
      <div className="absolute -inset-6 md:-inset-10 bg-gradient-to-tr from-[#00b884]/25 via-[#008269]/20 to-transparent blur-3xl -z-10 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* 3D Laptop Chassis */}
      <div className="relative mx-auto rounded-t-[20px] md:rounded-t-[24px] p-2.5 md:p-3 bg-gradient-to-b from-[#1a232b] via-[#0f171d] to-[#0c1318] shadow-[0_25px_60px_-15px_rgba(0,68,54,0.4),0_0_0_1px_rgba(255,255,255,0.08)] border border-slate-700/50">
        
        {/* Top Bezel Notch with Camera & Indicator */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0d161c] border border-slate-600/60" />
          <div className="w-1 h-1 rounded-full bg-emerald-400/80 animate-pulse" />
        </div>

        {/* Laptop Screen Glass */}
        <div className="relative rounded-[12px] md:rounded-[14px] bg-[#f8fafc] text-slate-800 overflow-hidden shadow-inner border border-slate-200/80 aspect-[16/10.4]">
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] pointer-events-none z-10" />

          {/* Inner Dashboard Layout */}
          <div className="flex h-full w-full font-sans text-[10px] md:text-xs">
            
            {/* Sidebar */}
            <aside className="w-[24%] md:w-[22%] bg-white border-r border-slate-100 flex flex-col justify-between p-2 md:p-3 shrink-0">
              <div className="space-y-3">
                {/* Brand in sidebar */}
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <LogoIcon className="w-5 h-5 shrink-0" />
                  <span className="font-extrabold text-[9px] md:text-[11px] tracking-wider text-[#004d40]">
                    GREAT SUPPORTS
                  </span>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-0.5">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#009b77] text-white font-semibold shadow-sm shadow-[#009b77]/30">
                    <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] md:text-[11px]">Dashboard</span>
                  </div>
                  
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <Users className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-[10px] md:text-[11px]">Employees</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <CreditCard className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-[10px] md:text-[11px]">Payroll</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <CalendarDays className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-[10px] md:text-[11px]">Leave</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <Clock3 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-[10px] md:text-[11px]">Attendance</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <BarChart2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-[10px] md:text-[11px]">Reports</span>
                  </div>

                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <Settings className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="text-[10px] md:text-[11px]">Settings</span>
                  </div>
                </nav>
              </div>

              {/* Status footer pill */}
              <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[9px] font-medium border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync Active
              </div>
            </aside>

            {/* Main Workspace */}
            <main className="flex-1 bg-[#f8fafc] p-2.5 md:p-3.5 flex flex-col justify-between overflow-hidden">
              {/* Workspace Top Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                <div>
                  <h3 className="font-bold text-slate-900 text-[11px] md:text-[13px] tracking-tight">Dashboard</h3>
                  <p className="text-[9px] md:text-[10px] text-slate-400">Here's what's happening with your workforce today.</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-md text-[9px] md:text-[10px] text-slate-600 shadow-2xs font-medium">
                    <Calendar className="w-2.5 h-2.5 text-emerald-600" />
                    <span>April 2025</span>
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 grid place-items-center relative text-slate-600 shadow-2xs">
                    <Bell className="w-3 h-3" />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-500 rounded-full ring-1 ring-white" />
                  </div>
                  <div className="flex items-center gap-1.5 pl-1">
                    <div className="w-6 h-6 rounded-full bg-[#008269] text-white font-bold grid place-items-center text-[10px] shadow-sm">
                      A
                    </div>
                    <span className="font-semibold text-slate-700 hidden sm:inline text-[10px]">Admin</span>
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400 hidden sm:inline" />
                  </div>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-4 gap-1.5 md:gap-2 my-1.5">
                {/* Metric 1 */}
                <div className="bg-white p-1.5 md:p-2 rounded-lg border border-slate-100 shadow-2xs flex items-center gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-teal-50 text-teal-600 grid place-items-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[8px] md:text-[9px] text-slate-400 truncate">Total Employees</div>
                    <div className="font-extrabold text-slate-900 text-[11px] md:text-sm leading-tight">250</div>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-1.5 md:p-2 rounded-lg border border-slate-100 shadow-2xs flex items-center gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center shrink-0">
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[8px] md:text-[9px] text-slate-400 truncate">Total Payroll Cost</div>
                    <div className="font-extrabold text-slate-900 text-[11px] md:text-sm leading-tight">₹ 12,45,000</div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-1.5 md:p-2 rounded-lg border border-slate-100 shadow-2xs flex items-center gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-cyan-50 text-cyan-600 grid place-items-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[8px] md:text-[9px] text-slate-400 truncate">Pending Approvals</div>
                    <div className="font-extrabold text-slate-900 text-[11px] md:text-sm leading-tight">12</div>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-1.5 md:p-2 rounded-lg border border-slate-100 shadow-2xs flex items-center gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-mint-50 bg-[#e6fbf5] text-[#009b77] grid place-items-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[8px] md:text-[9px] text-slate-400 truncate">Open Requests</div>
                    <div className="font-extrabold text-slate-900 text-[11px] md:text-sm leading-tight">3</div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Charts */}
              <div className="grid grid-cols-12 gap-1.5 md:gap-2 my-1">
                {/* Payroll Trend Bar Chart */}
                <div className="col-span-7 bg-white p-2 md:p-2.5 rounded-lg border border-slate-100 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-bold text-[10px] md:text-[11px] text-slate-800">Payroll Trend</span>
                    <span className="text-[8px] md:text-[9px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 flex items-center gap-0.5">
                      Last 6 Months <ChevronDown className="w-2 h-2" />
                    </span>
                  </div>

                  {/* Chart Visual */}
                  <div className="h-16 md:h-20 flex items-end justify-between gap-1 pt-2 px-1">
                    {[
                      { m: "Jan", h: "40%", v: "₹6L" },
                      { m: "Feb", h: "52%", v: "₹7.8L" },
                      { m: "Mar", h: "65%", v: "₹9.5L" },
                      { m: "Apr", h: "78%", v: "₹11L" },
                      { m: "May", h: "88%", v: "₹11.9L" },
                      { m: "Jun", h: "100%", v: "₹12.45L", active: true },
                    ].map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group/bar">
                        <div
                          className={`w-full rounded-t-sm transition-all ${
                            item.active
                              ? "bg-gradient-to-t from-[#008269] to-[#00d099] shadow-sm shadow-[#00b884]/40"
                              : "bg-[#28b493]/80 hover:bg-[#009b77]"
                          }`}
                          style={{ height: item.h }}
                        />
                        <span className="text-[7.5px] md:text-[8.5px] text-slate-400 font-medium">{item.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Employee Distribution Donut */}
                <div className="col-span-5 bg-white p-2 md:p-2.5 rounded-lg border border-slate-100 shadow-2xs flex flex-col justify-between">
                  <div className="font-bold text-[10px] md:text-[11px] text-slate-800 pb-1">Employee Distribution</div>
                  <div className="flex items-center gap-2">
                    {/* Donut SVG */}
                    <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 grid place-items-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        {/* Permanent 60% */}
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#009b77" strokeWidth="4.5" strokeDasharray="60 40" strokeDashoffset="0" />
                        {/* Contract 25% */}
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#22d3ee" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-60" />
                        {/* Intern 10% */}
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#a7f3d0" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-85" />
                        {/* Others 5% */}
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#cbd5e1" strokeWidth="4.5" strokeDasharray="5 95" strokeDashoffset="-95" />
                      </svg>
                      <div className="absolute text-center leading-none">
                        <div className="font-black text-[9px] md:text-[11px] text-slate-800">250</div>
                        <div className="text-[6px] md:text-[7px] text-slate-400">Employees</div>
                      </div>
                    </div>

                    {/* Breakdown Legend */}
                    <div className="space-y-0.5 text-[7.5px] md:text-[8.5px] flex-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#009b77]" /> Permanent
                        </span>
                        <span className="font-bold">60%</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" /> Contract
                        </span>
                        <span className="font-bold">25%</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a7f3d0]" /> Intern
                        </span>
                        <span className="font-bold">10%</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#cbd5e1]" /> Others
                        </span>
                        <span className="font-bold">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Activities & Quick Actions */}
              <div className="grid grid-cols-12 gap-1.5 md:gap-2">
                {/* Recent Activities */}
                <div className="col-span-7 bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-50">
                    <span className="font-bold text-[10px] md:text-[11px] text-slate-800">Recent Activities</span>
                    <span className="text-[8px] md:text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5 hover:underline cursor-pointer">
                      View All <ArrowRight className="w-2 h-2" />
                    </span>
                  </div>
                  <div className="space-y-1 pt-1 text-[8px] md:text-[9px]">
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-400 w-16">24 Apr 2025</span>
                      <span className="text-slate-700 font-medium truncate flex-1 px-1">Payroll generated for April</span>
                      <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 font-medium rounded text-[7.5px]">Completed</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-400 w-16">22 Apr 2025</span>
                      <span className="text-slate-700 font-medium truncate flex-1 px-1">New employee added</span>
                      <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 font-medium rounded text-[7.5px]">Completed</span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-400 w-16">21 Apr 2025</span>
                      <span className="text-slate-700 font-medium truncate flex-1 px-1">Leave request approved</span>
                      <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 font-medium rounded text-[7.5px]">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="col-span-5 bg-white p-2 rounded-lg border border-slate-100 shadow-2xs flex flex-col justify-between">
                  <div className="font-bold text-[10px] md:text-[11px] text-slate-800 pb-1 border-b border-slate-50">
                    Quick Actions
                  </div>
                  <div className="grid grid-cols-1 gap-1 pt-0.5 text-[8px] md:text-[9px]">
                    <button className="flex items-center justify-between px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded text-slate-700 transition-colors text-left font-medium">
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-2.5 h-2.5 text-[#009b77]" /> Run Payroll
                      </span>
                      <ArrowRight className="w-2 h-2 opacity-50" />
                    </button>
                    <button className="flex items-center justify-between px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded text-slate-700 transition-colors text-left font-medium">
                      <span className="flex items-center gap-1">
                        <BarChart2 className="w-2.5 h-2.5 text-[#009b77]" /> Generate Reports
                      </span>
                      <ArrowRight className="w-2 h-2 opacity-50" />
                    </button>
                    <button className="flex items-center justify-between px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded text-slate-700 transition-colors text-left font-medium">
                      <span className="flex items-center gap-1">
                        <UserPlus className="w-2.5 h-2.5 text-[#009b77]" /> Add Employee
                      </span>
                      <ArrowRight className="w-2 h-2 opacity-50" />
                    </button>
                    <button className="flex items-center justify-between px-2 py-1 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded text-slate-700 transition-colors text-left font-medium">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-2.5 h-2.5 text-[#009b77]" /> Manage Leaves
                      </span>
                      <ArrowRight className="w-2 h-2 opacity-50" />
                    </button>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>

      {/* Laptop Base Stand / Chin */}
      <div className="relative mx-auto -mt-0.5 h-3 md:h-3.5 w-[104%] -left-[2%] bg-gradient-to-r from-[#182026] via-[#2f3d47] to-[#182026] rounded-b-[14px] shadow-[0_12px_24px_rgba(0,0,0,0.35)] flex items-center justify-center">
        {/* Notch opening groove */}
        <div className="w-16 md:w-20 h-1 bg-[#12181d] rounded-b-md shadow-inner" />
      </div>

      {/* Surface Reflection below laptop */}
      <div className="mx-auto w-[90%] h-4 bg-gradient-to-b from-[#00b884]/15 to-transparent blur-md -mt-1 rounded-full" />
    </div>
  );
}

export default HeroLaptopMockup;
