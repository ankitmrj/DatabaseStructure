import React from 'react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Project Highlights</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Advanced adversarial learning implementation</li>
              <li>• Real-time bias detection and mitigation</li>
              <li>• Orthogonality regularization for fair embeddings</li>
              <li>• Production-ready recommendation system</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {['Deep Learning', 'Keras', 'TensorFlow', 'Adversarial Learning', 'React', 'TypeScript', 'Collaborative Filtering'].map((tech) => (
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
            <h3 className="text-xl font-bold mb-4 text-pink-400">Connect</h3>
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
              Showcasing advanced ML engineering skills for recruitment opportunities
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Fairness-Aware Movie Recommendation System. 
            Built to demonstrate expertise in ML, Deep Learning, and Bias Mitigation.
          </p>
        </div>
      </div>
    </footer>
  );
};