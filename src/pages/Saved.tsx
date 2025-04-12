
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import InternshipCard from '@/components/InternshipCard';
import JobCard from '@/components/JobCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/context/DataContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Define the database response type with explicit nullability
interface SupabaseInternshipRecord {
  id?: string;
  apply: string | null;
  company: string | null;
  company_industry: string | null;
  company_size: string | null;
  created_at: string | null;
  date: string | null;
  graduate_time: string | null;
  hire_time: string | null;
  location: string | null;
  qualifications: string | null;
  salary: string | null;
  title: string | null;
  work_model: string | null;
}

// Application-specific type with guaranteed id field
interface SavedInternship {
  id: string;
  apply: string | null;
  company: string | null;
  date: string | null;
  location: string | null;
  salary: string | null;
  title: string | null;
  work_model: string | null;
}

const Saved: React.FC = () => {
  const { 
    jobs, 
    savedInternships, 
    savedJobs, 
    saveInternship, 
    unsaveInternship,
    saveJob,
    unsaveJob
  } = useData();
  
  const [supabaseInternships, setSupabaseInternships] = useState<SavedInternship[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch saved internships from Supabase
  useEffect(() => {
    const fetchSavedInternships = async () => {
      if (savedInternships.length === 0) {
        setSupabaseInternships([]);
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('internships_raw')
          .select('*')
          .in('id', savedInternships);
        
        if (error) throw error;
        
        // Map each record to our SavedInternship type, ensuring id exists
        const internshipsWithId = (data || []).map((item: SupabaseInternshipRecord) => ({
          id: item.id || `internship-${Math.random().toString(36).substring(2, 9)}`,
          apply: item.apply,
          company: item.company,
          date: item.date,
          location: item.location,
          salary: item.salary,
          title: item.title,
          work_model: item.work_model
        }));
        
        setSupabaseInternships(internshipsWithId);
      } catch (err) {
        console.error('Error fetching saved internships:', err);
        toast.error('Failed to load saved internships');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedInternships();
  }, [savedInternships]);
  
  // Get saved jobs
  const savedJobItems = React.useMemo(() => {
    return jobs.filter(job => savedJobs.includes(job.id));
  }, [jobs, savedJobs]);
  
  // Handle save/unsave
  const handleSaveInternship = (id: string) => {
    saveInternship(id);
    toast.success('Internship saved to your collection');
  };
  
  const handleUnsaveInternship = (id: string) => {
    unsaveInternship(id);
    toast.success('Internship removed from your collection');
  };
  
  const handleSaveJob = (id: string) => {
    saveJob(id);
    toast.success('Job saved to your collection');
  };
  
  const handleUnsaveJob = (id: string) => {
    unsaveJob(id);
    toast.success('Job removed from your collection');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
          <p className="text-gray-600 mt-1">View and manage your saved internships and jobs</p>
        </div>
        
        <Tabs defaultValue="internships" className="space-y-6">
          <TabsList>
            <TabsTrigger value="internships">Internships ({savedInternships.length})</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({savedJobItems.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="internships" className="space-y-6">
            {loading ? (
              <div className="text-center py-12">Loading saved internships...</div>
            ) : (
              <>
                {supabaseInternships.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {supabaseInternships.map(internship => (
                      <InternshipCard
                        key={internship.id}
                        id={internship.id}
                        company={internship.company || 'Unknown Company'}
                        role={internship.title || 'Untitled Internship'}
                        period={internship.date || 'N/A'}
                        mode={internship.work_model?.toLowerCase().includes('remote') ? 'online' : 'offline'}
                        description={`${internship.location || ''} ${internship.salary ? '• ' + internship.salary : ''}`}
                        applyLink={internship.apply || '#'}
                        isSaved={true}
                        onSave={() => handleSaveInternship(internship.id)}
                        onUnsave={() => handleUnsaveInternship(internship.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No saved internships</h3>
                    <p className="text-gray-500">Internships you save will appear here</p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6">
            {savedJobItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobItems.map(job => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    company={job.company}
                    role={job.role}
                    mode={job.mode}
                    description={job.description}
                    applyLink={job.applyLink}
                    isSaved={true}
                    onSave={() => handleSaveJob(job.id)}
                    onUnsave={() => handleUnsaveJob(job.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs</h3>
                <p className="text-gray-500">Jobs you save will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Saved;
