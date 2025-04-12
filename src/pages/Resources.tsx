
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import ResourceCard from '@/components/ResourceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useData } from '@/context/DataContext';

const Resources: React.FC = () => {
  const { resources } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter resources based on search query and type
  const filteredMockTests = resources
    .filter(resource => 
      resource.type === 'mock-test' && 
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  const filteredAiQuizzes = resources
    .filter(resource => 
      resource.type === 'ai-quiz' && 
      (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Interview Resources</h1>
          <p className="text-gray-600 mt-1">Prepare for interviews with mock tests and AI-powered quizzes</p>
        </div>
        
        <div className="mb-6">
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <Tabs defaultValue="mock-tests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="mock-tests">Mock Tests</TabsTrigger>
            <TabsTrigger value="ai-quizzes">AI Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mock-tests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMockTests.map(resource => (
                <ResourceCard
                  key={resource.id}
                  id={resource.id}
                  title={resource.title}
                  type={resource.type}
                  description={resource.description}
                  link={resource.link}
                />
              ))}
            </div>
            
            {filteredMockTests.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No mock tests found</h3>
                <p className="text-gray-500">Try adjusting your search</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ai-quizzes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAiQuizzes.map(resource => (
                <ResourceCard
                  key={resource.id}
                  id={resource.id}
                  title={resource.title}
                  type={resource.type}
                  description={resource.description}
                  link={resource.link}
                />
              ))}
            </div>
            
            {filteredAiQuizzes.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No AI quizzes found</h3>
                <p className="text-gray-500">Try adjusting your search</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Resources;
