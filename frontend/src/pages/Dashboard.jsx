// Dashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EventsList from "../components/EventsList";
import Card from "../components/Card";
import ScheduleEventForm from "../components/ScheduleEvent";
import HostMentorshipForm from "../components/HostMentorship";
import JobOpeningsForm from "../components/JobOpenings";
import { Search, Menu } from "lucide-react";
import { assets } from "../assets/assets";
import Network from "../components/Network";
import OpenSource from "../components/OpenSource";
import Messages from "../components/Message";
import EditProfilePopup from "../components/EditProfilePopup";
import MentorshipList from "../components/MentorshipList";
import JobOpeningsList from "../components/JobOpeningsList";

function Dashboard() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCard, setActiveCard] = useState("");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [role, setRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const photo = localStorage.getItem("profilePhoto");
    const userRole = localStorage.getItem("userRole");

    if (user) setLoggedInUser(user);
    if (photo) setProfilePhoto(photo);
    if (userRole) setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  const currentDate = new Date().toLocaleDateString();

  const handleCardClick = (title) => {
    setActiveCard(title);
    if (title === "Events") setActiveSection("events");
    if (title === "Network") setActiveSection("network");
    if (title === "Open Source") setActiveSection("open-source");
  };

  const handleCancelForm = () => setActiveCard("");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="grid grid-cols-3 gap-4 mt-8 px-4">
            {role === "alumni" && (
              <>
                <Card
                  title="Schedule an Event"
                  description="Organize and promote alumni events."
                  icon={assets.Calender}
                  onClick={() => handleCardClick("Schedule an Event")}
                />
                <Card
                  title="Host a Mentorship"
                  description="Offer your expertise to students and fellow alumni."
                  icon={assets.ShakeHand}
                  onClick={() => handleCardClick("Host a Mentorship")}
                />
                <Card
                  title="Job Openings"
                  description="Share opportunities with alumni."
                  icon={assets.Money}
                  onClick={() => handleCardClick("Job Openings")}
                />
              </>
            )}

            {role === "student" && (
              <>
                <Card
                  title="Find Mentors"
                  description="Connect with alumni for guidance."
                  icon={assets.ShakeHand}
                  onClick={() => setActiveSection("network")}
                />
                <Card
                  title="Mentorship Listings"
                  description="Browse available mentorship sessions."
                  icon={assets.ShakeHand}
                  onClick={() => setActiveSection("mentorships")}
                />
                <Card
                  title="Job Opportunities"
                  description="Explore alumni-shared job openings."
                  icon={assets.Money}
                  onClick={() => setActiveSection("job-openings")}
                />
              </>
            )}
          </div>
        );
      case "events":
        return <EventsList />;
      case "network":
        return <Network />;
      case "open-source":
        return <OpenSource />;
      case "messages":
        return (
          <div className="h-[calc(100vh-140px)] overflow-hidden px-4">
            <Messages loggedInUser={loggedInUser} />
          </div>
        );
      case "mentorships":
        return <MentorshipList />;
      case "job-openings":
        return <JobOpeningsList />;
      default:
        return <div>Default content</div>;
    }
  };

  return (
    <div className="relative grid grid-cols-12 min-h-screen w-screen max-w-full bg-[#EDF0F7] overflow-x-hidden">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 left-4 z-50 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
      >
        <Menu className="h-5 w-5 text-gray-800" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
      </div>

      <div
        className={`col-span-12 pl-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:pl-64" : "pl-0"
        } pt-4`}
      >
        <div className="flex justify-between items-center gap-8 px-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-outfit font-bold text-secondary typewriter">
              Welcome, {loggedInUser}
            </h1>
            <p className="text-[#023074cd]">{currentDate}</p>
          </div>
          <div className="relative mx-auto w-96">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-full border border-gray-300 rounded-lg pl-10 focus:outline-none focus:border-[#023074a0]"
            />
            <Search className="absolute top-3 left-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {renderContent()}

        <div className="mt-8 px-4">
          {role === "alumni" && activeCard === "Schedule an Event" && (
            <ScheduleEventForm onCancel={handleCancelForm} />
          )}
          {role === "alumni" && activeCard === "Host a Mentorship" && (
            <HostMentorshipForm onCancel={handleCancelForm} />
          )}
          {role === "alumni" && activeCard === "Job Openings" && (
            <JobOpeningsForm onCancel={handleCancelForm} />
          )}
        </div>
      </div>

      <div className="fixed top-4 right-4 flex justify-center px-4 pt-4 z-50">
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="font-outfit font-bold text-secondary">
              <p className="text-primary underline">Edit Profile</p>
            </span>
            <img
              src={profilePhoto || assets.Profile}
              alt="Profile"
              className="w-12 h-12 rounded-xl"
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-10 w-46 bg-white bg-opacity-25 rounded-md shadow-lg z-20">
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Update Profile
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditProfileOpen && (
        <EditProfilePopup onClose={() => setIsEditProfileOpen(false)} />
      )}
    </div>
  );
}

export default Dashboard;
