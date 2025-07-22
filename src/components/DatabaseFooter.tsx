import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Database } from 'lucide-react';

export const DatabaseFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">Technical Achievements</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Implemented B+ Tree with efficient split/merge operations</li>
              <li>• Built extendible hashing with dynamic bucket expansion</li>
              <li>• Created relational algebra engine with complex query support</li>
              <li>• Optimized data structures for O(log n) search complexity</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">Technologies & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['C++', 'Data Structures', 'Algorithms', 'Database Systems', 'B+ Trees', 'Hashing', 'Query Processing', 'System Design'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Demonstrating systems programming and database expertise for software engineering roles
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-400" />
              <Code className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">
                Database Structures & Query Implementation System
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 - Built to showcase advanced data structures and algorithms expertise
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};