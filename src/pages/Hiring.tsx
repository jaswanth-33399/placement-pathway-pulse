
import React, { useState, useMemo } from 'react';
import NavBar from '@/components/NavBar';
import JobCard from '@/components/JobCard';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Hiring: React.FC = () => {
  const { jobs, savedJobs, saveJob, unsaveJob } = useData();
  
  // Filters
  const [role, setRole] = useState('');
  const [mode, setMode] = useState<'all' | 'offline' | 'online' | 'hybrid'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get unique roles for filter options
  const uniqueRoles = useMemo(() => {
    const roles = new Set(jobs.map(job => job.role));
    return Array.from(roles);
  }, [jobs]);
  
  // Filter jobs based on selected criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesRole = !role || job.role === role;
      const matchesMode = mode === 'all' || job.mode === mode;
      const matchesSearch = !searchQuery || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesRole && matchesMode && matchesSearch;
    });
  }, [jobs, role, mode, searchQuery]);
  
  // Handle save/unsave job
  const handleSaveJob = (id: string) => {
    saveJob(id);
    toast.success('Job saved to your collection');
  };
  
  const handleUnsaveJob = (id: string) => {
    unsaveJob(id);
    toast.success('Job removed from your collection');
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setRole('');
    setMode('all');
    setSearchQuery('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
          <p className="text-gray-600 mt-1">Explore full-time job opportunities across various roles</p>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by company, role, or keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {uniqueRoles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mode">Work Mode</Label>
              <Select 
                value={mode} 
                onValueChange={(value) => setMode(value as 'all' | 'offline' | 'online' | 'hybrid')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="offline">On-site</SelectItem>
                  <SelectItem value="online">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleResetFilters}>Reset Filters</Button>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-4">
          <h2 className="text-xl font-medium">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'} found
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              company={job.company}
              role={job.role}
              mode={job.mode}
              description={job.description}
              applyLink={job.applyLink}
              isSaved={savedJobs.includes(job.id)}
              onSave={() => handleSaveJob(job.id)}
              onUnsave={() => handleUnsaveJob(job.id)}
            />
          ))}
        </div>
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs match your filters</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
            <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Hiring;
