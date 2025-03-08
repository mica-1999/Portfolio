"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchDataFromApi } from '/src/utils/apiUtils';
import BalanceSection from './sections/BalanceSection';
import StatsSection from './sections/StatsSection';
import ProjectsSection from './sections/ProjectsSection';
import TimelineSection from './sections/TimelineSection';
import UsersSection from './sections/UsersSection';
import LoadingState from './sections/LoadingState';
import ErrorState from './sections/ErrorState';

export default function MainContent() {
  // Session handling 
  const { data: session } = useSession();
  const { id } = session?.user || {};

  // State for data
  const [dashboardData, setDashboardData] = useState({
    balance: {
      totalBalance: null,
      balanceMonth: null,
      withdrawal: null,
    },
    projects: [],
    timeline: [],
    users: [],
    sessionCount: 0,
    rating: 0,
  });
  
  // State for UI and loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hidden_sections, setHiddenSections] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedHiddenSections = localStorage.getItem('hidden_sections_saved');
      return savedHiddenSections ? JSON.parse(savedHiddenSections) : [];
    }
    return [];
  });

  // Function to handle the hidden sections
  const handle_sections = (section) => {
    setHiddenSections((prevHiddenSections) => {
      const updatedSections = prevHiddenSections.includes(section)
        ? prevHiddenSections.filter((s) => s !== section)
        : [...prevHiddenSections, section];
      return updatedSections;
    });
  };

  // Store hidden_sections in localStorage
  useEffect(() => {
    localStorage.setItem('hidden_sections_saved', JSON.stringify(hidden_sections));
  }, [hidden_sections]);

  // Fetch dashboard data
  useEffect(() => {
    // Load saved hidden sections
    if (typeof window !== 'undefined') {
      const savedHiddenSections = localStorage.getItem('hidden_sections_saved');
      if (savedHiddenSections) {
        setHiddenSections(JSON.parse(savedHiddenSections));
      }
    }

    // Fetch all data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        const [session, rating, balanceData, projects, timeline, users] = await Promise.all([
          fetchDataFromApi('/api/Session'),
          fetchDataFromApi('/api/Rating'),
          fetchDataFromApi('/api/Balance', id),
          fetchDataFromApi('/api/Projects', id),
          fetchDataFromApi('/api/Timeline', id),
          fetchDataFromApi('/api/User'),
        ]);
        
        // Set all data in one update to reduce renders
        setDashboardData({
          balance: {
            totalBalance: balanceData.totalBalance,
            balanceMonth: balanceData.thisMonth.totalDeposits,
            withdrawal: balanceData.thisMonth.totalWithdrawals,
          },
          projects: projects || [],
          timeline: timeline || [],
          users: users || [],
          sessionCount: session || 0,
          rating: rating || 0,
        });
      } 
      catch (error) {
        console.error("Failed to fetch data:", error);
        setError("An unexpected error occurred. Please try again.");
      } 
      finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="row d-flex mt-3">
      {/* Balance Section */}
      <BalanceSection 
        balanceData={dashboardData.balance} 
        hidden={hidden_sections.includes('1')} 
        onToggleVisibility={() => handle_sections('1')} 
      />
      
      {/* Stats Sections */}
      <StatsSection 
        rating={dashboardData.rating} 
        sessionCount={dashboardData.sessionCount}
      />
      
      {/* Projects Section */}
      <ProjectsSection 
        projects={dashboardData.projects} 
        hidden={hidden_sections.includes('2')} 
        onToggleVisibility={() => handle_sections('2')} 
      />
      
      {/* Timeline Section */}
      <TimelineSection 
        timeline={dashboardData.timeline} 
        hidden={hidden_sections.includes('3')} 
        onToggleVisibility={() => handle_sections('3')} 
      />
      
      {/* Users Section */}
      <UsersSection 
        users={dashboardData.users} 
        hidden={hidden_sections.includes('4')} 
        onToggleVisibility={() => handle_sections('4')} 
      />
    </div>
  );
}