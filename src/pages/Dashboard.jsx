import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyElectionCard from '../components/MyElectionCard';
import ElectionCard from '../components/ElectionCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './dashboard.css';

const Dashboard = () => {
  const [myElections, setMyElections] = useState([]);
  const [allElections, setAllElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const [myRes, allRes] = await Promise.all([
          axios.get('https://voteverse-server.onrender.com/api/elections/my', { withCredentials: true }),
          axios.get('https://voteverse-server.onrender.com/api/elections/all', { withCredentials: true }),
        ]);
        console.log('My Elections:', myRes.data);
        console.log('All Elections:', allRes.data);
        setMyElections(myRes.data.elections || []);
        setAllElections(allRes.data.elections || []);
      } catch (error) {
        console.error('❌ Error fetching elections:', error);
      }
    };

    
    fetchElections();
    
  }, []);
  

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 px-4 pt-24 pb-10">
      <div className="election-wrapper group transition-transform duration-300 ease-in-out hover:scale-[1.01]">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          
          <div className="lg:w-1/2 w-full">
            <h2 className="text-white text-xl mb-3">My Elections</h2>
            <div className="election-stack auto-scroll vertical gap-4 overflow-hidden">
              {myElections.length > 0 ? (
                myElections.map((election) => (
                  <MyElectionCard key={election._id} election={election} />
                ))
              ) : (
                <div className="text-gray-400 text-sm p-4">You haven't created any elections yet.</div>
              )}
            </div>
          </div>

          
          <div className="lg:w-1/2 w-full">
            <h2 className="text-white text-xl mb-3">All Elections</h2>
            <div className="election-stack auto-scroll vertical gap-4 overflow-hidden">
              {allElections.length > 0 ? (
                allElections.map((election) => (
                  <ElectionCard key={election._id} election={election} />
                ))
              ) : (
                <div className="text-gray-400 text-sm p-4">No elections are live right now.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate('/create-election')}
          className="bg-gray-800 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-[0_0_20px_5px_rgba(0,255,255,0.6)] hover:bg-gray-700 transition-all duration-300"
        >
          Create Election
        </button>
        
      </div>
    </div>
  );
};

export default Dashboard;
