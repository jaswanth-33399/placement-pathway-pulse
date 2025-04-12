
import React, { useMemo } from 'react';
import NavBar from '@/components/NavBar';
import InternshipCard from '@/components/InternshipCard';
import JobCard from '@/components/JobCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/context/DataContext';
import { toast } from '@/components/ui/sonner';

const Saved: React.FC = () => {
  const { 
    internships, 
    jobs, 
    savedInternships, 
    savedJobs, 
    saveInternship, 
    unsaveInternship,
    saveJob,
    unsaveJob
  } = useData();
  
  // Get saved internships and jobs
  const savedInternshipItems = useMemo(() => {
    return internships.filter(internship => savedInternships.includes(internship.id));
  }, [internships, savedInternships]);
  
  const savedJobItems = useMemo(() => {
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
            <TabsTrigger value="internships">Internships ({savedInternshipItems.length})</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({savedJobItems.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="internships" className="space-y-6">
            {savedInternshipItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedInternshipItems.map(internship => (
                  <InternshipCard
                    key={internship.id}
                    id={internship.id}
                    company={internship.company}
                    role={internship.role}
                    period={internship.period}
                    mode={internship.mode}
                    description={internship.description}
                    applyLink={internship.applyLink}
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
