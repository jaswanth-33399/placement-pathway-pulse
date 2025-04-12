
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { Calendar, BriefcaseIcon, BookmarkIcon, Megaphone, LibraryIcon, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    internships, 
    jobs, 
    savedInternships, 
    savedJobs, 
    calendarEvents, 
    companyReviews, 
    discussionPosts 
  } = useData();
  
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return calendarEvents
      .filter(event => new Date(event.start) > now)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, 3);
  }, [calendarEvents]);
  
  // Get the newest discussion posts
  const recentPosts = useMemo(() => {
    return [...discussionPosts]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 3);
  }, [discussionPosts]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}</h1>
          <p className="text-gray-600 mt-1">Here's an overview of your IP Drive activity</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-ipblue-600" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Internships</span>
                  <span className="font-medium">{internships.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Jobs</span>
                  <span className="font-medium">{jobs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved Items</span>
                  <span className="font-medium">{savedInternships.length + savedJobs.length}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Button className="w-full bg-ipblue-600 hover:bg-ipblue-700" asChild>
                  <Link to="/internships">Browse Internships</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/hiring">Browse Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-ipblue-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border-l-2 border-ipblue-500 pl-3 py-1">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.start).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No upcoming events</p>
              )}
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link to="/calendar">View Calendar</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessagesSquare className="h-5 w-5 mr-2 text-ipblue-600" />
                Community Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentPosts.length > 0 ? (
                <div className="space-y-3">
                  {recentPosts.map(post => (
                    <div key={post.id} className="text-sm">
                      <div className="font-medium truncate">{post.title}</div>
                      <div className="text-xs text-gray-500">
                        By {post.username}, {new Date(post.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No recent posts</p>
              )}
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link to="/community">Join Discussion</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LibraryIcon className="h-5 w-5 mr-2 text-ipblue-600" />
                Prepare for Interviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Access mock tests and AI-powered quizzes to enhance your skills.</p>
              <Button className="w-full bg-ipblue-600 hover:bg-ipblue-700" asChild>
                <Link to="/resources">Browse Resources</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Megaphone className="h-5 w-5 mr-2 text-ipblue-600" />
                Company Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Read reviews or share your own experience with companies.</p>
              <Button className="w-full bg-ipblue-600 hover:bg-ipblue-700" asChild>
                <Link to="/community">View Community</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
