import React from 'react';
import { User, Mail, Briefcase, Calendar, Award, Shield, Phone, MapPin } from 'lucide-react';

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden transition-colors duration-200">
      {/* Cover and Avatar Header */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 w-full relative">
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 bg-white dark:bg-dark-bg rounded-full p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-3xl font-bold border border-indigo-200 dark:border-indigo-500/30">
              {user.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Header Info */}
      <div className="pt-16 pb-6 px-8 border-b border-gray-100 dark:border-dark-border">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
              <Briefcase className="w-4 h-4 mr-2" />
              {user.designation} at {user.company}
            </p>
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-full text-sm font-semibold border border-indigo-100 dark:border-indigo-500/20">
            {user.badge} Member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-dark-border">
        {/* Contact Info */}
        <div className="p-8 space-y-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contact Information</h3>
          
          <div className="flex items-start">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Work Email</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Mobile</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Headquarters</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, CA</p>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="p-8 space-y-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Professional Details</h3>
          
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Employee ID</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">EMP-{user._id?.substring(0, 6) || '001234'}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.experience}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Experience</p>
            </div>
          </div>

          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Full-Time</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Employment Type</p>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="p-8 space-y-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Performance Overview</h3>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Performance Score</span>
              <span className="font-bold text-gray-900 dark:text-white">{user.performance}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${user.performance}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Attendance Rate</span>
              <span className="font-bold text-gray-900 dark:text-white">{user.attendance}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${user.attendance}%` }}></div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
                <Award className="w-5 h-5 mr-1" />
                {user.rewards}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
