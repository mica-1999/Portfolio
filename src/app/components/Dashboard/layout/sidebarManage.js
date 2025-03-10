"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const SidebarContext = createContext();

// Provider Component
export function SidebarProvider({ children }) {
  // Initialize with null to prevent hydration mismatch
  const [sidebarOpen, setSidebarOpen] = useState(null);
  
  // Set initial state on client only
  useEffect(() => {
    setSidebarOpen(false);
  }, []);

  // Return Provider - only render when state is initialized
  return (
    <SidebarContext.Provider value={{ 
      sidebarOpen: sidebarOpen === null ? false : sidebarOpen, 
      setSidebarOpen 
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom Hook to Use Sidebar Context in Child Components
export function useSidebar() {
  return useContext(SidebarContext);
}
