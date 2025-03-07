"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const SidebarContext = createContext();

// Provider Component
export function SidebarProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Return Provider 
  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom Hook to Use Sidebar Context in Child Components
export function useSidebar() {
  return useContext(SidebarContext);
}
